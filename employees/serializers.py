from rest_framework import serializers
from .models import Employee, EmployeeFieldValue
from forms_builder.models import FormField


class EmployeeFieldValueSerializer(serializers.ModelSerializer):
    field_label = serializers.CharField(source='field.label', read_only=True)

    class Meta:
        model = EmployeeFieldValue
        fields = ['id', 'field', 'field_label', 'value']


class EmployeeSerializer(serializers.ModelSerializer):
    values = EmployeeFieldValueSerializer(many=True)

    class Meta:
        model = Employee
        fields = ['id', 'form', 'created_at', 'values']

    def create(self, validated_data):
        values_data = validated_data.pop('values')
        employee = Employee.objects.create(**validated_data)

        for value in values_data:
            EmployeeFieldValue.objects.create(
                employee=employee,
                field=value['field'],
                value=value['value']
            )

        return employee