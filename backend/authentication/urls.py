
from django.urls import path
from .views import CreateUserView, UserApiView, UserRetrieveApiView
from rest_framework.authtoken import views

urlpatterns=[
    path('users/',UserApiView.as_view()),
    path('users/<int:pk>', UserRetrieveApiView.as_view()),
    path('users/register', CreateUserView.as_view()),
    path('token-auth', views.obtain_auth_token)
]