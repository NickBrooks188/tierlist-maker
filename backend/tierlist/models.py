from django.db import models

# Create your models here.
class User(models.Model):
    # id created automatically
    email = models.CharField(max_length=40, null=False)
    password = models.CharField(max_length=64, null=False)
    image_url = models.TextField()

class ListPublished(models.Model):
    name = models.TextField(null=False)
    description = models.CharField(max_length=256)
    owner_id = models.ForeignKey(User, on_delete=models.CASCADE)
    public = models.BooleanField(default=False)
    s_tier = models.TextField()
    a_tier = models.TextField()
    b_tier = models.TextField()
    c_tier = models.TextField()
    d_tier = models.TextField()
    f_tier = models.TextField()

class ListTemplate(models.Model):
    name = models.TextField(null=False)
    description = models.CharField(max_length=256)
    owner_id = models.ForeignKey(User, on_delete=models.CASCADE)
    public = models.BooleanField(default=False)

class Card(models.Model):
    name = models.TextField(null=False)
    image_url = models.TextField()
    list_id = models.ForeignKey(ListTemplate, on_delete=models.CASCADE)