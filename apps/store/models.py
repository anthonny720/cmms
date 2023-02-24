from django.contrib.auth import get_user_model
from django.db import models
from simple_history.models import HistoricalRecords

User = get_user_model()


# Create your models here.

class Article(models.Model):
    class Meta:
        verbose_name = 'Artículo'
        verbose_name_plural = 'Artículos'
        ordering = ['family']

    code_sap = models.CharField(max_length=20, verbose_name='Código', blank=False, null=False, unique=True,
                                help_text='Código del Artículo',
                                error_messages={'unique': "Ya existe un artículo con este código"})
    family = models.CharField(max_length=100, blank=True, null=True, verbose_name='Familia')
    sub_family = models.CharField(max_length=100, blank=True, null=True, verbose_name='Sub-Familia')
    kind_of_existence = models.CharField(max_length=100, blank=True, null=True, verbose_name='Tipo de Existencia')
    description = models.CharField(max_length=100, blank=True, null=True, verbose_name='Descripción')
    stock = models.IntegerField(blank=True, null=True, verbose_name='Stock', default=0)
    unit_measurement = models.CharField(max_length=20, blank=True, null=True, verbose_name='Unidad de Medida')
    money = models.CharField(max_length=20, blank=True, null=True, verbose_name='Moneda')
    value = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, verbose_name='Valor')
    history = HistoricalRecords()

    def __str__(self):
        return self.code_sap

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        query = Article.objects.filter(code_sap=self.code_sap)
        if query.exists():
            query.update(stock=self.stock, value=float(self.value), unit_measurement=self.unit_measurement,
                         money=self.money, description=self.description, kind_of_existence=self.kind_of_existence,
                         sub_family=self.sub_family, family=self.family)
        else:
            super(Article, self).save(force_insert, force_update, using, update_fields)


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

    product = models.CharField(max_length=100, blank=True, null=True, verbose_name='Producto')
    description = models.CharField(max_length=100, blank=True, null=True, verbose_name='Descripción')
    quantity = models.IntegerField(blank=True, null=True, verbose_name='Cantidad', default=0)
    unit_measurement = models.CharField(max_length=20, blank=True, null=True, verbose_name='Unidad de Medida')
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDIENTE, verbose_name='Estado')

    history = HistoricalRecords()

    def __str__(self):
        return self.product

    def save(self, *args, **kwargs):
        # Si el usuario no ha sido asignado todavía
        if not self.user:
            # Accedemos al usuario a través del request
            user = kwargs.pop('user', None)
            if user:
                # Asignamos el usuario al campo ForeignKey
                self.user = user
        super(Requirements, self).save(*args, **kwargs)
