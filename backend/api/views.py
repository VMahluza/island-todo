from django.shortcuts import render
from .serializers import TodoSerializer,WebsiteViewsSerializer
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView
from .models import TodoList,WebsiteViews
# Create your views here.
class TodoApiListView(ListCreateAPIView):
    serializer_class=TodoSerializer
    queryset=TodoList.objects.all()
    
class TodoApiUpdateView(RetrieveUpdateDestroyAPIView):
    serializer_class=TodoSerializer
    queryset=TodoList.objects.all()

class WebsiteViewsApi(ListCreateAPIView):
    serializer_class=WebsiteViewsSerializer
    queryset=WebsiteViews.objects.all()