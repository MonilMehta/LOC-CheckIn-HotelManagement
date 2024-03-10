import pandas as pd
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated,AllowAny
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from django.http import JsonResponse

from .models import RoomStatus
from .serializers import RoomStatusCreateSerializer, RoomStatusSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from keras.applications.xception import Xception
from keras.models import load_model
import cv2 as cv2
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from ultralytics import YOLO
from collections import Counter
import numpy as np

room_model = load_model('room.h5')
model = YOLO("yolov8s.pt")

my_file = open(r"coco.txt", "r")
data = my_file.read()
class_list = data.split("\n")

class RoomStatusViewSet(viewsets.ModelViewSet):
    queryset = RoomStatus.objects.all()
    serializer_class = RoomStatusSerializer
    permission_classes = [IsAuthenticated]

def preprocess_image(image):
    # calculate from the training set
    channel_mean = np.array([110.73151039, 122.90935242, 136.82249855])
    channel_std = np.array([69.39734207, 67.48444001, 66.66808662])

    # normalize image
    image = image.astype('float32')
    for j in range(3):
        image[:, :, j] = (image[:, :, j] - channel_mean[j]) / channel_std[j]
    return image

def predict_single_image(image_path, base_model, room_model):
    # Load and preprocess the image
    image = cv2.imread(image_path)
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    processed_image = preprocess_image(image.copy())
    processed_image = np.expand_dims(processed_image, axis=0)

    # Extract features using the base model
    features = base_model.predict(processed_image)

    # Make predictions using the room model
    prediction = room_model.predict(features)

    return image_rgb, prediction

@api_view(['POST', 'PUT'])
def createroom(request):
    if request.method == 'POST':
        # Logic for creating a new room status object
        serializer = RoomStatusCreateSerializer(data=request.data)
        if serializer.is_valid():
            # Save the room image to the specified directory
            room_image = serializer.validated_data.get('room_image')
            image_content = ContentFile(room_image.read())
            image_name = room_image.name
            image_path = default_storage.save(f'D:/Hackathon/LOC/core/room_images/{image_name}', image_content)



            # Process the room image
            base_model = Xception(include_top=False, weights='imagenet', pooling='avg')
            image, prediction = predict_single_image(image_path, base_model, room_model)
            room_status = None  # Define room_status

            print(prediction[0][0])

            if prediction[0][0] <0.6:
                print('Ok')
                room_status = 'clean'
            else:
                room_status = 'messy'

            # Set room status
            print(f'Room status-{room_status}')
            serializer.validated_data['status'] = room_status

            # Save room status
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'PUT':
        # Get the room status object to update
        room_number = request.data.get('room_number')
        try:
            room_status = RoomStatus.objects.get(room_number=room_number)
        except RoomStatus.DoesNotExist:
            return Response({'error': 'Room status not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Update the room status object with the request data
        serializer = RoomStatusCreateSerializer(room_status, data=request.data)
        if serializer.is_valid():
            # Save the room image to the specified directory
            room_image = serializer.validated_data.get('room_image')
            image_content = ContentFile(room_image.read())
            image_name = room_image.name
            image_path = default_storage.save(f'D:/Hackathon/LOC/core/room_images/{image_name}', image_content)



            # Process the room image
            base_model = Xception(include_top=False, weights='imagenet', pooling='avg')
            room_status.status = predict_single_image(image_path, base_model, room_model)

            # Save updated room status
            room_status.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
def detect_objects_and_count(img):
    results = model.predict(img)
    a = results[0].boxes.data
    px = pd.DataFrame(a).astype("float")
    object_classes = []

    for index, row in px.iterrows():
        x1 = int(row[0])
        y1 = int(row[1])
        x2 = int(row[2])
        y2 = int(row[3])
        d = int(row[5])
        if d < len(class_list):  # Check if d is within the valid range
            obj_class = class_list[d]
            object_classes.append(obj_class)
            cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 255), 2)
            cv2.putText(img, f'{obj_class}', (x2, y2), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 255), 2, cv2.LINE_AA)

    counter = Counter(object_classes)
    print("Object Count in Image:")
    for obj, count in counter.items():
        print(f"{obj}: {count}")

    return counter

@api_view(['POST'])
@csrf_exempt
def inventory_check(request):
    permission_classes = [AllowAny]
    if not request.user.is_anonymous:
        employee = request.user
        if request.method == 'POST' and request.FILES.get('image'):
   
            image_file = request.FILES['image']
            
            # Perform object detection on the uploaded image
            image = cv2.imdecode(np.fromstring(image_file.read(), np.uint8), cv2.IMREAD_COLOR)
            image = cv2.resize(image, (1020, 500))
            
            # Detect objects and count them
            object_counts = detect_objects_and_count(image)
            
            # Update RoomStatus object with the counts
            room_status = RoomStatus.objects.create(
                room_number=request.data.get('room_number'),
                status=request.data.get('status'),
                employee=employee,  # Set the employee field
                # Add other fields as necessary
                bottle=object_counts.get('bottle', 0),
                cup=object_counts.get('cup', 0),
                wine_glass=object_counts.get('wine_glass', 0),
                bowl=object_counts.get('bowl', 0)
            )
            
            # Construct the response JSON data
            response_data = {
                "inventory_counts": object_counts
            }
            
            return Response(response_data, status=status.HTTP_201_CREATED)
    else:
        return Response({"error": "Authentication failed"}, status=status.HTTP_401_UNAUTHORIZED)

