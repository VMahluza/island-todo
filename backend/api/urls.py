
from django.urls import path
from .views import TodoApiListView,TodoApiUpdateView,WebsiteViewsApi
from rest_framework.authtoken import views

urlpatterns=[

    path('todos/',TodoApiListView.as_view()),
    path('todos/<pk>/',TodoApiUpdateView.as_view()),
    path('total-views/',WebsiteViewsApi.as_view()),
]