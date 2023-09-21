from django.db import models
from datetime import datetime

class Usuario(models.Model):
    id_alumno = models.BigAutoField(primary_key=True)
    rut_alumno = models.CharField(max_length=15)
    fecha_creacion = models.DateTimeField(default=datetime.now())
    fecha_actualizacion = models.DateTimeField(default=datetime.now())
    nombres = models.CharField(max_length=70)
    apellidos = models.CharField(max_length=70)
    estado = models.CharField(max_length=30)
    carrera = models.CharField(max_length=70)
    genero = models.CharField(max_length=20)
    class Meta:
        db_table = "Usuarios"


