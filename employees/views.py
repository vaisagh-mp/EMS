from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from .models import Employee, EmployeeFieldValue
from .serializers import EmployeeSerializer


# -------------------------
# Create Employee
# -------------------------
class CreateEmployeeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )


# -------------------------
# List Employees (with search)
# -------------------------
class ListEmployeeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        search_label = request.GET.get("label")
        search_value = request.GET.get("value")

        employees = Employee.objects.all()

        if search_label and search_value:
            employees = employees.filter(
                values__field__label__icontains=search_label,
                values__value__icontains=search_value
            ).distinct()

        return Response(
            EmployeeSerializer(employees, many=True).data
        )


# -------------------------
# Update Employee
# -------------------------
class UpdateEmployeeView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        employee = get_object_or_404(Employee, pk=pk)

        serializer = EmployeeSerializer(
            employee,
            data=request.data
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)


# -------------------------
# Delete Employee
# -------------------------
class DeleteEmployeeView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        employee = get_object_or_404(Employee, pk=pk)
        employee.delete()
        return Response(
            {"message": "Deleted"},
            status=status.HTTP_204_NO_CONTENT
        )