from .models import User
from rest_framework.generics import ListCreateAPIView
from .serializers import UserSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import RetrieveAPIView
from django.shortcuts import get_object_or_404

class UserRetrieveApiView(RetrieveAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_object(self):
        user_id = self.kwargs['pk']
        return get_object_or_404(User, id=user_id)


class UserApiView(ListCreateAPIView):
    serializer_class=UserSerializer
    queryset =User.objects.all()



class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]