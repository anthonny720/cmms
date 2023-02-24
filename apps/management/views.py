from datetime import datetime

from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.management.models import WorkOrder, WorkRequest, ResourceItem
from apps.management.serializers import WorkOrderSerializer, WorkRequestSerializer, ResourceItemSerializer
from apps.store.models import Article


# Create your views here.

class WorkOrderPendingListView(APIView):
    def get(self, request):
        try:
            user = request.user
            id = user.id
            queryset = WorkOrder.objects.filter(status=False)
            if user.role == "Técnico":
                queryset = queryset.filter(technical=id)
            date = request.query_params.get('date', None)
            if date:
                queryset = queryset.filter(date_start__date=datetime.strptime(date[:10], '%Y-%m-%d'))
            else:
                queryset = queryset.filter(date_start__month=datetime.now().month)

            serializer = WorkOrderSerializer(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No work orders pending found', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class WorkOrderFinishListView(APIView):
    def get(self, request):
        try:
            user = request.user
            id = user.id
            queryset = WorkOrder.objects.filter(status=True)
            if user.role == "Técnico":
                queryset = queryset.filter(technical=id)
            date = request.query_params.get('date', None)
            if date:
                queryset = queryset.filter(date_start__date=datetime.strptime(date[:10], '%Y-%m-%d'))
            else:
                queryset = queryset.filter(date_start__month=datetime.now().month)
            serializer = WorkOrderSerializer(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No work orders finished found'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AddWorkOrderView(APIView):
    def post(self, request):
        try:
            if request.user.role != "Editor" and request.user.role != "Técnico":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            serializer = WorkOrderSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'data': serializer.data}, status=status.HTTP_200_OK)
            return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'Error adding work order'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdateWorkOrderView(APIView):
    def patch(self, request, pk):
        try:
            if request.user.role != "Editor" and request.user.role != "Técnico":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            queryset = WorkOrder.objects.get(pk=pk)
            serializer = WorkOrderSerializer(queryset, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'data': serializer.data}, status=status.HTTP_200_OK)
            return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'Error updating work order'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdateWorkSupervisorView(APIView):
    def patch(self, request, pk):
        try:
            if request.user.role != "Supervisor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            queryset = WorkOrder.objects.get(pk=pk)
            queryset.supervisor = request.user
            queryset.validated = request.data['validated']
            queryset.observations = request.data['observations']
            queryset.save()
            serializer = WorkOrderSerializer(queryset, many=False)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Error updating work order'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DeleteWorkOrderView(APIView):
    def delete(self, request, pk):
        try:
            if request.user.role != "Editor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            queryset = WorkOrder.objects.get(pk=pk)
            queryset.delete()
            return Response({'data': 'Work order deleted'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Error deleting work order', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListWorkRequestView(APIView):
    def get(self, request):
        try:
            queryset = WorkRequest.objects.all()
            serializer = WorkRequestSerializer(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Error listing work request'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AddWorkRequestView(APIView):
    def post(self, request):
        try:
            data = request.data
            data['user'] = request.user.id
            serializer = WorkRequestSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'data': serializer.data}, status=status.HTTP_201_CREATED)
            return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'Error adding work request'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GenerateOTView(APIView):
    def post(self, request):
        try:
            if request.user.role != "Editor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            serializer = WorkOrderSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                request = WorkRequest.objects.get(pk=request.data['work_request'])
                request.work_order = WorkOrder.objects.get(pk=serializer.data['id'])
                request.save()
                return Response({'data': serializer.data}, status=status.HTTP_201_CREATED)
            return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'Error adding work order'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AddResourcesOTView(APIView):
    def post(self, request, pk):
        try:
            if request.user.role != "Editor" and request.user.role != "Técnico":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            order = get_object_or_404(WorkOrder, pk=pk)
            article = get_object_or_404(Article, pk=request.data['article'])
            resource = ResourceItem.objects.filter(work_order=order, article=article)
            if resource.exists():
                resource = resource[0]
                resource.quantity += 1
                resource.save()
            else:
                resource = ResourceItem.objects.create(work_order=order, article=article, quantity=1)
            serializer = ResourceItemSerializer(resource)
            return Response({'data': serializer.data}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': 'Error adding resource'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'Error adding work request'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetOTView(APIView):
    def get(self, request, pk):
        try:
            queryset = WorkOrder.objects.get(pk=pk)
            serializer = WorkOrderSerializer(queryset)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Error listing work request'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DeleteResourceOTView(APIView):
    def delete(self, request, pk):
        try:
            if request.user.role != "Editor" and request.user.role != "Técnico":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            queryset = ResourceItem.objects.get(pk=pk)
            queryset.delete()
            return Response({'data': 'Resource deleted'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Error deleting resource', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
