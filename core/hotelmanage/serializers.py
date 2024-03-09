from rest_framework import serializers
from .models import RoomStatus

class RoomStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomStatus
        fields = '__all__'


class RoomStatusCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomStatus
        fields = ['room_number', 'status', 'employee', 'progress_description', 'toiletries', 'towels', 'minibar_items', 'room_image']
