from django.http import response
from django.shortcuts import render
from django.http.response import HttpResponse
from .serializers import ExerciseSerializer

from rest_framework import serializers, views, response, status, exceptions

from .models import Exercise_group

# Create your views here.


def index(request):
    list = Exercise_group.objects.all()
    context = {'exercise_groups': list}
    return render(request, 'exercise_groups/index.html', context)


class ExerciseGroupListView(views.APIView):
    def get(self, request):
        exercise_groups = Exercise_group.objects.all()
        serialized_exercise_groups = ExerciseSerializer(
            exercise_groups, many=True, context={'request', request}
        )
        return response.Response(serialized_exercise_groups.data, status=status.HTTP_200_OK)

    def post(self, request):
        print(request.data)
        exercise_group_to_add = ExerciseSerializer(data=request.data)
        if exercise_group_to_add.is_valid():
            exercise_group_to_add.save()
            return response.Response(exercise_group_to_add.data, status=status.HTTP_201_CREATED)

        return response.Response(
            exercise_group_to_add.errors, status=status.HTTP_400_BAD_REQUEST
        )
