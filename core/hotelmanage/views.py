from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import RoomStatus
from .serializers import RoomStatusCreateSerializer, RoomStatusSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

class RoomStatusViewSet(viewsets.ModelViewSet):
    queryset = RoomStatus.objects.all()
    serializer_class = RoomStatusSerializer
    permission_classes = [IsAuthenticated]

# views.py

@api_view(['POST', 'PUT'])
def createroom(request):
    if request.method == 'POST':
        # Logic for creating a new room status object
        serializer = RoomStatusCreateSerializer(data=request.data)
        if serializer.is_valid():
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
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
