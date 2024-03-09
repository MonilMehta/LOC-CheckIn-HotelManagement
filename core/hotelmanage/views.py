from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import RoomStatus
from .serializers import RoomStatusCreateSerializer, RoomStatusSerializer
from rest_framework import status as http_status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from keras.applications.xception import Xception
from keras.models import load_model
import cv2 as cv
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import numpy as np

room_model = load_model('room.h5')

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
    image = cv.imread(image_path)
    image_rgb = cv.cvtColor(image, cv.COLOR_BGR2RGB)
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
        serializer = RoomStatusCreateSerializer(data=request.data)
        if serializer.is_valid():
            room_image = serializer.validated_data.get('room_image')
            image_content = ContentFile(room_image.read())
            image_name = room_image.name
            image_path = default_storage.save(f'D:/Django2/project/core/room_images/{image_name}', image_content)

            base_model = Xception(include_top=False, weights='imagenet', pooling='avg')
            image, prediction = predict_single_image(image_path, base_model, room_model)
            print(prediction[0][0])

            # Set room status based on prediction percentage
            status = 'messy' if prediction[0][0] > 0.6 else 'clean'
            serializer.validated_data['status'] = status

            serializer.save()
            return Response(serializer.data, status=http_status.HTTP_201_CREATED)
        return Response(serializer.errors, status=http_status.HTTP_400_BAD_REQUEST)
    elif request.method == 'PUT':
        room_number = request.data.get('room_number')
        try:
            room_status = RoomStatus.objects.get(room_number=room_number)
        except RoomStatus.DoesNotExist:
            return Response({'error': 'Room status not found'}, status=http_status.HTTP_404_NOT_FOUND)
        
        serializer = RoomStatusCreateSerializer(room_status, data=request.data)
        if serializer.is_valid():
            room_image = serializer.validated_data.get('room_image')
            image_content = ContentFile(room_image.read())
            image_name = room_image.name
            image_path = default_storage.save(f'D:/Django2/project/core/room_images/{image_name}', image_content)

            base_model = Xception(include_top=False, weights='imagenet', pooling='avg')
            image, prediction = predict_single_image(image_path, base_model, room_model)

            # Set room status based on prediction percentage
            status = 'messy' if prediction[0][0] > 0.6 else 'clean'
            room_status.status = status

            room_status.save()
            return Response(serializer.data, status=http_status.HTTP_200_OK)
        return Response(serializer.errors, status=http_status.HTTP_400_BAD_REQUEST)
