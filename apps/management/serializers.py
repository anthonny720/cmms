from rest_framework import serializers

from apps.management.models import WorkOrder, ResourceItem, HelperItem
from apps.store.serializers import StoreSerializer
from apps.users.serializers import HelperSerializer


class ResourceItemSerializer(serializers.ModelSerializer):
    article = StoreSerializer()

    class Meta:
        model = ResourceItem
        fields = '__all__'


class HelperItemSerializer(serializers.ModelSerializer):
    helper = HelperSerializer()

    class Meta:
        model = HelperItem
        fields = '__all__'


class WorkOrderSerializer(serializers.ModelSerializer):
    code_ot = serializers.CharField(source='code', read_only=True)
    time = serializers.CharField(source='get_time', read_only=True)
    cost = serializers.CharField(source='get_cost', read_only=True, )
    facility = serializers.CharField(source='asset.parent.name', read_only=True)
    personnel = serializers.ListField(source='get_personnel', read_only=True)
    resources_used = ResourceItemSerializer(many=True, read_only=True, source='resources_order')
    helpers = HelperItemSerializer(many=True, read_only=True, source='helpers_order')
    signature = serializers.CharField(source='get_signature_boss', read_only=True)
    signature_supervisor = serializers.CharField(source='get_signature_supervisor', read_only=True)
    signature_requester = serializers.CharField(source='get_signature_requester', read_only=True)
    signature_planner = serializers.CharField(source='get_signature_planner', read_only=True)
    planner_name = serializers.CharField(source='get_planner_name', read_only=True)
    supervisor_name = serializers.CharField(source='supervisor.first_name', read_only=True)
    requester_name = serializers.CharField(source='requester.first_name', read_only=True)
    physical_name = serializers.CharField(source='asset.name', read_only=True)
    type_name = serializers.CharField(source='type_maintenance.name', read_only=True)
    failure_name = serializers.CharField(source='failure.name', read_only=True)
    criticality = serializers.CharField(source='asset.criticality', read_only=True)
    technical_name = serializers.CharField(source='technical.get_full_name', read_only=True)

    class Meta:
        model = WorkOrder
        fields = '__all__'
