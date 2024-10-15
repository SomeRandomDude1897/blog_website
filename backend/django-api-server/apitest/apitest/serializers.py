from rest_framework import serializers
from .models import UserData, Post, PostImage
from django.contrib.auth.models import User


class user_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name"]


class user_data_serializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = ["id", "user_origin", "profile_pic", "bio"]


class post_serializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["id", "author", "postname", "content", "created_at"]


class post_image_serializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ["id", "post", "title", "file"]
