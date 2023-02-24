from django.urls import path

from .views import GetQuantityOTPersonnel, GetGraphicsFailure, GetGraphicsType, GetGraphicsEquipment, GetTotalOT, \
    GetGraphicsFacilities, GetIndicatorView, GetCostDay, GetTotalCostView, GetTableOTView

app_name = "graphics"

urlpatterns = [
    path('get-graphics-personnel', GetQuantityOTPersonnel.as_view(), name='get-graphics-personnel'),
    path('get-graphics-failure', GetGraphicsFailure.as_view(), name='get-graphics-failure'),
    path('get-graphics-type', GetGraphicsType.as_view(), name='get-graphics-type'),
    path('get-graphics-equipment', GetGraphicsEquipment.as_view(), name='get-graphics-equipment'),
    path('get-graphics-facilities', GetGraphicsFacilities.as_view(), name='get-graphics-facilities'),
    path('get-graphics-total-ot', GetTotalOT.as_view(), name='get-graphics-total-ot'),
    path('get-graphics-indicators', GetIndicatorView.as_view(), name='get-graphics-indicator'),
    path('get-graphics-cost-day', GetCostDay.as_view(), name='get-graphics-cost-day'),
    path('get-graphics-total-cost', GetTotalCostView.as_view(), name='get-graphics-total-cost'),
    path('get-total-ot', GetTableOTView.as_view(), name='get-total-ot'),
]
