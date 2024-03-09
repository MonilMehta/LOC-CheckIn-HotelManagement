from django.db import models
from authentication.models import User

class RoomStatus(models.Model):
    ROOM_STATUSES = (
        ('clean', 'Clean'),
        ('maintenance', 'Needs Maintenance'),
    )

    room_number = models.CharField(max_length=50)
    is_cleaned = models.BooleanField(default=False)  # Field to track if the room is cleaned
    status = models.CharField(max_length=20, choices=ROOM_STATUSES)
    last_checked = models.DateTimeField(auto_now=True)
    employee = models.ForeignKey(User, on_delete=models.CASCADE)
    progress_description = models.TextField(blank=True, null=True)
    room_image = models.ImageField(upload_to='room_images/', blank=True, null=True)
    flagged_for_maintenance = models.BooleanField(default=False)

    # Inventory fields
    toiletries = models.PositiveIntegerField(default=0)
    towels = models.PositiveIntegerField(default=0)
    minibar_items = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Room {self.room_number} - {self.status}"

    def save(self, *args, **kwargs):
        # Update the flagged_for_maintenance field based on the room status
        if self.status == 'maintenance':
            self.flagged_for_maintenance = True
        else:
            self.flagged_for_maintenance = False
        
        super().save(*args, **kwargs)
