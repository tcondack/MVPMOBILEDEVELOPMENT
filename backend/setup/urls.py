from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('tereverde.urls')),  
    # --- ENDPOINTS DA DOCUMENTAÇÃO ---
    # 1. Gera o arquivo JSON com o esquema de toda a sua API
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    
    # 2. URL da primeira interface visual (Swagger)
    path('api/docs/swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    
    # 3. URL da segunda interface visual (Redoc)
    path('api/docs/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)