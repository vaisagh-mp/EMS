from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from .models import DynamicForm, FormField
from .serializers import DynamicFormSerializer, FormFieldSerializer


# -------------------------
# Create Form
# -------------------------
class CreateFormView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        form = DynamicForm.objects.create(
            name=request.data.get("name"),
            created_by=request.user
        )
        return Response(
            DynamicFormSerializer(form).data,
            status=status.HTTP_201_CREATED
        )


# -------------------------
# Update Form (Rename)
# -------------------------
class UpdateFormView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, form_id):
        form = get_object_or_404(
            DynamicForm,
            id=form_id,
            created_by=request.user
        )

        form.name = request.data.get("name", form.name)
        form.save()

        return Response(DynamicFormSerializer(form).data)


# -------------------------
# Delete Form
# -------------------------
class DeleteFormView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, form_id):
        form = get_object_or_404(
            DynamicForm,
            id=form_id,
            created_by=request.user
        )
        form.delete()
        return Response(
            {"message": "Form deleted successfully"},
            status=status.HTTP_204_NO_CONTENT
        )


# -------------------------
# Add Field
# -------------------------
class AddFieldView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, form_id):
        form = get_object_or_404(
            DynamicForm,
            id=form_id,
            created_by=request.user
        )

        serializer = FormFieldSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(form=form)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


# -------------------------
# Update Field
# -------------------------
class UpdateFieldView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, field_id):
        field = get_object_or_404(FormField, id=field_id)

        # Ensure user owns the form
        if field.form.created_by != request.user:
            return Response(
                {"detail": "Not allowed"},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = FormFieldSerializer(
            field,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)


# -------------------------
# Delete Field
# -------------------------
class DeleteFieldView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, field_id):
        field = get_object_or_404(FormField, id=field_id)

        if field.form.created_by != request.user:
            return Response(
                {"detail": "Not allowed"},
                status=status.HTTP_403_FORBIDDEN
            )

        field.delete()
        return Response(
            {"message": "Field deleted"},
            status=status.HTTP_204_NO_CONTENT
        )


# -------------------------
# List Forms
# -------------------------
class ListFormsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        forms = DynamicForm.objects.filter(created_by=request.user)
        return Response(
            DynamicFormSerializer(forms, many=True).data
        )