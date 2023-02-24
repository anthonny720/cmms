from rest_framework import serializers

from apps.store.models import Article, Requirements


class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

class RequirementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requirements
        fields = '__all__'