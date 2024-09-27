from django.urls import path
from .views import signup,signin,getemp

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('signin/', signin, name='signin'),
    path('getemp/',getemp)
]
