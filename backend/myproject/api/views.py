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

from .models import Course, Profile
from .serializers import CourseSerializer, UserSerializer


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

    # Restrict role to trainee or trainer only
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
        role = 'trainee'  # fallback

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


# ---------- Dashboard (role‑based charts) ----------
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
        progress = [random.randint(0, 100) for _ in enrolled]  # placeholder – add real progress model later
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


# ---------- Course CRUD with permissions ----------
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
