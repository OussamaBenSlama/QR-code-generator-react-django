# urls.py
from django.urls import path
from .views import PersonneCreateView
from .views import DownloadQRCodeView

urlpatterns = [
    path('api/submit/', PersonneCreateView.as_view(), name='personne-create'),
    path('download-qr-code/<str:qr_code_filename>/', DownloadQRCodeView.as_view(), name='download-qr-code'),
]
