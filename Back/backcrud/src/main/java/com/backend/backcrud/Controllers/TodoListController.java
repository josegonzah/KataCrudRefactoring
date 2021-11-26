package com.backend.backcrud.Controllers;

import com.backend.backcrud.Models.NotFoundIdException;
import com.backend.backcrud.Models.TodoListModel;
import com.backend.backcrud.Models.TodoModel;
import com.backend.backcrud.Services.TodoListService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TodoListController {
    private TodoListService toDoListService;

    @Autowired
    public TodoListController(TodoListService toDoListService) {
        this.toDoListService = toDoListService;
    }

    @GetMapping(value = "api/list")
    public Iterable<TodoListModel> getAllListToDos(){
        return toDoListService.getAllListTodos();
    }

    @GetMapping(value = "api/{listId}/todos")
    public Iterable<TodoModel> getToDosByListId(@PathVariable("listId") Long listId){
        return toDoListService.getTodosByListId(listId);
    }

    @PostMapping(value = "api/todolist")
    public TodoListModel newListToDo(@RequestBody TodoListModel todo){
        return toDoListService.newListTodo(todo);
    }

    @DeleteMapping(value = "api/{id}/todolist")
    public void deleteListById(@PathVariable("id") Long id){
         toDoListService.deleteListById(id);
    }

    @PutMapping(value = "api/{listId}/todo")
    public TodoModel updateAToDoByListId(@PathVariable("listId") Long listId, @RequestBody TodoModel todo){
        if(todo.getId() != null){
            return toDoListService.updateATodoByListId(listId, todo);
        }
        throw new NotFoundIdException("No existe el id para actualizar");
    }

    @PostMapping(value = "api/{listId}/todo")
    public TodoModel addNewToDoByListId(@PathVariable("listId") Long listId, @RequestBody TodoModel todo){
        return toDoListService.addNewTodoByListId(listId, todo);
    }

    @DeleteMapping(value = "api/{id}/todo")
    public void deleteAToDoById(@PathVariable("id")Long id){
        toDoListService.deleteAToDoById(id);
    }
}
