from django.http import JsonResponse
from .models import User, Post, PostImage
from .serializers import user_serializer, post_serializer, post_image_serializer
from rest_framework.response import Response
import rest_framework.status
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404

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


@api_view(["GET", "PUT", "DELETE"])
def posts_detail(request):
    post = get_object_or_404(Post, id=int(request.GET.get("request_id")))
    if request.method == "GET":
        print(post.content)
        serializer = post_serializer(post, many=False)
        return JsonResponse(serializer.data, safe=False)
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
