from django.contrib import admin
from .models import AutomobileVO, Technician, Appointment


@admin.register(AutomobileVO)
class AutomobileVoAdmin(admin.ModelAdmin):
    pass


@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    pass


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    pass
