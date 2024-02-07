from django.contrib import admin
from django.contrib.auth import get_user_model
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.management.models import HelperItem
from apps.users.models import UserCategory, ThirdParties

User = get_user_model()


@admin.register(User)
class UserAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('email', 'first_name', 'last_name', 'is_active', 'is_staff', 'role', 'created_at')
    list_filter = ('is_active', 'is_staff', 'role')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ['-id']
    list_per_page = 25


@admin.register(UserCategory)
class UserCategoryAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name', 'description', 'salary')
    search_fields = ('name',)
    ordering = ['-name']
    list_per_page = 25


@admin.register(ThirdParties)
class ThirdPartiesAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name', 'ruc', 'phone', 'email', 'direction',)
    search_fields = ('name',)
    ordering = ['-name']
    list_per_page = 25


@admin.register(HelperItem)
class HelpersAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('work_order', 'helper', 'date_start', 'date_finish',)
    search_fields = ('work_order',)
    ordering = ['-id']
    list_per_page = 25
