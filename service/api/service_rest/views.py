from datetime import datetime
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from service_rest.models import AutomobileVO, Technician, Appointment
import json


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin"]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
        ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date_time",
        "reason",
        "status",
        "is_vip",
        "vin",
        "customer",
        "technician",
        ]

    encoders = {
        "technician": TechnicianEncoder(),
    }




@require_http_methods(["GET", "POST"])
def list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()


        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create employee; incorrect or missing information."}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "POST"])
def list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()

        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            try:
                technician_id = content["technician"]
                technician = Technician.objects.get(id=technician_id)
                content["technician"] = technician
            except Technician.DoesNotExist:
                return JsonResponse(
                    {"message": "Does not match any technicians"},
                    status=400,
                )
            #  sets the is_vip field to true or false depending on vin existing in inventory
            vin = content["vin"]
            if AutomobileVO.objects.filter(vin=vin).count() == 1:
                content["is_vip"] = True
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create appointment; incorrect or missing information."}
            )
            response.status_code = 400
            return response



@require_http_methods(["PUT"])
def is_finished(request, pk):
    appointment = Appointment.objects.get(id=pk)
    appointment.is_finished()
    return JsonResponse(
        appointment,
        encoder=AppointmentEncoder,
        safe=False,
    )


@require_http_methods(["PUT"])
def is_canceled(request, pk):
    appointment = Appointment.objects.get(id=pk)
    appointment.is_canceled()
    return JsonResponse(
        appointment,
        encoder=AppointmentEncoder,
        safe=False,
    )


