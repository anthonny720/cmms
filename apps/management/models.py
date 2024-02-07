from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import Sum, F
from django.utils import timezone
from simple_history.models import HistoricalRecords

from apps.assets.models import Tool, Physical
from apps.config.models import Type, Failure
from apps.store.models import Article
from apps.users.models import UserAccount

User = get_user_model()


# Create your models here.

class WorkOrder(models.Model):
    date_report = models.DateTimeField(verbose_name='Fecha de reporte', default=timezone.now)
    date_start = models.DateTimeField(verbose_name='Fecha de inicio', blank=True, null=True)
    date_finish = models.DateTimeField(verbose_name='Fecha de finalización', blank=True, null=True)
    asset = models.ForeignKey(Physical, on_delete=models.PROTECT, verbose_name='Activo', blank=True, null=True,
                              related_name='work_orders')
    type_maintenance = models.ForeignKey(Type, on_delete=models.PROTECT, verbose_name='Tipo de mantenimiento',
                                         blank=True, null=True)
    failure = models.ForeignKey(Failure, on_delete=models.PROTECT, verbose_name='Origen de falla', blank=True,
                                null=True)
    description = models.TextField(verbose_name='Descripción', blank=True, null=True)
    activities = models.TextField(verbose_name='Actividades', blank=True, null=True)
    resources_used = models.ManyToManyField('store.Article', through='ResourceItem', verbose_name='Recursos utilizados',
                                            blank=True)
    technical = models.ForeignKey(User, on_delete=models.PROTECT, verbose_name='Técnico', blank=True, null=True,
                                  related_name='work_orders_technical')
    helpers = models.ManyToManyField(User, verbose_name='Ayudantes', blank=True, through='HelperItem',
                                     related_name='work_orders_helpers')
    tools = models.ManyToManyField(Tool, verbose_name='Herramientas', blank=True)
    status = models.BooleanField(verbose_name='Estado', default=False)

    planned = models.BooleanField(verbose_name='Planificado', default=False)
    validated = models.BooleanField(verbose_name='Validado', default=False)
    cleaned = models.BooleanField(verbose_name='Limpieza', default=False)
    supervisor = models.ForeignKey(User, on_delete=models.PROTECT, verbose_name='Supervisor', blank=True, null=True,
                                   related_name='work_orders_supervisor')
    requester = models.ForeignKey(User, on_delete=models.PROTECT, verbose_name='Solicitante', blank=True, null=True,
                                    related_name='work_orders_requester')
    stop = models.BooleanField(verbose_name='Afectó la producción', default=False)

    created = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        verbose_name = 'Orden de Trabajo'
        verbose_name_plural = 'Ordenes de Trabajo'
        ordering = ['date_report']

    def __str__(self):
        return self.code

    @property
    def code(self):
        order_number = WorkOrder.objects.filter(date_report__year=self.date_report.year,
                                                created__lt=self.date_report).count() + 1
        return f"OT-{self.date_report.year % 100:02d}{self.date_report.month:02d}{order_number:04d}"

    def get_time(self):
        return self.date_finish - self.date_start if self.date_finish and self.date_start else None

    def get_personnel(self):
        personnel_data = []

        # Procesar el técnico asignado
        if self.technical and self.technical.category:
            technical_duration = self.get_time()
            if technical_duration:
                technical_cost = (
                                         technical_duration.total_seconds() / 3600) * self.technical.category.salary  # Costo basado en horas
                personnel_data.append({'name': self.technical.get_full_name(), 'cost': technical_cost,
                    'signature': self.technical.get_signature(),
                    'time': f"{self.date_start.strftime('%I:%M %p')} - {self.date_finish.strftime('%I:%M %p')}"})

        for helper in self.helpers_order.select_related('helper__category').all():
            helper_duration = helper.get_time()
            if helper_duration and helper.helper.category:
                helper_cost = (helper_duration.total_seconds() / 60) * helper.helper.category.salary
                time_str = f"{helper.date_start.strftime('%I:%M %p')} - {helper.date_finish.strftime('%I:%M %p')}"
                personnel_data.append({'name': helper.helper.get_full_name(), 'cost': helper_cost,
                    'signature': helper.helper.get_signature(), 'time': time_str})

        return personnel_data

    def get_cost_personnel(self):
        return sum(item['cost'] for item in self.get_personnel())

    def get_cost(self):
        resources_cost = self.resources_order.aggregate(total_cost=Sum(F('price') * F('quantity')))['total_cost'] or 0
        personnel_cost = self.get_cost_personnel()
        return resources_cost + personnel_cost

    def get_planner_name(self):
        try:
            user = User.objects.filter(role='P').first()
            return user.get_full_name() if user else ""
        except User.DoesNotExist:
            return ""


    def get_signature_by_role(self, role):
        try:
            user = User.objects.filter(role=role).first()
            return user.get_signature() if user else ""
        except User.DoesNotExist:
            return ""

    def get_signature_planner(self):
        return self.get_signature_by_role('P')

    def get_signature_boss(self):
        return self.get_signature_by_role('B')



    def get_signature_requester(self):
        try:
            if self.validated:
                user = self.requester
                return user.get_signature() if user else ""
            else:
                return ""
        except User.DoesNotExist:
            return ""



    def get_signature_supervisor(self):
        try:
            if self.validated:
                user = self.supervisor
                return user.get_signature() if user else ""
            else:
                return ""
        except User.DoesNotExist:
            return ""


class HelperItem(models.Model):
    work_order = models.ForeignKey(WorkOrder, on_delete=models.PROTECT, verbose_name='Orden de trabajo',
                                   related_name='helpers_order')
    helper = models.ForeignKey(User, on_delete=models.PROTECT, verbose_name='Ayudante', related_name='helpers_helper')
    date_start = models.DateTimeField(verbose_name='Fecha de inicio')
    date_finish = models.DateTimeField(verbose_name='Fecha de finalización')
    history = HistoricalRecords()

    class Meta:
        verbose_name = 'Ayudante'
        verbose_name_plural = 'Ayudantes'
        ordering = ['work_order']
        unique_together = ('work_order', 'helper')

    def __str__(self):
        return self.helper.get_full_name() if self.helper else ''

    def get_time(self):
        return self.date_finish - self.date_start if self.date_finish and self.date_start else None


class ResourceItem(models.Model):
    work_order = models.ForeignKey(WorkOrder, on_delete=models.PROTECT, verbose_name='Orden de trabajo',
                                   related_name='resources_order')
    article = models.ForeignKey('store.Article', on_delete=models.SET_NULL, verbose_name='Artículo', null=True,
                                related_name='resources_article')
    quantity = models.PositiveIntegerField(verbose_name='Cantidad', default=1)
    price = models.DecimalField(verbose_name='Precio', max_digits=10, decimal_places=2, default=0.00, blank=True)
    name = models.CharField(verbose_name='Nombre', max_length=100, blank=True, null=True)

    class Meta:
        verbose_name = 'Recurso'
        verbose_name_plural = 'Recursos'
        ordering = ['work_order']

    def __str__(self):
        return self.article.description if self.article else self.name

    def save(self, *args, **kwargs):
        if self.article:
            self.price = self.article.value * self.quantity
            self.name = self.article.description
        super().save(*args, **kwargs)
