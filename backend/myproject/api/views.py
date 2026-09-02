import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io
import base64
import random

from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import User
from django.db import IntegrityError
from django.shortcuts import get_object_or_404

from .models import Course, Profile, Quiz, Question, QuizAttempt
from .serializers import (
    CourseSerializer, UserSerializer, QuizSerializer,
    QuestionSerializer, QuizAttemptSerializer
)

# ---------- Helper to render matplotlib chart as base64 ----------
def render_chart(fig):
    buf = io.BytesIO()
    fig.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    img_b64 = base64.b64encode(buf.getvalue()).decode('utf-8')
    plt.close(fig)
    return img_b64

# ---------- Authentication Views ----------
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email', '')
    role = request.data.get('role', 'trainee')

    if role not in ['trainee', 'trainer']:
        return Response({'error': 'Invalid role. Allowed: trainee, trainer.'}, status=status.HTTP_400_BAD_REQUEST)

    if not username or not password:
        return Response({'error': 'Username and password required'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.create_user(username=username, email=email, password=password)
        Profile.objects.create(user=user, role=role)
    except IntegrityError:
        return Response({'error': 'Profile creation failed'}, status=status.HTTP_400_BAD_REQUEST)

    refresh = RefreshToken.for_user(user)
    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'role': role
        }
    }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if not username or not password:
        return Response({'error': 'Username and password required'}, status=status.HTTP_400_BAD_REQUEST)

    from django.contrib.auth import authenticate
    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    refresh = RefreshToken.for_user(user)
    try:
        role = user.profile.role
    except Profile.DoesNotExist:
        role = 'trainee'

    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'role': role
        }
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    user = request.user
    try:
        role = user.profile.role
    except Profile.DoesNotExist:
        role = 'trainee'
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'role': role
    })

# ---------- Dashboard ----------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):
    user = request.user
    try:
        role = user.profile.role
    except Profile.DoesNotExist:
        return Response({'error': 'User profile missing'}, status=status.HTTP_400_BAD_REQUEST)

    data = {}

    if role == 'admin':
        total_courses = Course.objects.count()
        total_users = User.objects.count()
        total_enrollments = sum(c.enrolled_students.count() for c in Course.objects.all())
        instructors = User.objects.filter(profile__role='trainer')
        course_counts = [Course.objects.filter(instructor=inst).count() for inst in instructors]
        fig, ax = plt.subplots(figsize=(8, 4))
        ax.bar([inst.username for inst in instructors], course_counts, color='#007bff')
        ax.set_title('Courses per Trainer')
        ax.set_xlabel('Trainer')
        ax.set_ylabel('Number of Courses')
        chart = render_chart(fig)
        data = {
            'total_courses': total_courses,
            'total_users': total_users,
            'total_enrollments': total_enrollments,
            'chart': chart
        }

    elif role == 'trainer':
        my_courses = Course.objects.filter(instructor=user)
        student_counts = [c.enrolled_students.count() for c in my_courses]
        fig, ax = plt.subplots(figsize=(8, 4))
        ax.bar([c.title for c in my_courses], student_counts, color='#28a745')
        ax.set_title('Students per Course')
        ax.set_xlabel('Course')
        ax.set_ylabel('Students')
        chart = render_chart(fig)
        data = {
            'my_courses': len(my_courses),
            'total_students': sum(student_counts),
            'chart': chart
        }

    elif role == 'trainee':
        enrolled = user.enrolled_courses.all()
        # Placeholder progress – replace with real Progress model later
        progress = [random.randint(0, 100) for _ in enrolled]
        fig, ax = plt.subplots(figsize=(8, 4))
        ax.bar([c.title for c in enrolled], progress, color='#ffc107')
        ax.set_title('Your Progress')
        ax.set_xlabel('Course')
        ax.set_ylabel('Progress %')
        chart = render_chart(fig)
        data = {
            'enrolled_count': enrolled.count(),
            'chart': chart
        }
    else:
        return Response({'error': 'Invalid role'}, status=status.HTTP_400_BAD_REQUEST)

    return Response(data)

# ---------- Trainer Courses ----------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def trainer_courses(request):
    user = request.user
    if user.profile.role != 'trainer':
        return Response({'error': 'Only trainers can access this'}, status=status.HTTP_403_FORBIDDEN)
    courses = Course.objects.filter(instructor=user)
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

# ---------- Quiz Endpoints ----------
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def quiz_list_create(request):
    if request.method == 'GET':
        quizzes = Quiz.objects.all()
        serializer = QuizSerializer(quizzes, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        # Only trainers/admins can create
        if request.user.profile.role not in ['trainer', 'admin']:
            return Response({'error': 'Only trainers can create quizzes'}, status=status.HTTP_403_FORBIDDEN)

        # Create quiz
        serializer = QuizSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        quiz = serializer.save(created_by=request.user)

        # If questions are provided in the request, create them
        questions_data = request.data.get('questions', [])
        for q_data in questions_data:
            Question.objects.create(
                quiz=quiz,
                text=q_data.get('text'),
                option_a=q_data.get('option_a'),
                option_b=q_data.get('option_b'),
                option_c=q_data.get('option_c'),
                option_d=q_data.get('option_d'),
                correct_option=q_data.get('correct_option', 'A')
            )

        # Return the full quiz with questions
        return Response(QuizSerializer(quiz).data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def quiz_detail(request, pk):
    quiz = get_object_or_404(Quiz, pk=pk)

    # Permissions for PUT/DELETE: only creator or admin
    if request.method in ['PUT', 'DELETE']:
        if request.user != quiz.created_by and request.user.profile.role != 'admin':
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'GET':
        serializer = QuizSerializer(quiz)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = QuizSerializer(quiz, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        quiz.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_question(request, pk):
    quiz = get_object_or_404(Quiz, pk=pk)
    # Only creator (trainer/admin) can add questions
    if request.user != quiz.created_by and request.user.profile.role != 'admin':
        return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

    serializer = QuestionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(quiz=quiz)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_quiz(request, pk):
    quiz = get_object_or_404(Quiz, pk=pk)
    answers = request.data.get('answers', [])  # list of selected indices (0-3)
    questions = quiz.questions.all()
    if len(answers) != len(questions):
        return Response({'error': 'Invalid answers count'}, status=status.HTTP_400_BAD_REQUEST)

    score = 0
    results = []
    answers_dict = {}
    for i, q in enumerate(questions):
        user_choice = answers[i]  # index
        correct = (user_choice == ['A','B','C','D'].index(q.correct_option))
        if correct:
            score += 1
        results.append({
            'question_id': q.id,
            'user_choice': user_choice,
            'correct': correct,
        })
        answers_dict[str(q.id)] = user_choice
    total = len(questions)

    # Save attempt
    attempt = QuizAttempt.objects.create(
        user=request.user,
        quiz=quiz,
        score=score,
        total=total,
        answers=answers_dict
    )

    return Response({
        'score': score,
        'total': total,
        'results': results,
        'attempt_id': attempt.id
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def quiz_attempts_for_trainer(request):
    # Get all attempts for quizzes created by the trainer
    user = request.user
    if user.profile.role not in ['trainer', 'admin']:
        return Response({'error': 'Only trainers can view attempts'}, status=status.HTTP_403_FORBIDDEN)
    quizzes = Quiz.objects.filter(created_by=user)
    attempts = QuizAttempt.objects.filter(quiz__in=quizzes).order_by('-completed_at')
    serializer = QuizAttemptSerializer(attempts, many=True)
    return Response(serializer.data)

# ---------- Course CRUD (ViewSet) ----------
class IsTrainerOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return True
        if not request.user.is_authenticated:
            return False
        try:
            role = request.user.profile.role
        except Profile.DoesNotExist:
            return False
        return role in ['trainer', 'admin']

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsTrainerOrAdmin]

    def perform_create(self, serializer):
        user = self.request.user
        try:
            role = user.profile.role
        except Profile.DoesNotExist:
            raise PermissionDenied("User profile missing")

        if role == 'trainer':
            serializer.save(instructor=user)
        elif role == 'admin':
            instructor_id = self.request.data.get('instructor')
            if instructor_id:
                try:
                    instructor = User.objects.get(id=instructor_id, profile__role='trainer')
                except User.DoesNotExist:
                    raise PermissionDenied("Invalid trainer ID")
                serializer.save(instructor=instructor)
            else:
                serializer.save(instructor=user)
        else:
            raise PermissionDenied("Only trainers and admins can create courses")
