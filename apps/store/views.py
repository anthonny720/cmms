from datetime import datetime
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.store.models import Article, Requirements
from apps.store.serializers import StoreSerializer, RequirementsSerializer
from util.pagination import SetPagination


# Create your views here.

class ListStoreView(APIView):
    def get(self, request):
        try:
            queryset = Article.objects.all()
            description = request.query_params.get('name', None)
            if description:
                queryset = queryset.filter(description__icontains=description)

            paginator = SetPagination()
            result_page = paginator.paginate_queryset(queryset, request)
            serializer = StoreSerializer(result_page, many=True)
            return paginator.get_paginated_response({'data': serializer.data})
        except:
            return Response({'error': 'No articles found'}, status=status.HTTP_200_OK)


class ListRequirementsView(APIView):
    def get(self, request):
        try:
            queryset = Requirements.objects.all()
            date_start = request.query_params.get('date_start', None)
            date_end = request.query_params.get('date_end', None)
            if date_start and date_end:
                queryset = queryset.filter(date__range=[date_start[:10], date_end[:10]])
            else:
                queryset = queryset.filter(date__month=datetime.now().month)
            serializer = RequirementsSerializer(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except:
            return Response({'error': 'No requirements found'}, status=status.HTTP_200_OK)


class AddRequirementsView(APIView):
    def post(self, request):
        try:
            if request.user.role != "Editor" and request.user.role != "Técnico":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            data = request.data
            data['user'] = request.user.id
            serializer = RequirementsSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'data': serializer.data}, status=status.HTTP_201_CREATED)
            return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'error': 'Error creating requirements'}, status=status.HTTP_400_BAD_REQUEST)


class UpdateRequirementsView(APIView):
    def patch(self, request, id):
        try:
            if request.user.role != "Editor" and request.user.role != "Compras":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            queryset = Requirements.objects.get(id=id)
            serializer = RequirementsSerializer(queryset, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'data': serializer.data}, status=status.HTTP_200_OK)
            return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'error': 'Error updating requirements'}, status=status.HTTP_400_BAD_REQUEST)


class DeleteRequirementsView(APIView):
    def delete(self, request, id):
        try:
            if request.user.role != "Editor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            queryset = Requirements.objects.get(id=id)
            queryset.delete()
            return Response({'data': 'Requirements deleted'}, status=status.HTTP_200_OK)
        except:
            return Response({'error': 'Error deleting requirements'}, status=status.HTTP_400_BAD_REQUEST)
