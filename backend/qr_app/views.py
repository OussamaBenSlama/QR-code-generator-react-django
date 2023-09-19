# views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Personne
from .serializers import PersonneSerializer
from django.http import FileResponse
import os
from django.conf import settings


class PersonneCreateView(APIView):
    def post(self, request, format=None):
        
        serializer = PersonneSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()

            # Return a success response with the URL of the generated QR code image
            qr_code_url = serializer.instance.qr_code.url
            return Response({'message': 'Form submitted successfully', 'qr_code_url': qr_code_url}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class DownloadQRCodeView(APIView):
    def get(self, request, qr_code_filename, format=None):
        # Assuming you have stored the QR code images in a folder named 'qr_codes'
        qr_code_path = os.path.join(settings.MEDIA_ROOT, 'qr_codes', qr_code_filename)
        response = FileResponse(open(qr_code_path, 'rb'), content_type='image/png')
        response['Content-Disposition'] = f'attachment; filename="{qr_code_filename}"'
        return response
