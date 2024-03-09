from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User 
from rest_framework import serializers

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        token['username'] = user.username
        return token
    

class SignupSerializer(serializers.ModelSerializer):
    employee_type = serializers.ChoiceField(choices=User.TYPE_CHOICES)

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name', 'employee_type']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user