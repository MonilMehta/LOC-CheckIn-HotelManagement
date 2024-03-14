from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated,AllowAny
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from .models import RoomStatus
from .serializers import RoomStatusCreateSerializer, RoomStatusSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from .aimodels import predict_single_image,detect_objects_and_count
from django.apps import apps


class RoomStatusViewSet(viewsets.ModelViewSet):
    queryset = RoomStatus.objects.all()
    print(queryset)
    serializer_class = RoomStatusSerializer
    permission_classes = [IsAuthenticated]


@api_view(['POST'])
def createroom(request):
    if request.method == 'POST':
        # Logic for creating or updating a room status object
        serializer = RoomStatusCreateSerializer(data=request.data)
        if serializer.is_valid():
            room_number = request.data.get('room_number')
            room_image = serializer.validated_data.get('room_image')
            image_content = ContentFile(room_image.read())
            image_name = room_image.name
            image_path = default_storage.save(f'D:/Hackathon/LOC/core/room_images/{image_name}', image_content)

            # Check if a RoomStatus object with the given room number exists
            try:
                room_status = RoomStatus.objects.get(room_number=room_number)
            except RoomStatus.DoesNotExist:
                room_status = None

            if room_status:
                # Update the existing room status object
                image, prediction = predict_single_image(image_path)
                if prediction[0][0] < 0.6:
                    room_status.status = 'clean'
                else:
                    room_status.status = 'maintenance'
                print(room_status.status)
                room_status.room_image = image_path
                room_status.save()
                return Response(RoomStatusSerializer(room_status).data, status=status.HTTP_200_OK)
            else:
                # Create a new room status object
                image, prediction = predict_single_image(image_path)
                room_status = serializer.save(status='clean' if prediction[0][0] < 0.6 else 'maintenance', room_image=image_path)
                return Response(RoomStatusSerializer(room_status).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@csrf_exempt
def inventory_check(request):
    employee = request.user
    if request.method == 'POST' and request.FILES.get('image'):
        image_file = request.FILES['image']
        room_number = request.data.get('room_number')
        
        try:
            # Retrieve the existing RoomStatus object
            room_status = RoomStatus.objects.get(room_number=room_number)
        except RoomStatus.DoesNotExist:
            # Handle the case where the RoomStatus object does not exist
            return Response({"error": "RoomStatus does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
        # Detect objects and count them
        object_counts = detect_objects_and_count(image_file)
        
        # Update the RoomStatus object with the counts
        room_status.status = request.data.get('status')
        room_status.employee = employee
        room_status.bottle = object_counts.get('bottle', 0)/2
        room_status.cup = object_counts.get('cup', 0)/4
        room_status.wine_glass = object_counts.get('wine_glass', 0)/2
        room_status.bowl = object_counts.get('bowl', 0)/4
        
        # Save the updated RoomStatus object
        room_status.save()
        
        # Construct the response JSON data
        response_data = {
            "inventory_counts": object_counts
        }
        
        return Response(response_data, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Authentication failed"}, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['GET'])
def roomdata(request, pk):
    try:
        room_status = RoomStatus.objects.get(pk=pk)
        serializer = RoomStatusSerializer(room_status)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except RoomStatus.DoesNotExist:
        return Response({"error": "RoomStatus does not exist"}, status=status.HTTP_404_NOT_FOUND)