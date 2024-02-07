from rest_framework import serializers

from apps.config.models import Failure, Type


class FailureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Failure
        fields = '__all__'


class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = '__all__'
