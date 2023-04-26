from django.db import models
from django.urls import reverse

# Create your models here.
class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=150, unique=True)
    vin = models.CharField(max_length=17)
    sold = models.BooleanField(default=False)

class Salesperson(models.Model):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    employee_id = models.CharField(max_length=150)


    def get_api_url(self):
        return reverse("api_salesperson", kwargs={"pk": self.pk})

class Customer(models.Model):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    address = models.CharField(max_length=150)
    phone_number = models.CharField(max_length=15)

    def get_api_url(self):
        return reverse("api_customer", kwargs={"pk": self.pk})

class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sale",
        on_delete=models.PROTECT,
    )

    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sale",
        on_delete=models.PROTECT,
    )

    customer = models.ForeignKey(
        Customer,
        related_name="sale",
        on_delete=models.PROTECT,
    )

    price = models.IntegerField()

    def get_api_url(self):
        return reverse("api_sale", kwargs={"pk": self.pk})
