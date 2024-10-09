from django.contrib import admin
from .models import User, Post, PostImage

admin.site.register([User, Post, PostImage])
