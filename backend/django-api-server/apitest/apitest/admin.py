from django.contrib import admin
from .models import UserData, Post, PostImage, PostComment, CommentImage

admin.site.register([UserData, Post, PostImage, PostComment, CommentImage])
