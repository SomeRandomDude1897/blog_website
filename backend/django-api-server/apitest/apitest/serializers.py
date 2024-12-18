from rest_framework import serializers
from .models import UserData, Post, PostImage, PostComment, CommentImage
from django.contrib.auth.models import User


class user_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "is_staff"]


class user_data_serializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = ["id", "user_origin", "bio", "profile_pic"]


class post_serializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["id", "author", "postname", "content", "created_at"]


class post_image_serializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ["id", "post", "file"]


class post_comment_serializer(serializers.ModelSerializer):
    class Meta:
        model = PostComment
        fields = [
            "id",
            "post",
            "author",
            "content",
            "created_at",
        ]


class comment_image_serializer(serializers.ModelSerializer):
    class Meta:
        model = CommentImage
        fields = ["id", "comment", "file"]
