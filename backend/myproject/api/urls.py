from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CourseViewSet,
    dashboard_stats,
    register,
    login,
    me,
    trainer_courses,
    quiz_list_create,
    quiz_detail,
    add_question,
    submit_quiz,
    quiz_attempts_for_trainer,
)

router = DefaultRouter()
router.register(r'courses', CourseViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', register),
    path('auth/login/', login),
    path('auth/me/', me),
    path('dashboard/', dashboard_stats),
    path('trainer/courses/', trainer_courses),
    path('quizzes/', quiz_list_create),
    path('quizzes/<int:pk>/', quiz_detail),
    path('quizzes/<int:pk>/questions/', add_question),
    path('quizzes/<int:pk>/submit/', submit_quiz),
    path('trainer/attempts/', quiz_attempts_for_trainer),
]
