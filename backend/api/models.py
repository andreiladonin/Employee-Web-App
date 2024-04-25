from django.db import models
from django.contrib.auth.models import User

class Employee(models.Model):
    first_name = models.CharField(max_length=50, blank=False, null=False)
    last_name = models.CharField(max_length=50, blank=False, null=False)
    age = models.IntegerField(blank=False, null=False)
    post = models.CharField(max_length=20, blank=False, null=False)
    created_at = models.DateField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="employees")

    def __str__(self) -> str:
        return self.name + " " + self.surname 