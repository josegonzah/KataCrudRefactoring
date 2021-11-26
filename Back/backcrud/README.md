todo -> tareas de una lista
todolist -> es la lista detareas

## visualizar todas las listas de las tareas
get 'http://localhost:8080/api/list'

## visualizar las tareas de una lista
get 'http://localhost:8080/api/{Idlista}/todos'

## crear una nueva lista de tareas
post 'http://localhost:8080/api/todolist'
{
	"name" : "Nombre de la lista"
}
-Retorna un json con la lista con las tareas, nombre y ID.

## crear una tarea en una lista
post 'http://localhost:8080/api/{Idlista}/todo'
{
	"name": "nombre de la tarea"
}
-retorna un json con el id de la tarea, id de la lista, nombre de la tarea y completado por defecto false

## Actualizar una tarea de una lista
Put 'http://localhost:8080/api/{Idlista}/todo'
{
	"id": "Id de la tarea",
	"name": "nombre de la tarea",
	"completed" : "true or false"
}
-retorna un json con la tarea actualizada


## Eliminar una lista de tareas
delete 'http://localhost:8080/api/{Idlista}/todolist'

## Eliminar una tarea de una lista
delete 'http://localhost:8080/api/{Idlista}/todo'
