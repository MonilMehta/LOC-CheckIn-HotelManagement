from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('signin/', views.signin, name='signin'),
    path('signout/', views.signout, name='signout'),
    path('profile/', views.get_user_profile, name='user-profile'),
    path('profile/update/', views.update_user_profile, name='update-user-profile'),
    path('users/', views.UserList.as_view(), name='user-list'),
]
