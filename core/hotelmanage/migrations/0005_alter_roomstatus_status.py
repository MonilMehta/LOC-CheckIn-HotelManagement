# Generated by Django 5.0.1 on 2024-03-09 19:04

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("hotelmanage", "0004_remove_roomstatus_inventory_update_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="roomstatus",
            name="status",
            field=models.CharField(
                blank=True,
                choices=[("clean", "Clean"), ("maintenance", "Needs Maintenance")],
                max_length=20,
                null=True,
            ),
        ),
    ]