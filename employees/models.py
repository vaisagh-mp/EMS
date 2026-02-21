from django.db import models
from forms_builder.models import DynamicForm, FormField


class Employee(models.Model):
    form = models.ForeignKey(DynamicForm, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class EmployeeFieldValue(models.Model):
    employee = models.ForeignKey(Employee, related_name='values', on_delete=models.CASCADE)
    field = models.ForeignKey(FormField, on_delete=models.CASCADE)
    value = models.TextField()