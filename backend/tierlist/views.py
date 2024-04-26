from django.shortcuts import render
from django.core import serializers
from django.http import Http404, HttpResponseNotAllowed, HttpResponse
from .models import Card, User, ListPublished, ListTemplate


# Create your views here.
def test(request):
    list = ListTemplate.objects.filter(id=1)
    cards = list[0].card_set.all()
    data1 = serializers.serialize("json", list)
    data2 = serializers.serialize("json", cards)
    data3 = {}
    data3['list'] = list
    data3['cards'] = cards
    print(data3)
    print(serializers.serialize("json", data3))
    return HttpResponse(data3)