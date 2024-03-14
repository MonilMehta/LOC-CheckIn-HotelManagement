from django.urls import path, include
from rest_framework import routers
from .views import RoomStatusViewSet
from .views import createroom,inventory_check,roomdata

router = routers.DefaultRouter()
router.register(r'room-status', RoomStatusViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('createroom/', createroom, name='createroom'),
    path('inventory-check/', inventory_check, name='inventory_check'),
     path('room/<int:pk>/', roomdata, name='room-detail'),
]
