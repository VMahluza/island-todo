from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


# By default the user is admin
class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        INTERN = "INTERN", "Intern"
        COORDINATOR = "COORDINATOR", "Coordinator"
        HOST_EMPLOYER = "HOST_EMPLOYER", "Host Employer"

    # The user will be assumed to be admin on add user
    base_role = Role.ADMIN
    role = models.CharField(max_length=50, choices=Role.choices, default=base_role)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.username})"


@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)