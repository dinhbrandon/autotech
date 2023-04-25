from django.db import models


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=200)


class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.PositiveSmallIntegerField()


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.TextField()
    status = models.BooleanField()
    # vin most likely will be JSON that we parse from automobile content
    vin = models.CharField(max_length=200)
    customer = models.CharField(max_length=200)
    technician = models.ForeignKey(
        Technician,
        related_name="appointment",
        on_delete=models.PROTECT
    )
