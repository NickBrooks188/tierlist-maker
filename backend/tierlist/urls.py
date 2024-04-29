from django.urls import path
from . import views

urlpatterns = [
    # path('test/', views.test, name='test'),
    path('templates/<int:template_id>/', views.TemplatesOne.as_view()),
    path('templates/', views.get_all_list_templates, name='get_all_list_templates'),
    path('published/', views.get_all_published_lists, name='get_all_published_lists'),
    path('published/<list_id>/', views.get_published_list_by_id, name='get_published_list_by_id'),
    path('signup/', views.sign_up, name='sign_up')
]

