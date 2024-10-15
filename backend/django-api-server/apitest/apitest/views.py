from django.http import JsonResponse
from .models import User, Post, PostImage
from .serializers import (
    user_serializer,
    post_serializer,
    post_image_serializer,
    user_data_serializer,
)
from rest_framework.response import Response
import rest_framework.status
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate

# здесь  написал передачу данных через тело строки, чтобы было проще скейлить обьемы данных на запрос
# реализованы все операции CRUD


@api_view(["GET", "POST"])
def posts(request):
    if request.method == "GET":
        amount = int(request.GET.get("amount"))

        if amount < 0:
            return Response(
                "negative indexing not supported",
                status=rest_framework.status.HTTP_400_BAD_REQUEST,
            )

        requested_posts = Post.objects.order_by("-created_at")[:amount]

        serializer = post_serializer(requested_posts, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == "POST":
        serializer = post_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                "data added successfully", status=rest_framework.status.HTTP_201_CREATED
            )
        else:
            return Response(
                "invalid data", status=rest_framework.status.HTTP_400_BAD_REQUEST
            )


@api_view(["POST"])
def auth(request):
    login = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=login, password=password)

    print(login, password)

    if user is not None:
        serializer = user_serializer(user, many=False)
        return JsonResponse(
            {"successful": True, "user_info": serializer.data}, safe=False
        )
    else:
        return JsonResponse({"successful": False})


@api_view(["GET", "PUT", "DELETE"])
def images_detail(request):
    image = get_object_or_404(PostImage, id=int(request.GET.get("request_id")))
    if request.method == "GET":
        serializer = post_image_serializer(image, many=False)
        return JsonResponse(serializer.data, safe=False)
    if request.method == "PUT":
        serializer = post_image_serializer(image, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                "data updated successfully", status=rest_framework.status.HTTP_200_OK
            )
        else:
            return Response(
                "invalid data", status=rest_framework.status.HTTP_400_BAD_REQUEST
            )
    if request.method == "DELETE":
        image.delete()
        return Response(
            "data deleted successfully", status=rest_framework.status.HTTP_200_OK
        )


@api_view(["GET", "PUT", "DELETE"])
def users_detail(request):
    user = get_object_or_404(User, id=int(request.GET.get("request_id")))
    # if request.method == "GET":
    #     serializer = user_serializer(user, many=False)
    #     user_data = user_data_serializer(user.data.all(), )
    #     images = post_serializer(user.posts.all(), many=True)
    #     return JsonResponse(
    #         {"user_info": serializer.data, "user_extra_data": , "posts": images.data}, safe=False
    #     )
    if request.method == "PUT":
        serializer = user_serializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                "data updated successfully", status=rest_framework.status.HTTP_200_OK
            )
        else:
            return Response(
                "invalid data", status=rest_framework.status.HTTP_400_BAD_REQUEST
            )
    if request.method == "DELETE":
        user.delete()
        return Response(
            "data deleted successfully", status=rest_framework.status.HTTP_200_OK
        )


@api_view(["GET", "PUT", "DELETE"])
def posts_detail(request):
    post = get_object_or_404(Post, id=int(request.GET.get("request_id")))
    if request.method == "GET":
        serializer = post_serializer(post, many=False)
        images = post_image_serializer(post.images.all(), many=True)
        return JsonResponse(
            {"post_info": serializer.data, "images": images.data}, safe=False
        )
    if request.method == "PUT":
        serializer = post_serializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                "data updated successfully", status=rest_framework.status.HTTP_200_OK
            )
        else:
            return Response(
                "invalid data", status=rest_framework.status.HTTP_400_BAD_REQUEST
            )
    if request.method == "DELETE":

        post.delete()
        return Response(
            "data deleted successfully", status=rest_framework.status.HTTP_200_OK
        )
