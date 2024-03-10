from django.urls import path, include
from rest_framework import routers
from .views import RoomStatusViewSet
from .views import createroom,inventory_check,process_images

router = routers.DefaultRouter()
router.register(r'room-status', RoomStatusViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('createroom/', createroom, name='createroom'),
    path('inventory-check/', inventory_check, name='inventory_check'),
    path('process-images/', process_images, name='process_images'),
]
