from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.management.models import WorkOrder, ResourceItem


# Register your models here.
@admin.register(WorkOrder)
class WorkOrderAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('code', 'date_report', 'date_start', 'type_maintenance', 'failure', 'status')
    list_filter = ('technical', 'status', 'type_maintenance', 'failure')
    date_hierarchy = 'date_start'
    search_fields = ('description', 'observations',)
    ordering = ['-date_report']
    list_per_page = 25




@admin.register(ResourceItem)
class ResourceItemAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('work_order', 'article', 'quantity')
    ordering = ['-work_order']
    list_per_page = 25
