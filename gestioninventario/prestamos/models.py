from django.db import models
from django.conf import settings
from datetime import datetime,timedelta
from inventario.models import Inventario

class Prestamo(models.Model):
    id_prestamo = models.BigIntegerField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.PROTECT)
    fecha_creacion = models.DateTimeField(default=datetime.now())
    entregado = models.BooleanField(default=False)
    fecha_plazo = models.DateTimeField(default=datetime.now()+timedelta(days=5))
    class Meta:
        db_table = "Prestamo"

class Prestamo_detalle(models.Model):
    id_prestamo_detalle = models.BigIntegerField(primary_key=True)
    id_inventario = models.ForeignKey(Inventario, on_delete=models.PROTECT)
    id_prestamo = models.ForeignKey(Prestamo,on_delete=models.PROTECT)
    class Meta:
        db_table = "Prestamo_detalle"