from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Course, Profile, Quiz, Question, QuizAttempt

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

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'text', 'option_a', 'option_b', 'option_c', 'option_d']

class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    question_count = serializers.IntegerField(source='questions.count', read_only=True)
    created_by_username = serializers.CharField(source='created_by.username', read_only=True)
    course_title = serializers.CharField(source='course.title', read_only=True)
    class Meta:
        model = Quiz
        fields = ['id', 'title', 'description', 'course', 'course_title', 'created_by', 'created_by_username',
                  'created_at', 'questions', 'question_count']
        read_only_fields = ['created_by']

class QuizAttemptSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)
    quiz_title = serializers.CharField(source='quiz.title', read_only=True)
    class Meta:
        model = QuizAttempt
        fields = ['id', 'user', 'user_username', 'quiz', 'quiz_title', 'score', 'total', 'answers', 'completed_at']
        read_only_fields = ['user', 'completed_at']
