from django.contrib.auth import authenticate, login
from .models import Parque, Trilhas, Eventos, Novidades
from .serializers import ParqueSerializer, TrilhasSerializer, EventosSerializer, NovidadesSerializer

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view

class ParqueViewSet (viewsets.ModelViewSet):
    queryset = Parque.objects.all()
    serializer_class = ParqueSerializer


@api_view(['GET'])
def parques_api(request):
    """Retorna a lista de todos os parques cadastrados no PostgreSQL"""
    parques = Parque.objects.all()
    serializer = ParqueSerializer(parques, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def trilhas_api(request):
    """Retorna todas as trilhas cadastradas"""
    trilhas = Trilhas.objects.all()
    serializer = TrilhasSerializer(trilhas, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def eventos_api(request):
    """Retorna a agenda completa de eventos e temporadas"""
    eventos = Eventos.objects.all()
    serializer = EventosSerializer(eventos, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def novidades_api(request):
    """Retorna o mural de notícias e educação ambiental"""
    novidades = Novidades.objects.all()
    serializer = NovidadesSerializer(novidades, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# LOGIN DE ADMINISTRADORES

@api_view(['POST'])
def login_api(request):
    """
    Autentica os administradores do Circuito Terê Verde.
    """
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)
    
    if user is not None and user.is_staff:
        ## cria sessao do usuário para manter ele logado nas próximas sessões.
        login(request, user)
        return Response({
            'success': True,
            'message': 'Autenticação bem-sucedida.',
            'user': {
                'username': user.username,
                'email': user.email,
                'is_admin': user.is_superuser
            }
        }, status=status.HTTP_200_OK)
    
    return Response({
        'success': False,
        'message': 'Acesso negado. Credenciais inválidas ou sem permissão.'
    }, status=status.HTTP_401_UNAUTHORIZED)
