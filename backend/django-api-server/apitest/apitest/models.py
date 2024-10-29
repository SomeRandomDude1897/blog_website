from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_delete
from django.dispatch import receiver


class UserData(models.Model):
    user_origin = models.OneToOneField(
        User, related_name="data", on_delete=models.CASCADE
    )
    profile_pic = models.ImageField(upload_to="profile_images/", blank=True, null=True)
    bio = models.CharField(max_length=1000, blank=True)

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


class PostComment(models.Model):
    post = models.ForeignKey(Post, related_name="comments", on_delete=models.CASCADE)
    author = models.ForeignKey(User, related_name="comments", on_delete=models.CASCADE)
    content = models.CharField(max_length=10000, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return (
            str(self.post)
            + " : "
            + (
                str(self.content)[:20]
                if len(str(self.content)) > 20
                else str(self.content)
            )
        )


class CommentImage(models.Model):
    comment = models.ForeignKey(
        PostComment, related_name="images", on_delete=models.CASCADE
    )
    file = models.ImageField(upload_to="comment_images")

    def __str__(self) -> str:
        return str(self.comment) + " " + str(self.file)


# чтобы чистить данные диска при удалении связанных записей


@receiver(post_delete, sender=CommentImage)
@receiver(post_delete, sender=PostImage)
def delete_file_on_object_delete(sender, instance, **kwargs):
    if instance.file:
        instance.file.delete(False)


@receiver(post_delete, sender=UserData)
def delete_file_on_object_delete(sender, instance, **kwargs):
    if instance.profile_pic:
        instance.profile_pic.delete(False)
