from django.urls import path
from . import views

urlpatterns = [
    path('start-session/', views.StartSession.as_view()),
    path('collect-meta/', views.CollectMeta.as_view()),
    path('collect-scenes/', views.CollectScenes.as_view()),
    path('preview/', views.RenderPreview.as_view()),
    path('confirm/', views.Confirm.as_view()),
] 