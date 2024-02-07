from rest_framework import serializers

from apps.assets.models import Tool, Fixed, Physical, Files


class FixedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fixed
        fields = '__all__'


class ToolsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tool
        fields = '__all__'


class PhysicalSerializer(serializers.ModelSerializer):
    thumbnail_url = serializers.CharField(source='get_thumbnail_url', read_only=True)
    files = serializers.ListField(source='get_files_url', read_only=True)
    parent_name = serializers.CharField(source='parent.name', read_only=True)

    class Meta:
        model = Physical
        fields = '__all__'


class FilesSerializer(serializers.ModelSerializer):
    size = serializers.CharField(source='filesize', read_only=True)

    class Meta:
        model = Files
        fields = '__all__'
