from django.shortcuts import render

# Create your views here.
# views.py
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import SignupSerializer, MyTokenObtainPairSerializer  # Import your serializers here
from rest_framework_simplejwt.views import TokenRefreshView

class MyTokenRefreshView(TokenRefreshView):
    pass

@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'User created successfully','username':user.username}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def signin(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            token_serializer = MyTokenObtainPairSerializer()
            token = token_serializer.get_token(user)
            refresh = RefreshToken.for_user(user)
            return Response({
                'access_token': str(token),
                'refresh_token': str(refresh)
            }, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)