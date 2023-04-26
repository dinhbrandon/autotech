from django.db import models


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=200)

    def __str__(self):
        return self.vin


class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.PositiveSmallIntegerField()

    def __str__(self):
        return f"{self.last_name}, {self.first_name}"


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.TextField()
    # status not included in encoder; customer cannot select - manually set True
    status = models.CharField(max_length=200, default="In progress")
    # vin most likely will be JSON that we parse from automobile content
    vin = models.CharField(max_length=200)
    customer = models.CharField(max_length=200)
    # is_vip not included in encoder; customer cannot select - manually set True
    is_vip = models.BooleanField(default=False)
    technician = models.ForeignKey(
        Technician,
        related_name="appointment",
        on_delete=models.PROTECT
    )

    def __str__(self):
        return self.customer

    def is_finished(self):
        self.status = "Finished"
        self.save()

    def is_canceled(self):
        self.status = "Canceled"
        self.save()


