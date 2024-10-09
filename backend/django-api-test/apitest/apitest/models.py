from django.db import models


class User(models.Model):
    username = models.CharField(max_length=200)
    password = models.CharField(max_length=100)
    profile_pic = models.ImageField(upload_to="profile_images/")
    bio = models.CharField(max_length=1000)

    def __str__(self) -> str:
        return self.username


class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    postname = models.CharField(max_length=200)
    content = models.CharField(max_length=10000)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.postname


class PostImage(models.Model):
    post = models.ForeignKey(Post, related_name="images", on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    file = models.ImageField(upload_to="post_images")

    def __str__(self) -> str:
        return self.title
