# serializers.py
from rest_framework import serializers
from .models import User

class SignupSerializer(serializers.ModelSerializer):
    employee_type = serializers.ChoiceField(choices=User.TYPE_CHOICES)

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name', 'employee_type']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
