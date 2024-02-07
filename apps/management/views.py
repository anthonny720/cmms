from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from django.utils.dateparse import parse_date
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.management.models import WorkOrder, ResourceItem, HelperItem
from apps.management.serializers import WorkOrderSerializer
from apps.store.models import Article
from apps.util.permissions import PlannerEditorPermission, TechnicalEditorPermission, SupervisorEditorPermission, \
    BossEditorPermission, RequesterEditorPermission

User = get_user_model()


# Create your views here.

class WorkOrderListView(APIView):
    def get(self, request):
        try:
            queryset = WorkOrder.objects.all().order_by('-date_start')

            date_start = request.query_params.get('date_start')
            date_end = request.query_params.get('date_end')
            planned = request.query_params.get('planned')
            user_id = request.query_params.get('user')
            type_maintenance_id = request.query_params.get('type')
            physical_id = request.query_params.get('physical')

            if planned in ['true', 'false']:
                queryset = queryset.filter(planned=(planned == 'true'))
            if physical_id:
                queryset = queryset.filter(asset_id=physical_id)
            if type_maintenance_id:
                queryset = queryset.filter(type_maintenance_id=type_maintenance_id)
            if physical_id:
                queryset = queryset.filter(asset_id=physical_id)
            if date_start and date_end:
                start_date = parse_date(date_start)
                end_date = parse_date(date_end)
                if start_date and end_date:
                    queryset = queryset.filter(date_start__range=[start_date, end_date])
                else:
                    return Response({'error': 'Invalid date format'}, status=status.HTTP_400_BAD_REQUEST)
            if not (date_start and date_end):
                queryset = queryset[:50]
            serializer = WorkOrderSerializer(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Not work orders found'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@permission_classes([PlannerEditorPermission | TechnicalEditorPermission | BossEditorPermission])
class AddWorkOrderView(APIView):
    def post(self, request):
        try:
            user = request.user
            if user.role in ['P', 'B'] and 'technical' in request.data:
                technical_id = request.data.get('technical')
                if not User.objects.filter(pk=technical_id).exists():
                    return Response({'error': 'Technical user does not exist'}, status=status.HTTP_404_NOT_FOUND)
            else:
                request.data['technical'] = user.id
            serializer = WorkOrderSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Work order added successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': 'Work order not added: ' + ', '.join(serializer.errors)},
                            status=status.HTTP_400_BAD_REQUEST)


@permission_classes([PlannerEditorPermission | TechnicalEditorPermission | BossEditorPermission])
class UpdateWorkOrderView(APIView):
    def patch(self, request, pk):
        try:
            work_order = WorkOrder.objects.get(pk=pk)
            if request.user.role != 'P' or request.user.role != 'B' or request.user != work_order.technical:
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_403_FORBIDDEN)
            # Opcional:
            # if (timezone.now() - work_order.date_start).total_seconds() > 24 * 60 * 60:
            #     return Response({'error': 'No se puede modificar una orden de trabajo pasadas 24 horas de su inicio'}, status=status.HTTP_403_FORBIDDEN)

            serializer = WorkOrderSerializer(work_order, data=request.data, partial=True)  # partial=True para PATCH
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Work order updated'}, status=status.HTTP_200_OK)
        except WorkOrder.DoesNotExist:
            return Response({'error': 'Work order not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error':  "Work order not updated: " + ', '.join(serializer.errors)},
                            status=status.HTTP_400_BAD_REQUEST)

@permission_classes([SupervisorEditorPermission])
class UpdateWorkSupervisorView(APIView):
    def patch(self, request, pk):
        try:
            work_order = WorkOrder.objects.get(pk=pk)
        except WorkOrder.DoesNotExist:
            return Response({'error': 'Work order not found'}, status=status.HTTP_404_NOT_FOUND)
        work_order.cleaned = True
        work_order.supervisor = request.user
        work_order.save()
        return Response({'message': 'Work order updated successfully'}, status=status.HTTP_200_OK)@permission_classes([SupervisorEditorPermission])

@permission_classes([RequesterEditorPermission])
class UpdateWorkRequesterView(APIView):
    def patch(self, request, pk):
        try:
            work_order = WorkOrder.objects.get(pk=pk)
        except WorkOrder.DoesNotExist:
            return Response({'error': 'Work order not found'}, status=status.HTTP_404_NOT_FOUND)
        work_order.validated = True
        work_order.requester = request.user
        work_order.save()
        return Response({'message': 'Work order updated successfully'}, status=status.HTTP_200_OK)




@permission_classes([PlannerEditorPermission | TechnicalEditorPermission | BossEditorPermission])
class DeleteWorkOrderView(APIView):
    def delete(self, request, pk):
        try:
            work_order = WorkOrder.objects.get(pk=pk)
            work_order.delete()
            return Response({'message': 'Work order deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except WorkOrder.DoesNotExist:
            return Response({'error': 'Work order not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@permission_classes([PlannerEditorPermission | TechnicalEditorPermission])
class AddResourcesOTView(APIView):
    def post(self, request, pk):
        order = get_object_or_404(WorkOrder, pk=pk)

        if request.user != order.technical or request.user.role != 'P' or request.user.role != 'B':
            return Response({'error': 'No tiene permisos para realizar esta acción'}, status=status.HTTP_403_FORBIDDEN)
        # Opcional:
        # if (timezone.now() - order.date_start).total_seconds() > 24 * 60 * 60:
        #     return Response({'error': 'No se puede modificar una orden de trabajo después de 24 horas de su inicio'}, status=status.HTTP_403_FORBIDDEN)

        article_id = request.data.get('article')
        if not article_id:
            return Response({'error': 'Article ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        article = get_object_or_404(Article, pk=article_id)

        resource, created = ResourceItem.objects.get_or_create(work_order=order, article=article,
                                                               defaults={'quantity': 1})
        if not created:
            resource.quantity += 1
            resource.save()
        return Response({'message': 'Resource added'}, status=status.HTTP_201_CREATED)


@permission_classes([PlannerEditorPermission | TechnicalEditorPermission])
class DeleteResourceOTView(APIView):
    def delete(self, request, pk):
        resource_item = get_object_or_404(ResourceItem, pk=pk)
        if request.user != resource_item.work_order.technical or request.user.role != 'P' or request.user.role != 'B':
            return Response({'error': 'No tiene permisos para realizar esta acción'}, status=status.HTTP_403_FORBIDDEN)
        resource_item.delete()
        return Response({'message': 'Resource deleted successfully'}, status=status.HTTP_200_OK)


@permission_classes([PlannerEditorPermission | TechnicalEditorPermission])
class AddHelpersOTView(APIView):
    def post(self, request, pk):
        order = get_object_or_404(WorkOrder, pk=pk)
        if request.user != order.technical or request.user.role != 'P' or request.user.role != 'B':
            return Response({'error': 'No tiene permisos para realizar esta acción'}, status=status.HTTP_403_FORBIDDEN)
        # Opcional:
        # if (timezone.now() - order.date_start).total_seconds() > 24 * 60 * 60:
        #     return Response({'error': 'No se puede modificar una orden de trabajo después de 24 horas de su inicio'}, status=status.HTTP_403_FORBIDDEN)

        helper_id = request.data.get('helper')
        date_start = request.data.get('date_start')
        date_finish = request.data.get('date_finish')

        if not all([helper_id, date_start, date_finish]):
            return Response({'error': 'Missing data for helper, date start, or date finish'},
                            status=status.HTTP_400_BAD_REQUEST)
        helper = get_object_or_404(User, pk=helper_id)
        HelperItem.objects.create(work_order=order, helper=helper, date_start=date_start, date_finish=date_finish)
        return Response({'message': 'Helper added successfully'}, status=status.HTTP_201_CREATED)


@permission_classes([PlannerEditorPermission | TechnicalEditorPermission])
class DeleteHelperOTView(APIView):
    def delete(self, request, pk):
        helper_item = get_object_or_404(HelperItem, pk=pk)

        if request.user != helper_item.work_order.technical or request.user.role != 'P' or request.user.role != 'B':
            return Response({'error': 'No tiene permisos para realizar esta acción'}, status=status.HTTP_403_FORBIDDEN)

        # Opcional: Restricción de tiempo para la eliminación de ayudantes
        # if (timezone.now() - helper_item.work_order.date_start).total_seconds() > 24 * 60 * 60:
        #     return Response({'error': 'No se puede modificar una orden de trabajo después de 24 horas de su inicio'}, status=status.HTTP_403_FORBIDDEN)

        helper_item.delete()
        return Response({'message': 'Helper deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
