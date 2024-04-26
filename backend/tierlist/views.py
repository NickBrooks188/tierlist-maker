from django.shortcuts import render
from django.core import serializers
from django.http import Http404, HttpResponseNotAllowed, HttpResponse
from .models import Card, User, ListPublished, ListTemplate
import json

# Create your views here.
def get_list_template_by_id(request, template_id):
    list = ListTemplate.objects.filter(id=template_id)
    try:
        cards = list[0].card_set.all()
    except:
        return HttpResponse(status=404)
    list_with_cards = {}
    list_data = serializers.serialize("json", list)
    cards_data = serializers.serialize("json", cards)
    list_dict = json.loads(list_data)
    cards_dict = json.loads(cards_data)
    list_with_cards['list'] = list_dict[0]
    list_with_cards['list']['cards'] = cards_dict
    return HttpResponse(json.dumps(list_with_cards))


def get_all_list_templates(request):
    lists = ListTemplate.objects.all()
    lists_return = serializers.serialize("json", lists)
    lists_return = json.loads(lists_return)
    for i in range(len(lists)):
        cards = lists[i].card_set.all()
        cards_data = serializers.serialize("json", cards)
        cards_dict = json.loads(cards_data)
        lists_return[i]['cards'] = cards_dict
    return HttpResponse(json.dumps(lists_return))

def get_all_published_lists(request):
    lists = ListPublished.objects.all()
    lists_return = serializers.serialize("json", lists)
    test = json.loads(lists_return)
    print(test)
    return HttpResponse(lists_return)