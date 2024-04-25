from django.urls import path
from . import views

urlpatterns = [
    path("employees/", views.EmployeeListCreate.as_view(), name="employee-list"),
    path("employees/delete/<int:pk>", views.EmployeeDelete.as_view(), name="employee-delete")
]