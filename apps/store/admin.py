from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.store.models import Article, Requirements


# Register your models here.
@admin.register(Article)
class ArticleAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('id', 'group', 'description', 'stock', 'value')
    list_filter = ('group',)
    search_fields = ('id', 'group', 'description')
    ordering = ['group']
    list_per_page = 25


# Register your models here.
@admin.register(Requirements)
class RequirementsAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('date', 'user', 'product', 'quantity', 'unit_measurement', 'status')
    list_filter = ('user', 'date',)
    search_fields = ('product', 'description',)
    ordering = ['date']
    list_per_page = 25
