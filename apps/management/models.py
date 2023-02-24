import decimal

from django.db import models
from django.shortcuts import get_object_or_404
from django.utils import timezone
from simple_history.models import HistoricalRecords

from apps.assets.models import Tool, Physical
from apps.config.models import Type, Failure
from apps.store.models import Article
from apps.users.models import UserAccount, UserCategory


# Create your models here.

class WorkOrder(models.Model):
    class Meta:
        verbose_name = 'Orden de Trabajo'
        verbose_name_plural = 'Ordenes de Trabajo'
        ordering = ['date_report']

    date_report = models.DateTimeField(verbose_name='Fecha de reporte', default=timezone.now)
    date_start = models.DateTimeField(verbose_name='Fecha de inicio', blank=True, null=True)
    date_finish = models.DateTimeField(verbose_name='Fecha de finalización', default=timezone.now, blank=True,
                                       null=True)
    asset = models.ForeignKey(Physical, on_delete=models.PROTECT, verbose_name='Activo', blank=True, null=True,
                              related_name='work_orders')
    type_maintenance = models.ForeignKey(Type, on_delete=models.PROTECT, verbose_name='Tipo de mantenimiento',
                                         blank=True, null=True)
    failure = models.ForeignKey(Failure, on_delete=models.PROTECT, verbose_name='Origen de falla', blank=True,
                                null=True)
    description = models.TextField(verbose_name='Descripción', blank=True, null=True)
    activities = models.TextField(verbose_name='Actividades', blank=True, null=True)
    technical = models.ManyToManyField(UserAccount, verbose_name='Técnico', blank=True)
    resources_used = models.ManyToManyField(Article, through='ResourceItem', verbose_name='Recursos utilizados',
                                            blank=True)
    tools = models.ManyToManyField(Tool, verbose_name='Herramientas', blank=True)
    status = models.BooleanField(verbose_name='Estado', default=False)
    observations = models.TextField(verbose_name='Observaciones', blank=True, null=True)
    planned = models.BooleanField(verbose_name='Planificado', default=False)
    criticity = models.PositiveSmallIntegerField(verbose_name='Criticidad', default=1)
    validated = models.BooleanField(verbose_name='Validado', default=False)
    supervisor = models.ForeignKey(UserAccount, on_delete=models.PROTECT, verbose_name='Supervisor', blank=True,
                                   null=True, related_name='work_orders_supervisor')
    created = models.DateTimeField(auto_now_add=True)
    history = HistoricalRecords()

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.code

    @property
    def code(self):
        data = WorkOrder._base_manager.filter(
            created__year=self.date_start.year,
            created__lt=self.date_start
        ).count() + 1
        return "OT" + "-" + str(self.date_start.year)[2:] + str(self.date_start.month).zfill(2) + str(data)

    def get_time(self):
        try:
            return self.date_finish - self.date_start
        except:
            return None

    def get_personnel(self):
        try:
            data = []
            for tech in self.technical.all():
                try:
                    time = self.get_time().total_seconds()
                    cost = float(time / 60) * float(tech.category.salary)
                    signature = tech.get_signature()
                except Exception as e:
                    cost = str(e)
                data.append({'name': tech.get_full_name(), 'cost': cost, 'signature': signature})
            return data
        except:
            pass

    def get_cost_personnel(self):
        try:
            cost = 0
            for tech in self.technical.all():
                try:
                    time = self.get_time().total_seconds()
                    cost += float(time / 60) * float(tech.category.salary)
                except Exception as e:
                    cost = 0
            return cost
        except:
            pass

    def get_cost(self):
        cost = 0
        try:
            for resource in self.resources_order.all():
                cost += resource.price
            for d in self.get_personnel():
                try:
                    cost += decimal.Decimal(d['cost'])
                except:
                    pass
            return cost
        except:
            return cost

    def get_signature_boss(self):
        try:
            boss = get_object_or_404(UserAccount, email='mantenimiento@greenbox.pe')
            return boss.get_signature()
        except Exception as e:
            return ""

    def get_signature_supervisor(self):
        try:
            if self.validated:
                boss = get_object_or_404(UserAccount, role='Supervisor')
                return boss.get_signature()
            else:
                return ""
        except Exception as e:
            return ""


#
class ResourceItem(models.Model):
    class Meta:
        verbose_name = 'Recurso'
        verbose_name_plural = 'Recursos'
        ordering = ['work_order']

    work_order = models.ForeignKey(WorkOrder, on_delete=models.PROTECT, verbose_name='Orden de trabajo',
                                   related_name='resources_order')
    article = models.ForeignKey(Article, on_delete=models.PROTECT, verbose_name='Artículo',
                                related_name='resources_article')
    quantity = models.PositiveIntegerField(verbose_name='Cantidad', default=1)
    price = models.DecimalField(verbose_name='Precio', max_digits=10, decimal_places=2, default=0, blank=True, )

    def __str__(self):
        return self.article.description

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        self.price = self.article.value * self.quantity
        super().save(force_insert, force_update, using, update_fields)


class WorkRequest(models.Model):
    date_report = models.DateTimeField(verbose_name='Fecha de reporte', default=timezone.now)
    asset = models.ForeignKey(Physical, on_delete=models.PROTECT, verbose_name='Activo', blank=True, null=True)
    description = models.TextField(verbose_name='Descripción', blank=True, null=True)
    user = models.ForeignKey(UserAccount, on_delete=models.PROTECT, verbose_name='Usuario')
    work_order = models.OneToOneField(WorkOrder, on_delete=models.PROTECT, verbose_name='Orden de trabajo', blank=True,
                                      null=True)

    def __str__(self):
        return str(self.date_report)

    class Meta:
        verbose_name = 'Solicitud de trabajo'
        verbose_name_plural = 'Solicitudes de trabajo'
        ordering = ['-date_report']
