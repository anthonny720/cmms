from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

from apps.users.views import CustomUserViewSet
from core import settings

urlpatterns = [path('admin/', admin.site.urls),
               path('api/configuration/', include('apps.config.urls')),
               path('api/assets/', include('apps.assets.urls')),
               path('api/users/', include('apps.users.urls')),
               path('api/store/', include('apps.store.urls')),
               path('api/management/', include('apps.management.urls')),
               path('api/graphics/', include('apps.graphics.urls')),
               path('auth/users/', CustomUserViewSet.as_view({'get': 'list', 'post': 'create'}), name='get-users'),
               path('auth/', include('djoser.urls')),
               path('auth/', include('djoser.urls.jwt')), ]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
