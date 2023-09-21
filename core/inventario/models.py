from django.db import models
import datetime
from django.conf import settings
from django.db import models

class Bodega(models.Model):
    id_bodega = models.AutoField(primary_key=True)
    direccion = models.CharField(max_length=200)
    fecha_creacion = models.DateTimeField(default=datetime.datetime.now())
    fecha_actualizacion = models.DateTimeField(default=datetime.datetime.now())
    class Meta:
        db_table = "Bodega"

class Inventario(models.Model):
    id_inventario = models.BigAutoField(primary_key=True)
    producto = models.ForeignKey("Producto",on_delete=models.PROTECT,db_column="id_producto")
    fecha_creacion = models.DateTimeField(default=datetime.datetime.now())
    fecha_actualizacion = models.DateTimeField(default=datetime.datetime.now())
    bodega = models.ForeignKey(Bodega,on_delete=models.PROTECT,db_column="")
    estado_inventario = models.ForeignKey("Inventario_estado",on_delete=models.PROTECT,db_column="id_estado_inventario")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    class Meta:
        db_table = "Inventario"

class Inventario_estado(models.Model):
    id_estado_inventario = models.AutoField(primary_key=True)
    nombre_estado_inventario = models.CharField(max_length=50)
    class Meta:
        db_table = "Inventario_estado"

class Producto(models.Model):
    id_producto = models.AutoField(primary_key=True)
    nombre_producto = models.CharField(max_length=50)
    fecha_creacion = models.DateTimeField(default=datetime.datetime.now())
    fecha_actualizacion = models.DateTimeField(default=datetime.datetime.now())
    proveedor = models.ForeignKey("Proveedor",on_delete=models.PROTECT,db_column="id_proveedor")
    marca = models.CharField(max_length=90)
    descripcion = models.CharField(max_length=300)
    categoria = models.ForeignKey("Categoria",on_delete=models.PROTECT,db_column="id_categoria")
    tipo_producto = models.ForeignKey("Tipo_producto",on_delete=models.PROTECT,db_column="id_tipo_producto")
    class Meta:
        db_table = "Producto"

class Proveedor(models.Model):
    id_proveedor = models.AutoField(primary_key=True)
    nombre_proveedor = models.CharField(max_length=50)
    correo = models.CharField(max_length=90)
    telefono = models.CharField(max_length=15)
    fecha_creacion = models.DateTimeField(default=datetime.datetime.now())
    fecha_actualizacion = models.DateTimeField(default=datetime.datetime.now())
    class Meta:
        db_table = "Proveedor"


class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    nombre_categoria = models.CharField(max_length=50)
    fecha_creacion = models.DateTimeField(default=datetime.datetime.now())
    fecha_actualizacion = models.DateTimeField(default=datetime.datetime.now())
    class Meta:
        db_table = "Categoria"

class Tipo_producto(models.Model):
    id_tipo_producto = models.AutoField(primary_key=True)
    nombre_tipo_producto = models.CharField(max_length=30)
    class Meta:
        db_table = "Tipo_producto"

class Historico_movimiento(models.Model):
    id_movimiento = models.BigAutoField(primary_key=True)
    tipo_movimiento = models.ForeignKey("Movimiento_tipo",on_delete=models.PROTECT,db_column="id_tipo_movimiento")
    id_inventario = models.ForeignKey(Inventario,on_delete=models.PROTECT,db_column="id_inventario")
    comentarios = models.CharField(max_length=150)
    fecha_creacion = models.DateTimeField(default=datetime.datetime.now())
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT )
    class Meta:
        db_table = "Historico_movimiento"

class Movimiento_tipo(models.Model):
    id_tipo_movimiento = models.AutoField(primary_key=True)
    nombre_tipo_movimiento = models.CharField(max_length=50)
    fecha_creacion = models.DateTimeField(default=datetime.datetime.now())
    class Meta:
        db_table = "Movimiento_tipo"