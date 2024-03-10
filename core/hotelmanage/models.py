from django.db import models
from authentication.models import User
from django.core.validators import MaxValueValidator

class RoomStatus(models.Model):
    ROOM_STATUSES = (
        ('clean', 'Clean'),
        ('maintenance', 'Needs Maintenance'),
    )

    room_number = models.CharField(max_length=50)
    is_cleaned = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=ROOM_STATUSES, default='clean')
    last_checked = models.DateTimeField(auto_now=True)
    employee = models.ForeignKey(User, on_delete=models.CASCADE, default=1)  # Default value set to None
    progress_description = models.TextField(blank=True, null=True)
    room_image = models.ImageField(upload_to='room_images/', blank=True, null=True)
    flagged_for_maintenance = models.BooleanField(default=False)

    # Inventory fields
    bottle = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(2)])
    cup = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(4)])
    wine_glass = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(2)])
    bowl = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(4)])

    def __str__(self):
        return f"Room {self.room_number} - {self.status}"

    def save(self, *args, **kwargs):
        if self.employee_id is None and hasattr(self, 'request') and hasattr(self.request, 'user'):
            self.employee = self.request.user
        # Update the flagged_for_maintenance field based on the room status
        if self.status == 'maintenance':
            self.flagged_for_maintenance = True
        else:
            self.flagged_for_maintenance = False
        
        super().save(*args, **kwargs)
