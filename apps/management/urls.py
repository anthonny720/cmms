from django.urls import path

from .views import AddWorkOrderView, UpdateWorkOrderView, DeleteWorkOrderView, AddResourcesOTView, WorkOrderListView, UpdateWorkSupervisorView, DeleteResourceOTView, DeleteHelperOTView, AddHelpersOTView, UpdateWorkRequesterView

app_name = "management"

urlpatterns = [path('works', WorkOrderListView.as_view(), name='list-word'),
               path('works/add', AddWorkOrderView.as_view(), name='add-work'),
               path('works/update/<int:pk>', UpdateWorkOrderView.as_view(), name='update-work'),
               path('works/delete/<int:pk>', DeleteWorkOrderView.as_view(), name='delete-work'),

               path('works/update/<int:pk>/resource', AddResourcesOTView.as_view(), name='add-resource '),
               path('works/delete/<int:pk>/resource', DeleteResourceOTView.as_view(), name='delete-resource '),

               path('works/update/<int:pk>/helper', AddHelpersOTView.as_view(), name='add-helper'),
               path('works/delete/<int:pk>/helper', DeleteHelperOTView.as_view(), name='delete-helper'),

               path('update-work-supervisor/<int:pk>', UpdateWorkSupervisorView.as_view(),
                    name='update-work-supervisor'),
               path('update-work-requester/<int:pk>', UpdateWorkRequesterView.as_view(), name='update-work-requester'),

               ]
