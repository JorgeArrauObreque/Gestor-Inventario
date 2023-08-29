from django.db import models


#este es solo un modelo de ejemplo, no refleja un modelo real
# este hereda de models.Model
class Inventario(models.Model):
    id_inventario = models.AutoField(primary_key=True) #este campo refleja un campo autoincremental que a la vez es la clave primaria
    nombre_inventario = models.CharField(default="sin nombre") # campo de texto, el max_length refleja el largo de la misma, el valor default como llama su nombre, es el valor por defecto en caso de no recibir nada
    fecha_creacion = models.DateTimeField() #campo de fecha con el formato dd-MM-yyyy hh_mm_ss 
    codigo_barra = models.IntegerField(default=0)  #campo de un numero entero
    


