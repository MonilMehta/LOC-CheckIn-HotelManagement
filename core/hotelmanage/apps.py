from django.apps import AppConfig


class HotelmanageConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "hotelmanage"

    def ready(self):
        # No initialization needed
        pass