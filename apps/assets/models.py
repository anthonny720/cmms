import datetime

from django.core.validators import FileExtensionValidator
from django.db import models
from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver
from simple_history.models import HistoricalRecords


def custom_thumbnail_file_path(instance, filename):
    ext = filename.split('.')[-1]
    return '/'.join(['Assets', filename])


class Fixed(models.Model):
    class Meta:
        verbose_name = 'Activo Fijo'
        verbose_name_plural = 'Activos Fijos'
        ordering = ['name']

    name = models.CharField(max_length=50, verbose_name='Nombre')
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

    file = models.FileField(upload_to=custom_thumbnail_file_path, verbose_name='Documento', blank=True, null=True,
                            validators=[FileExtensionValidator(allowed_extensions=["pdf"])])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    def __str__(self):
        return f"Documento del {self.created_at.strftime('%Y-%m-%d')}"

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
        low = 'L', 'Baja'
        medium = 'M', 'Media'
        high = 'H', 'Alta'

    name = models.CharField(max_length=50, verbose_name='Nombre')
    buy_date = models.DateField(verbose_name='Fecha de Compra', null=True, blank=True, default=datetime.date.today)
    model = models.CharField(max_length=50, verbose_name='Modelo')
    criticality = models.CharField(max_length=50, choices=Status.choices, default=Status.low, verbose_name='Criticidad')
    parent = models.ForeignKey(Fixed, on_delete=models.PROTECT, related_name='physicals', null=True, blank=True,
                               verbose_name='Activo Fijo')
    code = models.CharField(max_length=50, verbose_name='Código', null=True, blank=True)
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
        return self.get_criticality_display()


class Tool(models.Model):
    class Meta:
        verbose_name = 'Herramienta'
        verbose_name_plural = 'Herramientas'
        ordering = ['name']

    name = models.CharField(max_length=50, verbose_name='Nombre')
    model = models.CharField(max_length=50, verbose_name='Modelo', null=True, blank=True)
    maker = models.CharField(max_length=50, verbose_name='Fabricante', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    def __str__(self):
        return self.name


@receiver(pre_save, sender=Physical)
def pre_save_physical(sender, instance, **kwargs):
    if instance.pk:
        try:
            old_instance = sender.objects.get(pk=instance.pk)
            if old_instance.thumbnail and old_instance.thumbnail != instance.thumbnail:
                old_instance.thumbnail.delete(save=False)
        except sender.DoesNotExist:
            pass


@receiver(post_delete, sender=Physical)
def post_delete_physical(sender, instance, **kwargs):
    if instance.thumbnail:
        instance.thumbnail.delete(save=False)


@receiver(pre_save, sender=Files)
def pre_save_files(sender, instance, **kwargs):
    if instance.pk:
        try:
            old_instance = sender.objects.get(pk=instance.pk)
            if old_instance.file and old_instance.file != instance.file:
                old_instance.file.delete(save=False)
        except sender.DoesNotExist:
            pass


@receiver(post_delete, sender=Files)
def post_delete_files(sender, instance, **kwargs):
    if instance.file:
        instance.file.delete(save=False)
