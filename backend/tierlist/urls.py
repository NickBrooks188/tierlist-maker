from django.urls import path
from . import views

urlpatterns = [
    # path('test/', views.test, name='test'),
    path('templates/', views.TemplatesAll.as_view()),
    path('templates/<int:list_id>/', views.TemplatesOne.as_view()),
    path('published/', views.PublishedAll.as_view()),
    path('published/<int:list_id>/', views.PublishedOne.as_view()),
    path('templates/<int:list_id>/cards/', views.CardsAll.as_view()),
    path('templates/<int:list_id>/cards/<int:card_id>/', views.CardsOne.as_view()),
    path('signup/', views.sign_up, name='sign_up')
]

