from django.contrib import admin
from .models import UserData, Post, PostImage

admin.site.register([UserData, Post, PostImage])
