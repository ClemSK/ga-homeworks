from django.db import models


class Exercise_group(models.Model):
    # name of group e.g. Chest
    name = models.CharField(max_length=50)
    # exercises = []

    # display in admin site
    def __str__(self):
        return self.name
