from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers

from apps.users.models import UserCategory, ThirdParties

# from apps.users.models import UserActivity

User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
            'get_full_name',
            'get_category_name',
            'get_role_name',
            'is_active',
            'get_admin',
            'password',
            'phone',
            'dni',
            'category',
            'get_signature',
            'role',)


class HelperSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'get_full_name', 'get_signature', 'first_name', 'last_name')


class UserCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCategory
        fields = '__all__'


class ThirdPartiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThirdParties
        fields = '__all__'
