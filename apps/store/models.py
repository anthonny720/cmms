from django.contrib.auth import get_user_model
from django.db import models
from simple_history.models import HistoricalRecords

User = get_user_model()



class Article(models.Model):
    class Meta:
        verbose_name = 'Artículo'
        verbose_name_plural = 'Artículos'
        ordering = ['group']

    group = models.CharField(max_length=100, blank=True, null=True, verbose_name='Grupo')
    code_sap = models.CharField(max_length=20, verbose_name='Código', blank=False, null=False,
                                help_text='Código del Artículo', )
    description = models.CharField(max_length=100, blank=True, null=True, verbose_name='Descripción')
    unit_measurement = models.CharField(max_length=20, blank=True, null=True, verbose_name='Unidad de Medida')
    value = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, verbose_name='Valor')
    stock = models.IntegerField(blank=True, null=True, verbose_name='Stock', default=0)
    history = HistoricalRecords()

    def __str__(self):
        return self.code_sap


class Requirements(models.Model):
    class Meta:
        verbose_name = 'Requerimiento'
        verbose_name_plural = 'Requerimientos'
        ordering = ['date']

    class Status(models.TextChoices):
        PENDIENTE = 'Pendiente'
        APROBADO = 'Aprobado'
        RECHAZADO = 'Rechazado'
        PARCIAL = 'Parcial'
        FINALIZADO = 'Finalizado'

    date = models.DateField(verbose_name='Fecha', auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Usuario', blank=True, null=True)
    work = models.CharField(max_length=100, blank=True, null=True, verbose_name='Tipo de trabajo')
    product = models.CharField(max_length=100, blank=True, null=True, verbose_name='Producto')
    description = models.TextField(blank=True, null=True, verbose_name='Descripción')
    quantity = models.IntegerField(blank=True, null=True, verbose_name='Cantidad', default=0)
    unit_measurement = models.CharField(max_length=20, blank=True, null=True, verbose_name='Unidad de Medida')
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDIENTE, verbose_name='Estado')

    history = HistoricalRecords()

    def __str__(self):
        return self.product

    def save(self, *args, **kwargs):
        if not self.user:
            user = kwargs.pop('user', None)
            if user:
                self.user = user
        super(Requirements, self).save(*args, **kwargs)
