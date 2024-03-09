from django.urls import path
from .views import signup,signin, MyTokenRefreshView

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('signin/', signin, name='signin'),
    path('token/refresh/', MyTokenRefreshView.as_view(), name='token_refresh'),
]
