from rest_framework import serializers
# from django.contrib.auth.models import User
from .models import TodoList,WebsiteViews

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model=TodoList
        fields=['id','title','status','created_at']

class WebsiteViewsSerializer(serializers.ModelSerializer):
    class Meta:
        model=WebsiteViews
        fields=['id','total_views']

    def create(self,validated_data):
        totalViews=WebsiteViews.objects.count()
        if totalViews > 0:
            totalViews=WebsiteViews.objects.first()
            WebsiteViews.objects.all().update(total_views=totalViews.total_views+1)
        else:
            WebsiteViews.objects.create(total_views=1)
        totalViews=WebsiteViews.objects.first()
        return totalViews