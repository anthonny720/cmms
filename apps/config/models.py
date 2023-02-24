from django.db import models
from simple_history.models import HistoricalRecords


# Create your models here.

class Failure(models.Model):
    class Meta:
        verbose_name = 'Origen de falla'
        verbose_name_plural = 'Origen de falla'
        ordering = ['name']
    name = models.CharField(max_length=50)
    history = HistoricalRecords()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Type(models.Model):
    class Meta:
        verbose_name = 'Tipo de mantenimiento'
        verbose_name_plural = 'Tipo de mantenimiento'
        ordering = ['name']
    name = models.CharField(max_length=50)
    history = HistoricalRecords()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name