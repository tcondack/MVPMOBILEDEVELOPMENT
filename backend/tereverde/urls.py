from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (ParqueViewSet, TrilhasViewSet, EventosViewSet, NovidadesViewSet, login_api)


router = DefaultRouter()

router.register(r'parques', ParqueViewSet, basename='parques')
router.register(r'trilhas',TrilhasViewSet, basename='trilhas')
router.register(r'eventos', EventosViewSet, basename='eventos')
router.register(r'novidades', NovidadesViewSet, basename='novidades')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_api, name='login_api'),
]
