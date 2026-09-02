from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Course, Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['role', 'bio', 'avatar']

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile']

class CourseSerializer(serializers.ModelSerializer):
    instructor_name = serializers.CharField(source='instructor.username', read_only=True)
    enrolled_count = serializers.IntegerField(source='enrolled_students.count', read_only=True)
    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'instructor', 'instructor_name',
                  'duration', 'price', 'created_at', 'enrolled_students', 'enrolled_count']
        read_only_fields = ['instructor', 'created_at']
