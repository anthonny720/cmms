from django.urls import path

from .views import DeleteUserView, UpdateUserView, ListThirdPartiesView, AddThirdPartiesView, UpdateThirdPartiesView, \
    DeleteThirdPartiesView

app_name = "users"

urlpatterns = [
    path('delete-user/<int:pk>', DeleteUserView.as_view(), name='delete-user'),
    path('update-user/<int:pk>', UpdateUserView.as_view(), name='update-user'),
    path('third-parties', ListThirdPartiesView.as_view(), name='list-third-parties'),
    path('third-parties/add', AddThirdPartiesView.as_view(), name='add-third-parties'),
    path('third-parties/update/<int:pk>', UpdateThirdPartiesView.as_view(), name='update-third-parties'),
    path('third-parties/delete/<int:pk>', DeleteThirdPartiesView.as_view(), name='delete-third-parties'), ]
