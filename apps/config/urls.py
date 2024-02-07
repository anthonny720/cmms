from django.urls import path

from .views import ListFailureView, ListTypeView, AddFailureView, AddTypeView, UpdateFailureView, UpdateTypeView, \
    DeleteFailureView, DeleteTypeView, ListCategoryView, AddCategoryView, UpdateCategoryView, DeleteCategoryView

app_name = "config"

urlpatterns = [
    path('failure', ListFailureView.as_view(), name='list-failure'),
    path('type', ListTypeView.as_view(), name='list-type'),
    path('add-failure', AddFailureView.as_view(), name='add-failure'),
    path('add-type', AddTypeView.as_view(), name='add-type'),
    path('update-failure/<int:pk>', UpdateFailureView.as_view(), name='update-failure'),
    path('update-type/<int:pk>', UpdateTypeView.as_view(), name='update-type'),
    path('delete-failure/<int:pk>', DeleteFailureView.as_view(), name='delete-failure'),
    path('delete-type/<int:pk>', DeleteTypeView.as_view(), name='delete-type'),
    path('category', ListCategoryView.as_view(), name='delete-type'),
    path('add-category', AddCategoryView.as_view(), name='add-category'),
    path('update-category/<int:pk>', UpdateCategoryView.as_view(), name='update-category'),
    path('delete-category/<int:pk>', DeleteCategoryView.as_view(), name='delete-category'),
]
