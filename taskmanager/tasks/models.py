from django.db import models

# Create your models here.

class Task(models.Model):
    taskName = models.CharField(max_length=100)
    taskDescription = models.TextField()

    def __str__(self):
        return self.taskName
