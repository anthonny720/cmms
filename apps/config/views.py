from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.config.models import Failure, Type
from apps.config.serializers import FailureSerializer, TypeSerializer
from apps.users.models import UserCategory
from apps.users.serializers import UserCategorySerializer
from apps.util.permissions import PlannerEditorPermission, IsAdmin, BossEditorPermission


# Create your views here.

class ListFailureView(APIView):
    def get(self, request):
        failures = Failure.objects.all()
        serializer = FailureSerializer(failures, many=True)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)

class ListTypeView(APIView):
    def get(self, request):
        types = Type.objects.all()
        serializer = TypeSerializer(types, many=True)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)


@permission_classes([PlannerEditorPermission | IsAdmin | BossEditorPermission])
class AddFailureView(APIView):
    def post(self, request):
        serializer = FailureSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Failure added successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Failure not added: ' + ', '.join(serializer.errors)},
                            status=status.HTTP_400_BAD_REQUEST)


@permission_classes([PlannerEditorPermission | IsAdmin | BossEditorPermission])
class AddTypeView(APIView):
    def post(self, request):
        serializer = TypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Type added successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Type not added: ' + ', '.join(serializer.errors)},
                            status=status.HTTP_400_BAD_REQUEST)


@permission_classes([PlannerEditorPermission | IsAdmin | BossEditorPermission])
class UpdateFailureView(APIView):
    def patch(self, request, pk):
        failure = get_object_or_404(Failure, pk=pk)
        serializer = FailureSerializer(failure, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Failure updated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Failure not updated: ' + ', '.join(serializer.errors)},
                            status=status.HTTP_400_BAD_REQUEST)


@permission_classes([PlannerEditorPermission | IsAdmin | BossEditorPermission])
class UpdateTypeView(APIView):
    def patch(self, request, pk):
        type_instance = get_object_or_404(Type, pk=pk)
        serializer = TypeSerializer(type_instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Type updated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Type not updated: ' + ', '.join(serializer.errors)},
                            status=status.HTTP_400_BAD_REQUEST)


@permission_classes([PlannerEditorPermission | IsAdmin | BossEditorPermission])
class DeleteFailureView(APIView):
    def delete(self, request, pk):
        failure = get_object_or_404(Failure, pk=pk)
        failure.delete()
        return Response({'message': 'Failure deleted successfully'}, status=status.HTTP_200_OK)


@permission_classes([PlannerEditorPermission | IsAdmin | BossEditorPermission])
class DeleteTypeView(APIView):
    def delete(self, request, pk):
        type_instance = get_object_or_404(Type, pk=pk)
        type_instance.delete()
        return Response({'message': 'Type deleted successfully'}, status=status.HTTP_200_OK)


class ListCategoryView(APIView):
    def get(self, request):
        categories = UserCategory.objects.all()
        serializer = UserCategorySerializer(categories, many=True)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)


@permission_classes([PlannerEditorPermission | IsAdmin | BossEditorPermission])
class AddCategoryView(APIView):
    def post(self, request):
        serializer = UserCategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Category added successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Category not added: ' + ', '.join(serializer.errors)},
                            status=status.HTTP_400_BAD_REQUEST)


@permission_classes([PlannerEditorPermission | IsAdmin | BossEditorPermission])
class UpdateCategoryView(APIView):
    def patch(self, request, pk):
        category = get_object_or_404(UserCategory, pk=pk)
        serializer = UserCategorySerializer(category, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Category updated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Category not updated: ' + ', '.join(serializer.errors)},
                            status=status.HTTP_400_BAD_REQUEST)

@permission_classes([PlannerEditorPermission | IsAdmin | BossEditorPermission])
class DeleteCategoryView(APIView):
    def delete(self, request, pk):
        category = get_object_or_404(UserCategory, pk=pk)
        category.delete()
        return Response({'message': 'Category deleted successfully'}, status=status.HTTP_200_OK)
