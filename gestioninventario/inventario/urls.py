from django.urls import path
from .views import render

urlpatterns = [
    path(route="",view=render,name="")
]
