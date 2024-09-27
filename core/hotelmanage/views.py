from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from .serializers import RoomStatusCreateSerializer, RoomStatusSerializer, EmployeePerformanceSerializer
from .aimodels import predict_single_image, detect_objects_and_count
from .models import RoomStatus, RoomCleanLog
from authentication.models import User


class RoomStatusViewSet(viewsets.ModelViewSet):
    queryset = RoomStatus.objects.all()
    print(queryset)
    serializer_class = RoomStatusSerializer
    permission_classes = [IsAuthenticated]


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createroom(request):
    serializer = RoomStatusCreateSerializer(data=request.data)
    if serializer.is_valid():
        room_number = request.data.get('room_number')
        room_image = serializer.validated_data.get('room_image')
        image_content = ContentFile(room_image.read())
        image_name = room_image.name
        image_path = default_storage.save(f'D:/Hackathon/LOC/core/room_images/{image_name}', image_content)

        # Check if a RoomStatus object with the given room number exists
        if RoomStatus.objects.filter(room_number=room_number).exists():
            return Response({'error': 'Room status already exists'}, status=status.HTTP_400_BAD_REQUEST)

        # Logic for creating a new RoomStatus object
        image, prediction = predict_single_image(image_path)
        status = 'clean' if prediction[0][0] < 0.6 else 'maintenance'
        room_status = RoomStatus.objects.create(
            room_number=room_number,
            room_image=image_path,
            status=status
        )
        return Response(RoomStatusSerializer(room_status).data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateroom(request, room_number):
    try:
        room_status = RoomStatus.objects.get(room_number=room_number)
    except RoomStatus.DoesNotExist:
        return Response({'error': 'Room status not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = RoomStatusCreateSerializer(room_status, data=request.data, partial=True)
    if serializer.is_valid():
        room_image = serializer.validated_data.get('room_image')
        if room_image:
            image_content = ContentFile(room_image.read())
            image_name = room_image.name
            image_path = default_storage.save(f'D:/Hackathon/LOC/core/room_images/{image_name}', image_content)
            room_status.room_image = image_path

            # Update the existing room status object
            image, prediction = predict_single_image(image_path)
            room_status.status = 'clean' if prediction[0][0] < 0.6 else 'maintenance'

        # Assign the authenticated user to the room status
        room_status.employee = request.user
        room_status.save()
        return Response(RoomStatusSerializer(room_status).data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DashboardStatsView(APIView):
    def get(self, request):
        rooms = RoomStatus.objects.all()
        clean_rooms = rooms.filter(status='clean').count()
        maintenance_rooms = rooms.filter(status='maintenance').count()
        
        employees = User.objects.filter(employee_type='staff')
        employee_stats = []
        for employee in employees:
            clean_logs = RoomCleanLog.objects.filter(employee=employee)
            cleaned_rooms = clean_logs.count()
            success_cleaning = clean_logs.filter(success=True).count()
            accuracy = (success_cleaning / cleaned_rooms) * 100 if cleaned_rooms > 0 else 0
            employee_stats.append({
                'employee': employee.username,
                'cleaned_rooms': cleaned_rooms,
                'accuracy': accuracy
            })

        data = {
            'room_data': {
                'total_rooms': rooms.count(),
                'clean': clean_rooms,
                'maintenance': maintenance_rooms
            },
            'employee_stats': employee_stats
        }

        return Response(data, status=status.HTTP_200_OK)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])  # This enforces authentication
@csrf_exempt
def inventory_check(request):
    employee = request.user
    if not request.user.is_authenticated:
        return Response({"error": "User is not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

    if request.method == 'POST' and request.FILES.get('image'):
        image_file = request.FILES['image']
        room_number = request.data.get('room_number')

        try:
            room_status = RoomStatus.objects.get(room_number=room_number)
        except RoomStatus.DoesNotExist:
            return Response({"error": "RoomStatus does not exist"}, status=status.HTTP_404_NOT_FOUND)

        object_counts = detect_objects_and_count(image_file)
        room_status.status = request.data.get('status')
        room_status.employee = employee  # Authenticated User object
        room_status.bottle = object_counts.get('bottle', 0)/2
        room_status.cup = object_counts.get('cup', 0)/4
        room_status.wine_glass = object_counts.get('wine_glass', 0)/2
        room_status.bowl = object_counts.get('bowl', 0)/4
        room_status.save()

        return Response({"inventory_counts": object_counts}, status=status.HTTP_200_OK)
    
@api_view(['GET'])
def roomdata(request, pk):
    try:
        room_status = RoomStatus.objects.get(pk=pk)
        serializer = RoomStatusSerializer(room_status)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except RoomStatus.DoesNotExist:
        return Response({"error": "RoomStatus does not exist"}, status=status.HTTP_404_NOT_FOUND)