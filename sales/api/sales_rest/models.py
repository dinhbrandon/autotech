from django.db import models
from django.urls import reverse

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=100, unique=True, null=True)
    sold = models.BooleanField(default=False)

class Salesperson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.IntegerField()

    def get_api_url(self):
        return reverse("api_salesperson", kwargs={"pk": self.pk})

class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)

    def get_api_url(self):
        return reverse("api_customer", kwargs={"pk": self.pk})

class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        on_delete=models.PROTECT,
        related_name="sale",
    )
    salesperson = models.ForeignKey(
        Salesperson,
        on_delete=models.PROTECT,
        related_name="sale",
    )
    customer = models.ForeignKey(
        Customer,
        on_delete=models.PROTECT,
        related_name="sale",
    )
    price = models.IntegerField()
