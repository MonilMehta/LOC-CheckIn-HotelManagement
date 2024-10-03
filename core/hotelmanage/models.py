from django.db import models
from authentication.models import User
from django.core.validators import MaxValueValidator

class RoomStatus(models.Model):
    ROOM_STATUSES = (
        ('clean', 'Clean'),
        ('maintenance', 'Needs Maintenance'),
    )
    room_number = models.CharField(max_length=50)
    status = models.CharField(max_length=20, choices=ROOM_STATUSES, default='clean')
    last_checked = models.DateTimeField(auto_now=True)
    employee = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    progress_description = models.TextField(blank=True, null=True)
    room_image = models.ImageField(upload_to='room_images/', blank=True, null=True)
    
    # New fields
    notes = models.TextField(blank=True, null=True,default='')
    reported_issues = models.TextField(blank=True, null=True,default='')
    last_cleaning_success = models.BooleanField(null=True, blank=True,default=None)
   
    # Inventory fields
    bottle = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(2)])
    cup = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(4)])
    wine_glass = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(2)])
    bowl = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(4)])

    def __str__(self):
        return f"Room {self.room_number} - {self.status}"

    def save(self, *args, **kwargs):
        print("Saving room status")
        print("Current status:", self.status)
       
        # Check if the room is clean based on the inventory counts
        is_clean = (
            self.bottle <= 2 and
            self.cup <= 4 and
            self.wine_glass <= 2 and
            self.bowl <= 4
        )
        print("Is clean:", is_clean)
       
        if self.status == 'maintenance':
            pass  # Keep the status as maintenance
        elif is_clean:
            self.status = 'clean'
        else:
            self.status = 'maintenance'
       
        # Update last_cleaning_success
        self.last_cleaning_success = is_clean if self.status == 'clean' else False
       
        print("Updated status:", self.status)
        super().save(*args, **kwargs)

class RoomCleanLog(models.Model):
    employee = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(RoomStatus, on_delete=models.CASCADE)
    clean_date = models.DateTimeField(auto_now_add=True)
    success = models.BooleanField(default=False)  # Did the staff clean it properly?
    notes = models.TextField(blank=True, null=True)
    reported_issues = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Room {self.room.room_number} cleaned by {self.employee.username}"