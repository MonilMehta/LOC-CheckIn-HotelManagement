from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    STAFF = 'staff'
    ADMIN = 'admin'
    TYPE_CHOICES = [
        (STAFF, 'Staff'),
        (ADMIN, 'Admin'),
    ]
    employee_type = models.CharField(max_length=10, choices=TYPE_CHOICES)
