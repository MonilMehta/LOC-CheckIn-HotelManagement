from rest_framework import serializers
from .models import RoomStatus, RoomCleanLog
from .models import RoomStatus, RoomCleanLog

class RoomStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomStatus
        fields = '__all__'

class RoomCleanLogSerializer(serializers.ModelSerializer):
    employee_name = serializers.SerializerMethodField()

    class Meta:
        model = RoomCleanLog
        fields = ['id', 'employee_name', 'clean_date', 'success', 'notes', 'reported_issues']

    def get_employee_name(self, obj):
        return obj.employee.username if obj.employee else None


class RoomStatusCreateSerializer(serializers.ModelSerializer):
    room_image = serializers.ImageField()  # Add field for room image

    class Meta:
        model = RoomStatus
        fields = ['room_number', 'status', 'employee', 'progress_description', 'room_image']

# New serializer for employee performance stats
class EmployeePerformanceSerializer(serializers.Serializer):
    employee = serializers.CharField(source='employee.username')
    cleaned_rooms = serializers.IntegerField()
    accuracy = serializers.FloatField()

