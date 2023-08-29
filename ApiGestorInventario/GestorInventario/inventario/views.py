from django.shortcuts import render
#importamos el decorador api_view para definir los métodos que se aceptan en dicho método
from rest_framework.decorators import api_view
# importar response para retornar al cliente el resultado de la petición
from rest_framework.response import Response
# status es la lista de status en django rest framework para los códigos de respuesta http
from rest_framework import status
#ejemplo de Petición GET (obtener datos)



@api_view(["GET"])
def get_inventario(request):
    #Tareas a realizar....
    
    # Esta funcion debe devolver los datos junto el status de la petición como el código 200 ok, 
    # Si fuera error por ejemplo seria el 404 not found, hay muchos codigos para diferentes necesidades
    # status es un parametro de response para avisar que resultado tuvo la peticion
    # content type es para definir el formato de retorno
    # data es en donde se almacenara los datos de regreso como una lista de inventario de la base de datos.

    return Response(status=status.HTTP_200_OK,content_type="application/json",data={})

#ejemplo de petición POST (crear registro)
@api_view(["POST"])
def create_activo(request):

    #obtener los datos del cuerpo de la petición por ejemplo del activo
    nombre_activo = request.data.get('nombre_activo')
    return Response(status=status.HTTP_201_CREATED, content_type="application/json",data={"message":"Activo creado correctamente"})

#ejemplo de petición PUT (Actualizar registro)
@api_view(["PUT"])
def create_activo(request):

    #obtener los datos del cuerpo de la petición por ejemplo del activo
    nombre_activo = request.data.get('nombre_activo')
    return Response(status=status.HTTP_201_CREATED, content_type="application/json",data={"message":"Activo creado correctamente"})

#ejemplo de peticion DELETE (tal como su nombre lo sugiere, es eliminar registro)
@api_view(["DELETE"])
def update_activo(request):
    
    return Response(status=status.HTTP_200_OK,data={"message":"Activo Eliminado correctamente"},content_type="application/json")

