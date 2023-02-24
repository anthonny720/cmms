from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.assets.models import Fixed, Tool, Physical, Files
from apps.assets.serializers import FixedSerializer, ToolsSerializer, PhysicalSerializer, FilesSerializer


# Create your views here.
class ListTreeView(APIView):
    def get(self, request):
        try:
            data = []
            fixed = Fixed.objects.all().order_by('name')
            for fix in fixed:
                sub_physical = []
                physical = fix.physicals.all().order_by('name')
                for phy in physical:
                    sub_physical.append({'name': phy.name, 'id': phy.id})
                data.append({'name': fix.name, 'id': fix.id, 'children': sub_physical})
            return Response({'data': data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No  assets tree found'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListFixedView(APIView):
    def get(self, request):
        try:
            queryset = Fixed.objects.all()
            name = request.query_params.get('name', None)
            if name:
                queryset = queryset.filter(name__icontains=name)
            serializer = FixedSerializer(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No  fixes assets found'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AddFixedView(APIView):
    def post(self, request):
        try:
            if request.user.role != "Editor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            serializer = FixedSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'data': serializer.data}, status=status.HTTP_201_CREATED)
            return Response({'error': 'Fixed asset not added'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({'error': 'Fixed asset not added'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdateFixedView(APIView):
    def patch(self, request, pk):
        try:
            if request.user.role != "Editor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            fixed = Fixed.objects.get(pk=pk)
            serializer = FixedSerializer(fixed, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'data': serializer.data}, status=status.HTTP_200_OK)
            return Response({'error': 'Fixed asset not updated'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({'error': 'Fixed asset not updated'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DeleteFixedView(APIView):
    def delete(self, request, pk):
        try:
            if request.user.role != "Editor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            fixed = Fixed.objects.get(pk=pk)
            fixed.delete()
            return Response({'data': 'Fixed asset deleted'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Fixed asset not deleted'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListToolsView(APIView):
    def get(self, request):
        try:
            queryset = Tool.objects.all()
            name = request.query_params.get('name', None)
            if name:
                queryset = queryset.filter(name__icontains=name)
            serializer = ToolsSerializer(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No  tools found'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AddToolView(APIView):
    def post(self, request):
        try:
            if request.user.role != "Editor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            serializer = ToolsSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'data': serializer.data}, status=status.HTTP_201_CREATED)
            return Response({'error': 'Tool not added'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({'error': 'Tool not added'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdateToolView(APIView):
    def delete(self, request, pk):
        try:
            if request.user.role != "Editor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            tool = Tool.objects.get(pk=pk)
            tool.delete()
            return Response({'data': 'Tool deleted'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Tool not deleted'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, request, pk):
        try:
            if request.user.role != "Editor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            tool = Tool.objects.get(pk=pk)
            serializer = ToolsSerializer(tool, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'data': serializer.data}, status=status.HTTP_200_OK)
            return Response({'error': 'Tool not updated'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({'error': 'Tool not updated'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DeleteToolView(APIView):
    def delete(self, request, pk):
        try:
            if request.user.role != "Editor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            tool = Tool.objects.get(pk=pk)
            tool.delete()
            return Response({'data': 'Tool deleted'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Tool not deleted'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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


class AddPhysicalView(APIView):
    def post(self, request):
        try:
            if request.user.role != "Editor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            serializer = PhysicalSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'data': serializer.data}, status=status.HTTP_201_CREATED)
            return Response({'error': 'Physical asset not added','detail':str(serializer.errors)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({'error': 'Physical asset not added'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DeletePhysicalView(APIView):
    def delete(self, request, pk):
        try:
            if request.user.role != "Editor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            physical = Physical.objects.get(pk=pk)
            physical.delete()
            return Response({'data': 'Physical asset deleted'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Physical asset not deleted'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdatePhysicalView(APIView):
    def get(self, request, pk):
        try:
            physical = Physical.objects.get(pk=pk)
            serializer = PhysicalSerializer(physical)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Physical asset not found'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR )
    def patch(self, request, pk):
        try:
            if request.user.role != "Editor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            physical = Physical.objects.get(pk=pk)
            serializer = PhysicalSerializer(physical, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'data': serializer.data}, status=status.HTTP_200_OK)
            return Response({'error': 'Physical asset not updated', 'detail': str(serializer.errors)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({'error': 'Physical asset not updated', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AddFilePhysicalView(APIView):
    def post(self, request,pk):
        try:
            if request.user.role != "Editor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            data = request.data
            file = Files.objects.create(file=data['file'])
            file.save()
            physical = Physical.objects.get(pk=pk)
            physical.files.add(file)
            physical.save()
            return Response({'data': 'File added'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': 'File not added'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListFilesView(APIView):
    def get(self, request):
        try:
            queryset = Files.objects.all()
            name = request.query_params.get('name', None)
            if name:
                queryset = queryset.filter(file__icontains=name)
            serializer = FilesSerializer(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No  files found'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AddFileView(APIView):
    def post(self, request):
        try:
            if request.user.role != "Editor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            serializer = FilesSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'data': serializer.data}, status=status.HTTP_201_CREATED)
            return Response({'error': 'File not added'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({'error': 'File not added'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DeleteFileView(APIView):
    def delete(self, request, pk):
        try:
            if request.user.role != "Editor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            file = Files.objects.get(pk=pk)
            file.delete()
            return Response({'data': 'File deleted'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'File not deleted'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
