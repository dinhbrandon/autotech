from django.urls import path
from service_rest.views import list_technicians, list_appointments, is_finished, is_canceled

urlpatterns = [
    path("technicians/", list_technicians, name="list_technicians"),
    path("appointments/", list_appointments, name="list_appointments"),
    path("appointments/<int:pk>/finish", is_finished, name="is_finished"),
    path("appointments/<int:pk>/cancel", is_canceled, name="is_canceled"),
]