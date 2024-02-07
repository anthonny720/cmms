import os
from datetime import datetime

import gdown as gdown
import pandas as pd
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.store.models import Article, Requirements
from apps.store.serializers import StoreSerializer, RequirementsSerializer
from apps.util.permissions import PlannerEditorPermission, TechnicalEditorPermission, ShoppingEditorPermission


# Create your views here.

class SyncStoreView(APIView):
    def get(self, request, format=None):

        url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQa-iUbwwcTX0pCsk88ZpoM1MbmnFViJebBFzTeNNHGbvAcgEo2AFzqqxMktKH-ew/pub?output=xlsx'
        output = 'temp_file.xlsx'
        gdown.download(url, output, quiet=True)

        try:
            df = pd.read_excel(output, dtype=str, engine='openpyxl', skiprows=5, sheet_name='KARDEX GENERAL')
            df.fillna(0, inplace=True)
            Article.objects.all().delete()
            for _, row in df.iterrows():
                Article.objects.create(group=row['FAMILIA'], code_sap=row['CODIGO'], description=row['DESCRIPCION'],
                    unit_measurement=row['U.M.'], value=float(row['COSTO UNITARIO'] or 0),
                    stock=int(round(float(row['EXISTENCIA ACTUAL'] or 0))))

            os.remove(output)
            return Response(status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListStoreView(APIView):
    def get(self, request):
        try:
            queryset = Article.objects.exclude(group__icontains='0')
            description = request.query_params.get('name')
            if description:
                queryset = queryset.filter(description__icontains=description)
            serializer = StoreSerializer(queryset[:20], many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except:
            return Response({'error': 'No articles found'}, status=status.HTTP_200_OK)


class ListRequirementsView(APIView):
    def get(self, request):
        try:
            queryset = Requirements.objects.all()
            date_start = request.query_params.get('date_start')
            date_end = request.query_params.get('date_end')
            if date_start and date_end:
                start_date = datetime.strptime(date_start, "%d/%m/%Y")
                end_date = datetime.strptime(date_end, "%d/%m/%Y")
                queryset = queryset.filter(date__range=[start_date, end_date])
            else:
                queryset = queryset.filter(date__month=datetime.now().month)
            serializer = RequirementsSerializer(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No requirements found', 'detail': str(e)}, status=status.HTTP_200_OK)


@permission_classes([PlannerEditorPermission | TechnicalEditorPermission])
class AddRequirementsView(APIView):
    def post(self, request):
        try:
            data = request.data.copy()
            data['user'] = request.user.id
            serializer = RequirementsSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Requirements added'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([PlannerEditorPermission | TechnicalEditorPermission | ShoppingEditorPermission])
class UpdateRequirementsView(APIView):
    def patch(self, request, id):
        requirements = get_object_or_404(Requirements, pk=id)
        try:
            serializer = RequirementsSerializer(requirements, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Requirements updated'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([PlannerEditorPermission])
class DeleteRequirementsView(APIView):
    def delete(self, request, id):
        requirements = get_object_or_404(Requirements, pk=pk)
        requirements.delete()
        return Response({'message': 'Requirements deleted'}, status=status.HTTP_200_OK)
