from django.db import models

# Create your models here.
class User(models.Model):
    # id created automatically
    email = models.CharField(max_length=40, null=False)
    password = models.CharField(max_length=64, null=False)
    image_url = models.TextField()

    def __str__(self):
        return self.email

class ListTemplate(models.Model):
    name = models.TextField(null=False)
    description = models.CharField(max_length=256)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    public = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    
class ListPublished(models.Model):
    name = models.TextField(null=False)
    description = models.CharField(max_length=256)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    template = models.ForeignKey(ListTemplate, on_delete=models.CASCADE)
    public = models.BooleanField(default=False)
    s_tier = models.TextField(default='[]')
    a_tier = models.TextField(default='[]')
    b_tier = models.TextField(default='[]')
    c_tier = models.TextField(default='[]')
    d_tier = models.TextField(default='[]')
    f_tier = models.TextField(default='[]')


class Card(models.Model):
    name = models.TextField(null=False)
    image_url = models.TextField()
    list_id = models.ForeignKey(ListTemplate, on_delete=models.CASCADE)

    def __str__(self):
        return self.name