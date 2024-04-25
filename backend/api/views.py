from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, EmployeeSeriliazer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Employee


class EmployeeListCreate(generics.ListCreateAPIView):
    serializer_class = EmployeeSeriliazer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        post = self.request.GET.get("post")
        if post: 
            return Employee.objects.filter(user=user, post=post)
        return Employee.objects.filter(user=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)

class EmployeeDelete(generics.DestroyAPIView):
    serializer_class = EmployeeSeriliazer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Employee.objects.filter(user=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]



