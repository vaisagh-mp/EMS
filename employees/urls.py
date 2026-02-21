from django.urls import path
from .views import (
    CreateEmployeeView,
    ListEmployeeView,
    UpdateEmployeeView,
    DeleteEmployeeView,
)

urlpatterns = [
    path("create/", CreateEmployeeView.as_view(), name="create-employee"),
    path("list/", ListEmployeeView.as_view(), name="list-employees"),
    path("update/<int:pk>/", UpdateEmployeeView.as_view(), name="update-employee"),
    path("delete/<int:pk>/", DeleteEmployeeView.as_view(), name="delete-employee"),
]