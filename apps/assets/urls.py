from django.urls import path

from .views import ListFixedView, ListToolsView, ListPhysicalView, ListTreeView, ListFilesView, AddFileView, \
    DeleteFileView, AddToolView, UpdateToolView, DeleteToolView, AddFixedView, UpdateFixedView, DeleteFixedView, \
    AddPhysicalView, DeletePhysicalView, UpdatePhysicalView, AddFilePhysicalView

app_name = "assets"

urlpatterns = [
    path('tree', ListTreeView.as_view(), name='list-tree'),

    path('fixed', ListFixedView.as_view(), name='list-fixed'),
    path('add-fixed', AddFixedView.as_view(), name='list-fixed'),
    path('update-fixed/<int:pk>', UpdateFixedView.as_view(), name='update-fixed'),
    path('delete-fixed/<int:pk>', DeleteFixedView.as_view(), name='delete-fixed'),

    path('tools', ListToolsView.as_view(), name='list-tools'),
    path('add-tool', AddToolView.as_view(), name='add-tool'),
    path('update-tool/<int:pk>', UpdateToolView.as_view(), name='update-tool'),
    path('delete-tool/<int:pk>', DeleteToolView.as_view(), name='delete-tool'),

    path('physical', ListPhysicalView.as_view(), name='list-physical'),
    path('add-physical', AddPhysicalView.as_view(), name='add-physical'),
    path('delete-physical/<int:pk>', DeletePhysicalView.as_view(), name='delete-physical'),
    path('update-physical/<int:pk>', UpdatePhysicalView.as_view(), name='update-physical'),
    path('add-file-physical/<int:pk>', AddFilePhysicalView.as_view(), name='add-file-physical'),

    path('files', ListFilesView.as_view(), name='list-files'),
    path('add-file', AddFileView.as_view(), name='add-file'),
    path('delete-file/<int:pk>', DeleteFileView.as_view(), name='delete-file'),
]
