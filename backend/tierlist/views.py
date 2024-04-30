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

class PublishedAll(APIView):
# GET /published
    def get(self, request, *args, **kwargs):
        published = ListPublished.objects.filter(user = request.user.id)
        serializer = ListTemplateSerializer(published, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
# POST /published
    def post(self, request, *args, **kwargs):
        data = {
            'name': request.data.get('name'), 
            'description': request.data.get('description'),
            'public': request.data.get('public'), 
            'owner': request.user.id,
            'template': request.data.get('template_id')
        }
        serializer = ListPublishedSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# DELETE /published/<template_ID>
# PUT /published/<template_ID>

# POST /templates/<template_ID>/cards

# DELETE /templates/<template_ID>/cards/<card_ID>

# POST /signup
# POST /login