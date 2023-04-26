from django.contrib import admin
from .models import AutomobileVO, Salesperson, Sale, Customer

# Register your models here.
admin.site.register(AutomobileVO)
admin.site.register(Salesperson)
admin.site.register(Sale)
admin.site.register(Customer)
