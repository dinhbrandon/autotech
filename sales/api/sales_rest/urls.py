from django.urls import path

from .views import api_list_salespeople, api_show_salesperson, api_list_customers, api_show_customer, api_list_sales, api_show_sale, api_show_automobile_vo

urlpatterns = [
    path("salespeople/", api_list_salespeople, name="api_list_salespeople"),
    path("salespeople/<int:id>/", api_show_salesperson, name="api_show_salesperson"),
    path("customers/", api_list_customers, name="api_list_customers"),
    path("customers/<int:id>", api_show_customer, name="api_show_customer"),
    path("sales/", api_list_sales, name="api_list_sales"),
    path("sales/<int:id>", api_show_sale, name="api_show_sale"),
    path("autovo/", api_show_automobile_vo, name="api_show_automobile_vo")
]
