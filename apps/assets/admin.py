from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.assets.models import Tool, Physical, Fixed, Files


# Register your models here.
@admin.register(Fixed)
class FixedAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    ordering = ['name']
    list_per_page = 25


@admin.register(Physical)
class PhysicalAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name', 'criticality', 'parent',)
    list_filter = ('criticality', 'parent',)
    search_fields = ('name',)
    ordering = ['name']
    list_per_page = 25


@admin.register(Tool)
class ToolAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    ordering = ['name']
    list_per_page = 25


@admin.register(Files)
class FilesAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('file',)
    ordering = ['id']
    list_per_page = 25
