from django.shortcuts import render
from django.core import serializers
from django.http import Http404, HttpResponseNotAllowed, HttpResponse
from .models import Card, User, ListPublished, ListTemplate
import json

# Create your views here.
def test(request):
    list = ListTemplate.objects.filter(id=1)
    cards = list[0].card_set.all()
    list_with_cards = {}
    list_data = serializers.serialize("json", list)
    cards_data = serializers.serialize("json", cards)
    list_dict = json.loads(list_data)
    cards_dict = json.loads(cards_data)
    list_with_cards['list'] = list_dict
    list_with_cards['cards'] = cards_dict
    return HttpResponse(json.dumps(list_with_cards))