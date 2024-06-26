from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # path('test/', views.test, name='test'),
    path('templates/', views.TemplatesAll.as_view()),
    path('templates/<int:list_id>/', views.TemplatesOne.as_view()),
    path('published/', views.PublishedAll.as_view()),
    path('published/<int:list_id>/', views.PublishedOne.as_view()),
    path('published/user/', views.PublishedAllUser.as_view()),
    path('templates/<int:list_id>/cards/', views.CardsAll.as_view()),
    path('templates/<int:list_id>/cards/<int:card_id>/', views.CardsOne.as_view()),
    path('signup/', views.UserSignup.as_view(), name='signup'),
    path('login/', views.UserLogin.as_view(), name='login'),
    path('logout/', views.UserLogout.as_view(), name='logout'),
    path('authenticate/', views.UserAuthenticate.as_view(), name='authenticate'),
    path('images/', views.ImagesAll.as_view(), name='images'),
]

