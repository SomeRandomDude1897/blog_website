from rest_framework import serializers
from .models import User, Post, PostImage


class user_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "profile_pic", "bio"]


class post_serializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["id", "author", "postname", "content", "created_at"]


class post_image_serializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ["id", "post", "title", "file"]
