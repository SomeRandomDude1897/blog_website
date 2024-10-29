"""
URL configuration for apitest project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from .views import (
    posts,
    posts_detail,
    users_detail,
    images_detail,
    auth,
    get_comments,
    add_post,
    add_comment,
    register,
    update_user_data,
)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("posts/", posts),
    path("posts_detail/", posts_detail),
    path("users_detail/", users_detail),
    path("images_detail/", images_detail),
    path("auth/", auth),
    path("comments/", get_comments),
    path("new_post", add_post),
    path("new_comment", add_comment),
    path("register", register),
    path("update_user_data", update_user_data),
]
