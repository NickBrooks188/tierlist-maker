from django.db import models

# Create your models here.
class User(models.Model):
    # id created automatically
    email = models.CharField(max_length=40, null=False)
    password = models.CharField(max_length=64, null=False)
    image_url = models.CharField()

class ListPublished(models.Model):
    name = models.CharField(null=False)
    description = models.CharField(max_length=256)
    owner_id = models.ForeignKey(User, on_delete=models.CASCADE)
    public = models.BooleanField(default=False)
    s_tier = models.CharField()
    a_tier = models.CharField()
    b_tier = models.CharField()
    c_tier = models.CharField()
    d_tier = models.CharField()
    f_tier = models.CharField()

class ListTemplate(models.Model):
    name = models.CharField(null=False)
    description = models.CharField(max_length=256)
    owner_id = models.ForeignKey(User, on_delete=models.CASCADE)
    public = models.BooleanField(default=False)

class Card(models.Model):
    name = models.CharField(null=False)
    image_url = models.CharField()
    list_id = models.ForeignKey(ListTemplate, on_delete=models.CASCADE)