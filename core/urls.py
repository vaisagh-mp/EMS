from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),

    path('api/accounts/', include('accounts.urls')),
    path('api/forms/', include('forms_builder.urls')),
    path('api/employees/', include('employees.urls')),
]