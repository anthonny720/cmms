from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.assets.models import Fixed, Tool, Physical, Files
from apps.assets.serializers import FixedSerializer, ToolsSerializer, PhysicalSerializer, FilesSerializer
from apps.util.permissions import PlannerEditorPermission, IsAdmin, BossEditorPermission


# Create your views here.

class ListTreeView(APIView):
    def get(self, request):
        data = []
        fixed_assets = Fixed.objects.all().order_by('name')
        for fix in fixed_assets:
            children = [{'name': physical.name, 'id': physical.id} for physical in fix.physicals.all().order_by('name')]
            data.append({'name': fix.name, 'id': fix.id, 'children': children})
        return Response({'data': data}, status=status.HTTP_200_OK)


class ListFixedView(APIView):
    def get(self, request):
        queryset = Fixed.objects.all()
        name = request.query_params.get('name')
        if name:
            queryset = queryset.filter(name__icontains=name)
        serializer = FixedSerializer(queryset, many=True)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)


@permission_classes([PlannerEditorPermission | IsAdmin | BossEditorPermission])
class AddFixedView(APIView):
    def post(self, request):
        serializer = FixedSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Fixed asset added'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Fixed asset not added: ' + ', '.join(serializer.errors)}, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([PlannerEditorPermission | IsAdmin | BossEditorPermission])
class UpdateFixedView(APIView):
    def patch(self, request, pk):
        fixed_asset = get_object_or_404(Fixed, pk=pk)
        fixed_asset = get_object_or_404(Fixed, pk=pk)
        serializer = FixedSerializer(fixed_asset, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Fixed asset updated'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Fixed asset not updated: ' + ', '.join(serializer.errors)},
                            status=status.HTTP_400_BAD_REQUEST)


@permission_classes([PlannerEditorPermission | IsAdmin | BossEditorPermission])
class DeleteFixedView(APIView):
    def delete(self, request, pk):
        fixed_asset = get_object_or_404(Fixed, pk=pk)
        fixed_asset.delete()
        return Response({'message': 'Fixed asset deleted'}, status=status.HTTP_200_OK)


@permission_classes([PlannerEditorPermission | IsAdmin | BossEditorPermission])
class ListToolsView(APIView):
    def get(self, request):
        queryset = Tool.objects.all()
        name = request.query_params.get('name')
        if name:
            queryset = queryset.filter(name__icontains=name)
        serializer = ToolsSerializer(queryset, many=True)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)


@permission_classes([PlannerEditorPermission | IsAdmin | BossEditorPermission])
class AddToolView(APIView):
    def post(self, request):
        serializer = ToolsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Tool added'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Tool not added: ' + ', '.join(serializer.errors)},
                            status=status.HTTP_400_BAD_REQUEST)


@permission_classes([PlannerEditorPermission | IsAdmin | BossEditorPermission])
class UpdateToolView(APIView):
    def delete(self, request, pk):
        tool = get_object_or_404(Tool, pk=pk)
        tool.delete()
        return Response({'message': 'Tool deleted'}, status=status.HTTP_200_OK)


    def patch(self, request, pk):
        tool = get_object_or_404(Tool, pk=pk)
        serializer = ToolsSerializer(tool, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Tool updated'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Tool not updated: ' + ', '.join(serializer.errors)},
                            status=status.HTTP_400_BAD_REQUEST)


@permission_classes([PlannerEditorPermission | IsAdmin | BossEditorPermission])
class DeleteToolView(APIView):
    def delete(self, request, pk):
        tool = get_object_or_404(Tool, pk=pk)
        tool.delete()
        return Response({'message': 'Tool deleted'}, status=status.HTTP_200_OK)


class ListPhysicalView(APIView):
    def get(self, request):
        try:
            queryset = Physical.objects.all()
            name = request.query_params.get('name', None)
            if name:
                queryset = queryset.filter(name__icontains=name)
            serializer = PhysicalSerializer(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No  physical assets found', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@permission_classes([PlannerEditorPermission | IsAdmin | BossEditorPermission])
class AddPhysicalView(APIView):
    def post(self, request):
        serializer = PhysicalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Physical asset added'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'No added physical asset' + ', '.join(serializer.errors)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@permission_classes([PlannerEditorPermission | IsAdmin | BossEditorPermission])
class DeletePhysicalView(APIView):
    def delete(self, request, pk):
        physical = get_object_or_404(Physical, pk=pk)
        physical.delete()
        return Response({'message': 'Physical asset deleted'}, status=status.HTTP_200_OK)



@permission_classes([PlannerEditorPermission | IsAdmin | BossEditorPermission])
class UpdatePhysicalView(APIView):
    def get(self, request, pk):
        try:
            physical = Physical.objects.get(pk=pk)
            serializer = PhysicalSerializer(physical)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, request, pk):
        physical = get_object_or_404(Physical, pk=pk)
        serializer = PhysicalSerializer(physical, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Physical asset updated'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Physical asset not updated: ' + ', '.join(serializer.errors)},
                            status=status.HTTP_400_BAD_REQUEST)


@permission_classes([PlannerEditorPermission | IsAdmin | BossEditorPermission])
class AddFilePhysicalView(APIView):
    def post(self, request, pk):
        try:
            data = request.data
            file = Files.objects.create(file=data['file'])
            file.save()
            physical = Physical.objects.get(pk=pk)
            physical.files.add(file)
            physical.save()
            return Response({'message': 'File added to physical asset'}, status=status.HTTP_201_CREATED)
        except Physical.DoesNotExist:
            return Response({'error': f'Physical asset not found for ID {pk}'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': f'File not added for physical asset ID {pk}: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ListFilesView(APIView):
    def get(self, request):
        try:
            queryset = Files.objects.all()
            name = request.query_params.get('name')
            if name:
                queryset = queryset.filter(file__icontains=name)
            if queryset.exists():
                serializer = FilesSerializer(queryset, many=True)
                return Response({'data': serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'No files found matching the criteria'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': 'No files found', 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@permission_classes([PlannerEditorPermission | IsAdmin | BossEditorPermission])
class AddFileView(APIView):
    def post(self, request):
        serializer = FilesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'File added successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'File not added: ' + ', '.join(serializer.errors)},
                            status=status.HTTP_400_BAD_REQUEST)


@permission_classes([PlannerEditorPermission | IsAdmin | BossEditorPermission])
class DeleteFileView(APIView):
    def delete(self, request, pk):
        try:
            file = Files.objects.get(pk=pk)
            file.delete()
            return Response({'message': 'File deleted successfully'}, status=status.HTTP_200_OK)
        except Files.DoesNotExist:
            return Response({'error': f'File not found for ID {pk}'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': f'File not deleted for ID {pk}: {str(e)}'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
