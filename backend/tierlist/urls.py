from django.urls import path
from . import views

urlpatterns = [
    # path('test/', views.test, name='test'),
    path('templates/<int:template_id>/', views.get_list_template_by_id, name='get_list_template_by_id'),
    path('templates/', views.get_all_list_templates, name='get_all_list_templates'),
    path('published/', views.get_all_published_lists, name='get_all_published_lists')
]