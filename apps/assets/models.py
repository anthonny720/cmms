import datetime

from django.core.validators import FileExtensionValidator
from django.db import models
from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver
from simple_history.models import HistoricalRecords


# Create your models here.

def custom_thumbnail_file_path(instance, filename):
    ext = filename.split('.')[-1]
    return '/'.join(['Assets', filename])


class Fixed(models.Model):
    class Meta:
        verbose_name = 'Activo Fijo'
        verbose_name_plural = 'Activos Fijos'
        ordering = ['name']

    name = models.CharField(max_length=50, verbose_name='Nombre')
    description = models.TextField(max_length=200, verbose_name='Descripción')
    enabled = models.BooleanField(default=True, verbose_name='Habilitado')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    def __str__(self):
        return self.name


class Files(models.Model):
    class Meta:
        verbose_name = 'Documentos'
        verbose_name_plural = 'Documentos'
        ordering = ['created_at']

    file = models.FileField(upload_to=custom_thumbnail_file_path, blank=True, null=True,
                            verbose_name="Documento",
                            validators=[FileExtensionValidator(allowed_extensions=["pdf"])])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    def __str__(self):
        return str(self.created_at)

    def get_file_url(self):
        if self.file:
            return self.file.url
        return ''

    def filesize(self):
        try:
            x = self.file.size
            y = 512000
            if x < y:
                value = round(x / 1000, 2)
                ext = ' kb'
            elif x < y * 1000:
                value = round(x / 1000000, 2)
                ext = ' Mb'
            else:
                value = round(x / 1000000000, 2)
                ext = ' Gb'
            return str(value) + ext
        except:
            return '0 kb'


class Physical(models.Model):
    class Meta:
        verbose_name = 'Activo Físico'
        verbose_name_plural = 'Activos Físicos'
        ordering = ['name']

    class Status(models.TextChoices):
        low = 'Baja'
        medium = 'Media'
        high = 'Alta'

    name = models.CharField(max_length=50, verbose_name='Nombre')
    buy_date = models.DateField(verbose_name='Fecha de Compra', null=True, blank=True, default=datetime.date.today)
    model = models.CharField(max_length=50, verbose_name='Modelo')
    criticality = models.CharField(max_length=50, choices=Status.choices, default=Status.low, verbose_name='Criticidad')
    parent = models.ForeignKey(Fixed, on_delete=models.PROTECT, related_name='physicals', null=True, blank=True,
                               verbose_name='Activo Fijo')
    created_at = models.DateTimeField(auto_now_add=True)
    thumbnail = models.ImageField(upload_to=custom_thumbnail_file_path, blank=True, null=True,
                                  verbose_name="Fotografía",
                                  validators=[FileExtensionValidator(allowed_extensions=["png", "jpg", "jpeg"])])
    files = models.ManyToManyField(Files, related_name='physicals', verbose_name='Documentos', blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    def get_thumbnail_url(self):
        if self.thumbnail and hasattr(self.thumbnail, 'url'):
            return self.thumbnail.url
        else:
            return ''

    def get_files_url(self):
        return [{'url': file.get_file_url(), 'id': file.id} for file in self.files.all()]

    def get_criticality_name(self):
        return self.Status[int(self.criticality) - 1][1]


class Tool(models.Model):
    class Meta:
        verbose_name = 'Herramienta'
        verbose_name_plural = 'Herramientas'
        ordering = ['name']

    name = models.CharField(max_length=50, verbose_name='Nombre')
    description = models.TextField(max_length=200, verbose_name='Descripción')
    model = models.CharField(max_length=50, verbose_name='Modelo')
    maker = models.CharField(max_length=50, verbose_name='Fabricante')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    def __str__(self):
        return self.name


@receiver(pre_save, sender=Physical)
def pre_save_image(sender, instance, *args, **kwargs):
    try:
        old_img = instance.__class__.objects.get(id=instance.id).thumbnail.path
        try:
            new_img = instance.thumbnail.path
        except:
            new_img = None
        if new_img != old_img:
            import os
            if os.path.exists(old_img):
                os.remove(old_img)
    except:
        pass


@receiver(post_delete, sender=Physical)
def post_save_image(sender, instance, *args, **kwargs):
    """ Clean Old Image file """
    try:
        instance.thumbnail.delete(save=False)
    except:
        pass


@receiver(pre_save, sender=Files)
def pre_save_image(sender, instance, *args, **kwargs):
    try:
        old_img = instance.__class__.objects.get(id=instance.id).file.path
        try:
            new_img = instance.file.path
        except:
            new_img = None
        if new_img != old_img:
            import os
            if os.path.exists(old_img):
                os.remove(old_img)
    except:
        pass


@receiver(post_delete, sender=Files)
def post_save_image(sender, instance, *args, **kwargs):
    """ Clean Old Image file """
    try:
        instance.file.delete(save=False)
    except:
        pass
