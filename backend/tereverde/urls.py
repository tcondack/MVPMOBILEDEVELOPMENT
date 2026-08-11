from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import (ParqueViewSet)


router = DefaultRouter()

router.register(r'parques', ParqueViewSet, basename='parques')

urlpatterns = [
    path('', include(router.urls)),
    

    path('parques/', views.parques_api, name='parques_api'),
    path('trilhas/', views.trilhas_api, name='trilhas_api'),
    path('eventos/', views.eventos_api, name='eventos_api'),
    path('novidades/', views.novidades_api, name='novidades_api'),
    path('login/', views.login_api, name='login_api'),
]
