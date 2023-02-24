from django.urls import path

from .views import DeleteUserView, UpdateUserView, ListThirdPartiesView, AddThirdPartiesView, UpdateThirdPartiesView, \
    DeleteThirdPartiesView

app_name = "users"

urlpatterns = [
    path('delete-user/<int:id>', DeleteUserView.as_view(), name='delete-user'),
    path('update-user/<int:id>', UpdateUserView.as_view(), name='update-user'),
    path('list-third-parties', ListThirdPartiesView.as_view(), name='list-third-parties'),
    path('add-third-parties', AddThirdPartiesView.as_view(), name='add-third-parties'),
    path('update-third-parties/<int:pk>', UpdateThirdPartiesView.as_view(), name='update-third-parties'),
    path('delete-third-parties/<int:pk>', DeleteThirdPartiesView.as_view(), name='delete-third-parties'),
]
