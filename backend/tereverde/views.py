from django.contrib.auth import authenticate, login
from .models import Parque, Trilhas, Eventos, Novidades
from .serializers import ParqueSerializer, TrilhasSerializer, LoginSerializer, EventosSerializer, NovidadesSerializer
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import AllowAny
from rest_framework import status, viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from drf_spectacular.utils import extend_schema

# permissão somente admin fazer CRUD

class IsAdminOrReadOnly(permissions.BasePermission):
    ## qualquer pessoa lê, mas somente admin faz alteração
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(
            request.user and request.user.is_authenticated and request.user.is_staff
        )
# CRUD parques, trilhas eventos e novidades

class ParqueViewSet (viewsets.ModelViewSet):
    queryset = Parque.objects.all()
    serializer_class = ParqueSerializer
    permission_classes = [IsAdminOrReadOnly]

class TrilhasViewSet (viewsets.ModelViewSet):
    queryset = Trilhas.objects.all()
    serializer_class = TrilhasSerializer
    permission_classes = [IsAdminOrReadOnly]

class EventosViewSet (viewsets.ModelViewSet):
    queryset = Eventos.objects.all()
    serializer_class = EventosSerializer
    permission_classes = [IsAdminOrReadOnly]

class NovidadesViewSet (viewsets.ModelViewSet):
    queryset = Novidades.objects.all()
    serializer_class = NovidadesSerializer
    permission_classes = [IsAdminOrReadOnly]


# LOGIN DE ADMINISTRADORES

@extend_schema(
        request=LoginSerializer, responses={200:dict, 401:dict}
)
@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([SessionAuthentication, BasicAuthentication])
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
                'is_admin': user.is_staff
            }
        }, status=status.HTTP_200_OK)
    
    return Response({
        'success': False,
        'message': 'Acesso negado. Credenciais inválidas ou sem permissão.'
    }, status=status.HTTP_401_UNAUTHORIZED)
