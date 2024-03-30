from django.db import models
import qrcode
from io import BytesIO
from django.core.files import File
from PIL import Image, ImageDraw

class Personne(models.Model):
    fname = models.CharField(max_length=200)
    lname = models.CharField(max_length=200)
    level = models.CharField(max_length=200)
    university = models.CharField(max_length=200)
    qr_code = models.ImageField(upload_to='qr_codes', blank=True)

    def __str__(self):
        return f"{self.fname} {self.lname}"

    def save(self, *args, **kwargs):
        # Concatenate the information into a single string
        qr_code_data = f" Full Name: {self.fname} {self.lname}\nLevel: {self.level}\nUniversity: {self.university}"

        # Generate the QR code
        qrcodeimg = qrcode.make(qr_code_data)
        canvas = Image.new('RGB', (400, 400), 'white')
        draw = ImageDraw.Draw(canvas)
        canvas.paste(qrcodeimg)
        filename = f"qr_code-{self.fname}-{self.lname}-{self.level}.png"
        buffer = BytesIO()
        canvas.save(buffer, 'PNG')
        self.qr_code.save(filename, File(buffer), save=False)
        canvas.close()
        super(Personne, self).save(*args, **kwargs)
