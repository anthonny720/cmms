from django.urls import path

from .views import WorkOrderPendingListView, WorkOrderFinishListView, AddWorkOrderView, UpdateWorkOrderView, \
    DeleteWorkOrderView, AddWorkRequestView, ListWorkRequestView, GenerateOTView, AddResourcesOTView, GetOTView, \
    DeleteResourceOTView, UpdateWorkSupervisorView

app_name = "management"

urlpatterns = [
    path('pending', WorkOrderPendingListView.as_view(), name='list-pending'),
    path('finished', WorkOrderFinishListView.as_view(), name='list-finished'),
    path('add-work', AddWorkOrderView.as_view(), name='add-work'),
    path('update-work/<int:pk>', UpdateWorkOrderView.as_view(), name='update-work'),
    path('update-work-supervisor/<int:pk>', UpdateWorkSupervisorView.as_view(), name='update-work-supervisor'),
    path('delete-work/<int:pk>', DeleteWorkOrderView.as_view(), name='delete-work'),
    path('list-work-request', ListWorkRequestView.as_view(), name='list-work-request'),
    path('add-work-request', AddWorkRequestView.as_view(), name='add-work-request'),
    path('generate-work', GenerateOTView.as_view(), name='generate-work '),
    path('add-resource/<int:pk>', AddResourcesOTView.as_view(), name='add-resource '),
    path('delete-resource/<int:pk>', DeleteResourceOTView.as_view(), name='delete-resource '),
    path('get-work/<int:pk>', GetOTView.as_view(), name='get-work')

]
