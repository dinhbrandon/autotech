from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
# from django.shortcuts import get_object_or_404

from common.json import ModelEncoder
from .models import AutomobileVO, Salesperson, Customer, Sale

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "import_href",
        "sold",
    ]

class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
        "id"
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "id"
    ]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "automobile",
        "salesperson",
        "customer",
        "price",
        "id"
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder()
    }

@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        try:
            salespeople = Salesperson.objects.all()
            return JsonResponse(
                {"salespeople": salespeople},
                encoder=SalespersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Does not exist"},
                status=404
            )

    else:
        try:
            content = json.loads(request.body)

            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except:
            return JsonResponse(
                {"message": "Could not create Salesperson"},
                status=400
            )

@require_http_methods(["GET", "DELETE"])
def api_show_salesperson(request, id):
    if request.method == "GET":
        try:
            salesperson = Salesperson.objects.get(id=id)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson object does not exist"},
                status=404
            )

    else:
        try:
            count, _ = Salesperson.objects.filter(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Does not exist"},
                status=404
            )

@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        try:
            customers = Customer.objects.all()
            return JsonResponse(
                {"customers": customers},
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Does not exist"},
                status=404
            )

    else:
        try:
            content = json.loads(request.body)

            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except:
            return JsonResponse(
                {"message": "Could not create Customer"},
                status=400
            )

@require_http_methods(["GET", "DELETE"])
def api_show_customer(request, id):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer object does not exist"},
                status=404
            )

    else:
        try:
            count, _ = Customer.objects.filter(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Does not exist"},
                status=404
            )

@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        try:
            sales = Sale.objects.all()
            return JsonResponse(
                {"sales": sales},
                encoder=SaleEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Does not exist"},
                status=404
            )

    else:
        try:
            content = json.loads(request.body)

            # Handle automobile foreign key
            try:
                auto_vin = content["automobile"]
                automobile = AutomobileVO.objects.get(vin=auto_vin)
                automobile.sold = True
                automobile.save()
                content["automobile"] = automobile
            except AutomobileVO.DoesNotExist:
                return JsonResponse(
                    {"message": "Invalid automobile VIN"},
                    status=400
                )

            # Handle salesperson foreign key
            try:
                salesperson_id = content["salesperson"]
                salesperson = Salesperson.objects.get(id=salesperson_id)
                content["salesperson"] = salesperson
            except Salesperson.DoesNotExist:
                return JsonResponse(
                    {"message": "Invalid salesperson id"},
                    status=400
                )

            # Handle customer foreign key
            try:
                customer_id = content["customer"]
                customer = Customer.objects.get(id=customer_id)
                content["customer"] = customer
            except Customer.DoesNotExist:
                return JsonResponse(
                    {"message": "Invalid customer id"},
                    status=400
                )

            sale = Sale.objects.create(**content)
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        except:
            return JsonResponse(
                {"message": "Could not create Sale"},
                status=400
            )


@require_http_methods(["GET", "DELETE"])
def api_show_sale(request, id):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=id)
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Sale object does not exist"},
                status=404
            )

@require_http_methods(["GET"])
def api_autoVO(request):
    if request.method == "GET":
        try:
            autoVO = AutomobileVO.objects.all()
            return JsonResponse(
                {"autos": autoVO},
                encoder=AutomobileVOEncoder,
                safe=False,
            )
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Automobile model does not exist"},
                status=404
            )

    else:
        try:
            count, _ = Sale.objects.filter(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Does not exist"},
                status=404
            )

@require_http_methods(["GET"])
def api_show_automobile_vo(request):
    if request.method == "GET":
        try:
            auto_vo = AutomobileVO.objects.all()
            return JsonResponse(
                {"autos": auto_vo},
                encoder=AutomobileVOEncoder,
                safe=False,
            )
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Does not exist"},
                status=404
            )

    else:
        try:
            count, _ = Sale.objects.filter(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Does not exist"},
                status=404
            )

@require_http_methods(["GET"])
def api_show_automobile_vo(request):
    if request.method == "GET":
        try:
            auto_vo = AutomobileVO.objects.all()
            return JsonResponse(
                {"autos": auto_vo},
                encoder=AutomobileVOEncoder,
                safe=False,
            )
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Does not exist"},
                status=404
            )
