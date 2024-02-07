# Create your views here.
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.users.models import UserCategory, ThirdParties
from apps.users.serializers import ThirdPartiesSerializer
from apps.util.permissions import IsAdmin, PlannerEditorPermission, BossEditorPermission

User = get_user_model()


# Create your views here.
@permission_classes([IsAdmin])
class DeleteUserView(APIView):
    def delete(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        if user == request.user:
            return Response({'error': 'Cannot delete self'}, status=status.HTTP_400_BAD_REQUEST)
        user.delete()
        return Response({'message': f'User {user.get_full_name()} deleted'}, status=status.HTTP_204_NO_CONTENT)


@permission_classes([PlannerEditorPermission | IsAdmin | BossEditorPermission])
class UpdateUserView(APIView):
    def patch(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        category = get_object_or_404(UserCategory, pk=request.data.get('category'))

        for field in ['first_name', 'last_name', 'address', 'phone', 'dni', 'role']:
            if field in request.data:
                setattr(user, field, request.data[field])
        user.category = category
        if 'password' in request.data and request.data['password']:
            user.set_password(request.data['password'])
        user.save()
        return Response({'message': 'User updated'}, status=status.HTTP_200_OK)


class ListThirdPartiesView(APIView):
    def get(self, request, *args, **kwargs):
        third_parties = ThirdParties.objects.all()
        serializer = ThirdPartiesSerializer(third_parties, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@permission_classes([PlannerEditorPermission | IsAdmin | BossEditorPermission])
class AddThirdPartiesView(APIView):
    def post(self, request):
        serializer = ThirdPartiesSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Third party added'}, status=status.HTTP_201_CREATED)


@permission_classes([PlannerEditorPermission | IsAdmin | BossEditorPermission])
class UpdateThirdPartiesView(APIView):
    def patch(self, request, pk):
        third_party = get_object_or_404(ThirdParties, pk=pk)
        serializer = ThirdPartiesSerializer(instance=third_party, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Third party updated'}, status=status.HTTP_200_OK)


@permission_classes([PlannerEditorPermission | IsAdmin | BossEditorPermission])
class DeleteThirdPartiesView(APIView):
    def delete(self, request, pk):
        third_party = get_object_or_404(ThirdParties, pk=pk)
        third_party.delete()
        return Response({'message': 'Third parties deleted'}, status=status.HTTP_200_OK)

