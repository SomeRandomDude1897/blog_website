from django.db import models
from django.contrib.auth.models import User


class UserData(models.Model):
    user_origin = models.OneToOneField(
        User, related_name="data", on_delete=models.CASCADE
    )
    profile_pic = models.ImageField(upload_to="profile_images/")
    bio = models.CharField(max_length=1000)

    def __str__(self) -> str:
        return str(self.user_origin)


class Post(models.Model):
    author = models.ForeignKey(User, related_name="posts", on_delete=models.CASCADE)
    postname = models.CharField(max_length=200)
    content = models.CharField(max_length=10000)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.postname


class PostImage(models.Model):
    post = models.ForeignKey(Post, related_name="images", on_delete=models.CASCADE)
    file = models.ImageField(upload_to="post_images")

    def __str__(self) -> str:
        return str(self.post) + " " + str(self.file)
