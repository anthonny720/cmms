from django.urls import path

from .views import ListStoreView, ListRequirementsView, AddRequirementsView, UpdateRequirementsView, \
    DeleteRequirementsView, SyncStoreView

app_name = "store"

urlpatterns = [
    path('article', ListStoreView.as_view(), name='list-store'),
    path('article/sync', SyncStoreView.as_view(), name='sync-article'),

    path('list-requirements', ListRequirementsView.as_view(), name='list-requirements'),
    path('add-requirements', AddRequirementsView.as_view(), name='add-requirements'),
    path('update-requirements/<int:id>', UpdateRequirementsView.as_view(), name='update-requirements'),
    path('delete-requirements/<int:id>', DeleteRequirementsView.as_view(), name='delete-requirements'),

]
