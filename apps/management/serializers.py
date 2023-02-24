from rest_framework import serializers

from apps.management.models import WorkOrder, WorkRequest, ResourceItem
from apps.store.serializers import StoreSerializer


class WorkRequestSerializer(serializers.ModelSerializer):
    client = serializers.CharField(source='user.first_name', read_only=True)
    equipment = serializers.CharField(source='asset.name', read_only=True)

    class Meta:
        model = WorkRequest
        fields = ('id', 'date_report', 'asset', 'description', 'user', 'work_order', 'client', 'equipment',)


class ResourceItemSerializer(serializers.ModelSerializer):
    article = StoreSerializer()

    class Meta:
        model = ResourceItem
        fields = '__all__'


class WorkOrderSerializer(serializers.ModelSerializer):
    code_ot = serializers.CharField(source='code', read_only=True)
    time = serializers.CharField(source='get_time', read_only=True)
    cost = serializers.DecimalField(source='get_cost', read_only=True, max_digits=10, decimal_places=2)
    facility = serializers.CharField(source='asset.parent.name', read_only=True)
    personnel = serializers.ListField(source='get_personnel', read_only=True)
    resources_used = ResourceItemSerializer(many=True, read_only=True, source='resources_order')
    signature = serializers.CharField(source='get_signature_boss', read_only=True)
    signature_supervisor = serializers.CharField(source='get_signature_supervisor', read_only=True)
    supervisor_name = serializers.CharField(source='supervisor.first_name', read_only=True)

    class Meta:
        model = WorkOrder
        fields = '__all__'
