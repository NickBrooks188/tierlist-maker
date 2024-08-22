from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
import json


class AppUserManager(BaseUserManager):
    def create_user(self, email, password=None, image_url=''):
        if not email or not password:
            raise ValueError('An email and password are required')
        email_normalized = self.normalize_email(email)
        user = self.model(email=email_normalized)
        user.set_password(password)
        user.image_url = image_url
        user.save()
        return user

class User(AbstractBaseUser, PermissionsMixin):
    # id created automatically
    email = models.EmailField(max_length=40, null=False, unique=True)
    # password = models.CharField(max_length=64, null=False)
    image_url = models.TextField(default='', null=True, blank=True)
    USERNAME_FIELD = 'email'
    objects = AppUserManager()

    def __str__(self):
        return self.email
    
    class Meta:
        db_table = "tierforge.user"

class ListTemplate(models.Model):
    name = models.TextField(null=False)
    description = models.CharField(max_length=256, null=True, blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    background_image_url = models.TextField(default = '', null=True, blank=True)
    public = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    class Meta:
        db_table = "tierforge.listtemplate"
    
class ListPublished(models.Model):
    name = models.TextField(null=False)
    description = models.CharField(max_length=256, null=True, blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    template = models.ForeignKey(ListTemplate, related_name="published_lists", on_delete=models.CASCADE, default=1)
    public = models.BooleanField(default=False)
    s_tier = models.TextField(default='[]')
    a_tier = models.TextField(default='[]')
    b_tier = models.TextField(default='[]')
    c_tier = models.TextField(default='[]')
    d_tier = models.TextField(default='[]')
    f_tier = models.TextField(default='[]')

    class Meta:
        db_table = "tierforge.listpublished"


class Card(models.Model):
    name = models.TextField(null=False)
    image_url = models.TextField(null=True, blank=True)
    list = models.ForeignKey(ListTemplate, related_name='cards', on_delete=models.CASCADE, default=1)

    def __str__(self):
        return json.dumps([self.id, self.name, self.image_url])
    
    class Meta:
        db_table = "tierforge.card"