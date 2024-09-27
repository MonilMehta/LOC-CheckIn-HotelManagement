from django.urls import path, include
from rest_framework import routers
from .views import RoomStatusViewSet
from .views import createroom, inventory_check, roomdata, DashboardStatsView, updateroom

# Initialize the router and register the RoomStatusViewSet
router = routers.DefaultRouter()
router.register(r'room-status', RoomStatusViewSet)

# Define URL patterns
urlpatterns = [
    path('', include(router.urls)),              
    path('createroom/', createroom, name='createroom'),  
    path('updateroom/<str:room_number>/', updateroom, name='updateroom'),
    path('inventory-check/', inventory_check, name='inventory_check'),  
    path('room/<int:pk>/', roomdata, name='room-detail'),  
    path('admin/dashboard-stats/', DashboardStatsView.as_view(), name='admin-dashboard-stats'),  
]
