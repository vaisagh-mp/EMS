from django.urls import path
from .views import (
    CreateFormView,
    UpdateFormView,
    DeleteFormView,
    AddFieldView,
    UpdateFieldView,
    DeleteFieldView,
    ListFormsView,
)

urlpatterns = [
    # Forms
    path("create/", CreateFormView.as_view(), name="create-form"),
    path("list/", ListFormsView.as_view(), name="list-forms"),
    path("<int:form_id>/update/", UpdateFormView.as_view(), name="update-form"),
    path("<int:form_id>/delete/", DeleteFormView.as_view(), name="delete-form"),

    # Fields
    path("<int:form_id>/add-field/", AddFieldView.as_view(), name="add-field"),
    path("field/<int:field_id>/update/", UpdateFieldView.as_view(), name="update-field"),
    path("field/<int:field_id>/delete/", DeleteFieldView.as_view(), name="delete-field"),
]