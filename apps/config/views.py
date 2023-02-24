from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.config.models import Failure, Type
from apps.config.serializers import FailureSerializer, TypeSerializer
from apps.users.models import UserCategory
from apps.users.serializers import UserCategorySerializer


# Create your views here.

class ListFailureView(APIView):
    def get(self, request):
        try:
            failures = Failure.objects.all()
            serializer = FailureSerializer(failures, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No failures found'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class ListTypeView(APIView):
    def get(self, request):
        try:
            types = Type.objects.all()
            serializer = FailureSerializer(types, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No types found'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AddFailureView(APIView):
    def post(self, request):

        try:
            if request.user.role != "Editor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            serializer = FailureSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'data': serializer.data}, status=status.HTTP_201_CREATED)
            return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'An error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AddTypeView(APIView):
    def post(self, request):
        try:
            if request.user.role != "Editor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            serializer = TypeSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'data': serializer.data}, status=status.HTTP_201_CREATED)
            return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'An error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UpdateFailureView(APIView):
    def patch(self, request, pk):
        try:
            if request.user.role != "Editor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            failure = Failure.objects.get(pk=pk)
            serializer = FailureSerializer(failure, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'data': serializer.data}, status=status.HTTP_200_OK)
            return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'An error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UpdateTypeView(APIView):
    def patch(self, request, pk):
        try:
            if request.user.role != "Editor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            type = Type.objects.get(pk=pk)
            serializer = TypeSerializer(type, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'data': serializer.data}, status=status.HTTP_200_OK)
            return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'An error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DeleteFailureView(APIView):
    def delete(self, request, pk):
        try:
            if request.user.role != "Editor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            failure = Failure.objects.get(pk=pk)
            failure.delete()
            return Response({'message': 'Failure deleted'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DeleteTypeView(APIView):
    def delete(self, request, pk):
        try:
            if request.user.role != "Editor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            type = Type.objects.get(pk=pk)
            type.delete()
            return Response({'message': 'Type deleted'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class ListCategoryView(APIView):
    def get(self, request):
        try:
            category = UserCategory.objects.all()
            serializer = UserCategorySerializer(category, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No categories found'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AddCategoryView(APIView):
    def post(self, request):
        try:
            if request.user.role != "Editor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            serializer = UserCategorySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'data': serializer.data}, status=status.HTTP_201_CREATED)
            return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'An error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UpdateCategoryView(APIView):
    def patch(self, request, pk):
        try:
            if request.user.role != "Editor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            category = UserCategory.objects.get(pk=pk)
            serializer = UserCategorySerializer(category, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'data': serializer.data}, status=status.HTTP_200_OK)
            return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'An error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DeleteCategoryView(APIView):
    def delete(self, request, pk):
        try:
            if request.user.role != "Editor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            category = UserCategory.objects.get(pk=pk)
            category.delete()
            return Response({'message': 'Category deleted'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)