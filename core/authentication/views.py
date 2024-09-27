# views.py
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from knox.models import AuthToken  # Import AuthToken from Knox
from .serializers import SignupSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from django.contrib.auth.models import User

@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'User created successfully','username':user.username}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@permission_classes([IsAuthenticated])  # Ensures only authenticated users can access
@api_view(['GET'])
def getemp(request):
    user = request.user

    if not user.is_authenticated:
        return Response({"error": "Authentication credentials were not provided or invalid."}, status=status.HTTP_401_UNAUTHORIZED)

    employee_details = {
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name ,
        'id':user.id
    }

    return Response(employee_details, status=status.HTTP_200_OK)

@api_view(['POST'])
def signin(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            # Generate token using Knox's AuthToken
            _, token = AuthToken.objects.create(user)
            return Response({
                'token': token
            }, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)