from django.shortcuts import render
from django.core import serializers
from django.http import Http404, HttpResponseNotAllowed, HttpResponse
from .models import Card, User, ListPublished, ListTemplate
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, serializers


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ["id", "name", "image_url"]

class ListTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListTemplate
        fields = ["id", "name", "description", "public", "owner"]

class ListPublishedSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListPublished
        fields = ["id", "name", "description", "public", "s_tier", "a_tier", "b_tier", "c_tier", "d_tier", "f_tier", "owner", "template"]

# Create your views here.
def get_list_template_by_id(request, template_id):
    list_template = ListTemplate.objects.filter(id=template_id)
    try:
        cards = list_template[0].card_set.all()
    except:
        # placeholder for list not found, might be able to speed up with ge_object_or_404
        return HttpResponse(status=404)
    list_with_cards = {}
    list_data = serializers.serialize("json", list_template)
    cards_data = serializers.serialize("json", cards)
    list_dict = json.loads(list_data)
    cards_dict = json.loads(cards_data)
    list_with_cards['list'] = list_dict[0]
    list_with_cards['list']['cards'] = cards_dict
    return HttpResponse(json.dumps(list_with_cards))


def get_all_list_templates(request):
    # can potential use ListTemplate.object.values() to clean this up
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
    return HttpResponse(lists_return)

def get_published_list_by_id(request, list_id):
    published_list = ListPublished.objects.filter(id=list_id)
    list_data = serializers.serialize("json", published_list)
    list_dict = json.loads(list_data)
    list_return = list_dict[0]
    # try:
    #     cards = list[0].card_set.all()
    # except:
    #     return HttpResponse(status=404)
    # list_with_cards = {}
    # list_data = serializers.serialize("json", list)
    # cards_data = serializers.serialize("json", cards)
    # list_dict = json.loads(list_data)
    # cards_dict = json.loads(cards_data)
    # list_with_cards['list'] = list_dict[0]
    # list_with_cards['list']['cards'] = cards_dict
    return HttpResponse(json.dumps(list_return))

# signup
def sign_up(request):
    print(request)
    if request.method != 'POST':
        return HttpResponse(status=400)
    body = json.loads(request.body.decode('utf-8'))
    email = body.get("email")
    password = body.get("password")
    image_url = body.get("image_url")
    print(email)
    return HttpResponse(status=200)

# login

# ALL ENDPOINTS

class TemplatesAll(APIView):
    permission_classes = [permissions.IsAuthenticated]

# GET /templates
    def get(self, request, *args, **kwargs):
        templates = ListTemplate.objects.filter(user = request.user.id)
        serializer = ListTemplateSerializer(templates, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
# POST /templates
    def post(self, request, *args, **kwargs):
        data = {
            'name': request.data.get('name'), 
            'description': request.data.get('description'),
            'public': request.data.get('public'), 
            'owner': request.user.id
        }
        serializer = ListTemplateSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TemplatesOne(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, list_id, *args, **kwargs):
        template = ListTemplate.objects.get(id=list_id)
        if not template:
            return Response(
                {"res": "Template does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = ListTemplateSerializer(template)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
# PUT /templates/<template_ID>
    def put(self, request, list_id, *args, **kwargs):
        template = ListTemplate.objects.get(id=list_id)
        if not template:
            return Response(
                {"res": "Template does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            'name': request.data.get('name'),
            'description': request.data.get('description'),
            'public': request.data.get('public')
        }
        serializer = ListTemplateSerializer(instance = template, data=data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# DELETE /templates/<template_ID>
    def delete(self, request, list_id, *args, **kwargs):
        template = ListTemplate.objects.get(id=list_id)
        if not template:
            return Response(
                {"res": "Template does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        template.delete()
        return Response(
            {"message": "Template deleted!"},
            status=status.HTTP_200_OK
        ) 



# GET /published
# POST /published

# DELETE /published/<template_ID>
# PUT /published/<template_ID>

# POST /templates/<template_ID>/cards

# DELETE /templates/<template_ID>/cards/<card_ID>

# POST /signup
# POST /login