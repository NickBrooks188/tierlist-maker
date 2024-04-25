from django.shortcuts import render
from django.core import serializers
from django.http import Http404, HttpResponseNotAllowed, HttpResponse
from .models import Card, User, ListPublished, ListTemplate


# Create your views here.
def test(request):
    query = Card.objects.all()
    data = serializers.serialize("json", query)
    return HttpResponse(query)