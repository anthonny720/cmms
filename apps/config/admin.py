from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.config.models import Failure, Type


# Register your models here.
@admin.register(Failure)
class FailureAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',)
    search_fields = ('description', 'observations',)
    ordering = ['-name']
    list_per_page = 25


@admin.register(Type)
class TypeAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',)
    search_fields = ('description', 'observations',)
    ordering = ['-name']
    list_per_page = 25
