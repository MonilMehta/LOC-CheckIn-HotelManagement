from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import RoomStatus, RoomCleanLog

@receiver(post_save, sender=RoomStatus)
def log_room_cleaning(sender, instance, **kwargs):
    # Check if the room was cleaned
    if instance.status == 'clean':
        RoomCleanLog.objects.create(
            employee=instance.employee,
            room=instance,
            success=True  # Assuming a 'clean' status means the cleaning was successful
        )
    elif instance.status == 'maintenance':
        RoomCleanLog.objects.create(
            employee=instance.employee,
            room=instance,
            success=False  # Assuming a 'maintenance' status means the cleaning failed
        )
