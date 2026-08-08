from django.urls import path
from . import views

urlpatterns = [
    path('parques/', views.parques_api, name='parques_api'),
    path('trilhas/', views.trilhas_api, name='trilhas_api'),
    path('eventos/', views.eventos_api, name='eventos_api'),
    path('novidades/', views.novidades_api, name='novidades_api'),
    path('login/', views.login_api, name='login_api'),
]
