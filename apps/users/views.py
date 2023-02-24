# Create your views here.
from django.contrib.auth import get_user_model
from djoser.serializers import UserSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from djoser.views import UserViewSet
from rest_framework import permissions
from apps.users.models import UserCategory, ThirdParties
from apps.users.serializers import ThirdPartiesSerializer

User = get_user_model()


# Create your views here.
class DeleteUserView(APIView):
    def delete(self, request, *args, **kwargs):
        if not request.user.is_superuser:
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            id = int(kwargs['id'])
        except:
            return Response({'error': 'El id debe ser un numero entero'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(id=id)
        except:
            return Response({'error': 'No se encontro el usuario'}, status=status.HTTP_404_NOT_FOUND)
        if user.id == request.user.id:
            return Response({'error': 'Solicitud incorrecta, intentelo otra vez!'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            name = user.first_name
            user.delete()
            return Response({'message': 'Usuario eliminado'}, status=status.HTTP_200_OK)
        except:
            return Response({'error': 'No se pudo eliminar el usuario'}, status=status.HTTP_400_BAD_REQUEST)


class UpdateUserView(APIView):
    def patch(self, request, *args, **kwargs):
        if not request.user.is_superuser:
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            id = int(kwargs['id'])
        except:
            return Response({'error': 'El id debe ser un numero entero'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(id=id)
        except:
            return Response({'error': 'No se encontró el usuario'}, status=status.HTTP_404_NOT_FOUND)
        try:
            category = UserCategory.objects.get(id=request.data['category'])
        except:
            return Response({'error': 'No se encontró la categoría'}, status=status.HTTP_404_NOT_FOUND)
        try:
            user.first_name = request.data['first_name']
            user.last_name = request.data['last_name']
            user.last_name = request.data['last_name']
            user.address = request.data['address']
            user.phone = request.data['phone']
            user.dni = request.data['dni']
            user.category = category
            user.role = request.data['role']
            if request.data['password'] and request.data['password'] != "":
                user.set_password(request.data['password'])
            user.save()
            serializer = UserSerializer(user)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)



class CustomUserViewSet(UserViewSet):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]


class ListThirdPartiesView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            third_parties = ThirdParties.objects.all()
            serializer = ThirdPartiesSerializer(third_parties, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except:
            return Response({'error': 'Not found data'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AddThirdPartiesView(APIView):
    def post(self,request):
        try:
            if request.user.role != "Editor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            serializer = ThirdPartiesSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'data': serializer.data}, status=status.HTTP_201_CREATED)
            return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'Error adding third parties'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UpdateThirdPartiesView(APIView):
    def patch(self,request,pk):
        try:
            if request.user.role != "Editor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            third_parties = ThirdParties.objects.get(id=pk)
            serializer = ThirdPartiesSerializer(instance=third_parties,data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'data': serializer.data}, status=status.HTTP_200_OK)
            return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'Error updating third parties'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DeleteThirdPartiesView(APIView):
    def delete(self,request,pk):
        try:
            if request.user.role != "Editor":
                return Response({'error': 'No tiene permisos para realizar esta acción'},
                                status=status.HTTP_401_UNAUTHORIZED)
            third_parties = ThirdParties.objects.get(id=pk)
            third_parties.delete()
            return Response({'data': 'Third parties deleted'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Error deleting third parties'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

