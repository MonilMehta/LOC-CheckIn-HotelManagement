from django.urls import path, include
from rest_framework import routers
from .views import RoomStatusViewSet
from .views import createroom

router = routers.DefaultRouter()
router.register(r'room-status', RoomStatusViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('createroom/', createroom, name='createroom'),
]
