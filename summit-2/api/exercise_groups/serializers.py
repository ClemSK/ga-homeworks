from rest_framework import serializers
from .models import Exercise_group


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise_group
        fields = "__all__"
        depth = 1
