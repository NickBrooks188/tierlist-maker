from django.shortcuts import render
from django.core import serializers
from django.http import Http404, HttpResponseNotAllowed, HttpResponse
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from django.contrib.auth import get_user_model, authenticate, login, logout
from .models import Card, User, ListPublished, ListTemplate
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, serializers
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token


UserModel = get_user_model()

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ["id", "name", "image_url"]

class ListTemplateSerializer(serializers.ModelSerializer):
    cards = serializers.StringRelatedField(many=True)
    class Meta:
        model = ListTemplate
        fields = ["id", "name", "description", "public", "owner", "cards"]

class ListPublishedSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListPublished
        fields = ["id", "name", "description", "public", "s_tier", "a_tier", "b_tier", "c_tier", "d_tier", "f_tier", "owner", "template"]

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ["id", "email", "image_url"]

class UserSignupSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ["id", "email", "image_url", "password"]
    def create(self, data):
        user_obj = None
        user_obj = UserModel.objects.create_user(email=data['email'], password=data['password'])
        user_obj.save()
        return user_obj

class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ["id", "email", "image_url", "password"]

    email = serializers.EmailField()
    password = serializers.CharField()
    def check_user(self, data):
        user = authenticate(username=data['email'], password=data['password'])
        return user

# ALL ENDPOINTS

class TemplatesAll(APIView):
    permission_classes = [permissions.IsAuthenticated]
    # permission_classes = [permissions.AllowAny]


# GET /templates
    def get(self, request):
        templates = ListTemplate.objects.filter()
        serializer = ListTemplateSerializer(templates, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
# POST /templates
    def post(self, request):
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
    # permission_classes = [permissions.AllowAny]


    def get(self, request, list_id):
        template = None
        try:
            template = ListTemplate.objects.get(id=list_id)
        except:
            return Response(
                {"message": "Template does not exist"},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = ListTemplateSerializer(template)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
# PUT /templates/<list_id>
    def put(self, request, list_id):
        template = None
        try:
            template = ListTemplate.objects.get(id=list_id)
        except:
            return Response(
                {"message": "Template does not exist"},
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
    
# DELETE /templates/<list_id>
    def delete(self, request, list_id):
        template = None
        try:
            template = ListTemplate.objects.get(id=list_id)
        except:
            return Response(
                {"message": "Template does not exist"},
                status=status.HTTP_400_BAD_REQUEST
            )
        template.delete()
        return Response(
            {"message": "Template deleted!"},
            status=status.HTTP_200_OK
        ) 

class PublishedAll(APIView):
# GET /published
    def get(self, request):
        published = ListPublished.objects.filter()
        serializer = ListPublishedSerializer(published, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
# POST /published
    def post(self, request):
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


class PublishedOne(APIView):
    permission_classes = [permissions.IsAuthenticated]
    # permission_classes = [permissions.AllowAny]


    def get(self, request, list_id):
        published = None
        try:
            published = ListPublished.objects.get(id=list_id)
        except:
            return Response(
                {"message": "Published list does not exist"},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = ListPublishedSerializer(published)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
# PUT /published/<list_ID>
    def put(self, request, list_id):
        published = None
        try:
            published = ListPublished.objects.get(id=list_id)
        except:
            return Response(
                {"message": "Published list does not exist"},
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            'name': request.data.get('name'),
            'description': request.data.get('description'),
            'public': request.data.get('public')
        }
        serializer = ListPublishedSerializer(instance = published, data=data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# DELETE /published/<list_ID>
    def delete(self, request, list_id):
        published = None
        try:
            published = ListPublished.objects.get(id=list_id)
        except:
            return Response(
                {"message": "Published list does not exist"},
                status=status.HTTP_400_BAD_REQUEST
            )
        published.delete()
        return Response(
            {"message": "Published list deleted!"},
            status=status.HTTP_200_OK
        ) 


class CardsAll(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
# POST /templates/<list_id>/cards
    def post(self, request, list_id):
        data = {
            'name': request.data.get('name'), 
            'image_url': request.data.get('image_url'), 
            'list': request.data.get('list_id')
        }
        serializer = CardSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class CardsOne(APIView):
    permission_classes = [permissions.IsAuthenticated]

# DELETE /templates/<list_ID>/cards/<card_ID>
    def delete(self, request, list_id, card_id):
        card = None
        try:
            card = Card.objects.get(id=card_id)
        except:
            return Response(
                {"message": "Card does not exist"},
                status=status.HTTP_400_BAD_REQUEST
            )
        card.delete()
        return Response(
            {"message": "Card deleted!"},
            status=status.HTTP_200_OK
        )

# POST /signup
class UserSignup(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = [SessionAuthentication]

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = None
            try:
                user = serializer.create(request.data)
                token, created = Token.objects.get_or_create(user=user)
                print('999999', token.key)
            except Exception as e:
                return Response(
                    {"message": str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )
            if user:
                return Response({'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'image_url': user.image_url}, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

# POST /login
class UserLogin(ObtainAuthToken):
    permission_classes = [permissions.AllowAny]
    authentication_classes = [SessionAuthentication]

    def post(self, request):
        data = request.data

        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            try:
                user = serializer.check_user(data)
                token, created = Token.objects.get_or_create(user=user)
            except:
                return Response({"email": "Email or password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'image_url': user.image_url}, status=status.HTTP_200_OK)
        return Response({"email": "Email or password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)

# POST /logout
class UserLogout(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = [SessionAuthentication, TokenAuthentication]

    def post(self, request):
        print(request.user)
        logout(request)
        return Response(status=status.HTTP_200_OK)

# GET /user
class UserAuthenticate(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    def get(self, request):
        print(request.user)
        return Response({'token': request.auth.key,
            'user_id': request.user.pk,
            'email': request.user.email,
            'image_url': request.user.image_url}, status=status.HTTP_200_OK)