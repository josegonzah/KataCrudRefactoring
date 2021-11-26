package com.backend.backcrud.Services;

import java.util.Comparator;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import com.backend.backcrud.Models.NotFoundIdException;
import com.backend.backcrud.Models.Todo;
import com.backend.backcrud.Models.TodoList;
import com.backend.backcrud.Models.TodoBusinessException;
import com.backend.backcrud.Models.TodoListModel;
import com.backend.backcrud.Models.TodoModel;
import com.backend.backcrud.Repositories.TodoListRepository;
import com.backend.backcrud.Repositories.TodoRespository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TodoListService {
    
    private static final String NO_FOUND_ID = "No existe el id de la lista";
    private TodoListRepository todoListRepository;
    private TodoRespository todoRespository;

    @Autowired
    public TodoListService(TodoListRepository todoListRepository, TodoRespository todoRespository){
        this.todoListRepository = todoListRepository;
        this.todoRespository = todoRespository;
    }

    public Set<TodoModel> getTodosByListId(Long id){
        return todoListRepository.findById(id)
                .orElseThrow(() -> new NotFoundIdException(NO_FOUND_ID))
                .getToDos().stream()
                .map(item -> new TodoModel(item.getId(), item.getName(), item.isCompleted(), id))
                .collect(Collectors.toSet());
    }

    public TodoModel addNewTodoByListId(Long listId, TodoModel todoModel){
        var listToDo = todoListRepository.findById(listId)
                .orElseThrow(() -> new NotFoundIdException(NO_FOUND_ID));
        var todo = new Todo();

        todo.setCompleted(todoModel.isCompleted());
        todo.setName(Objects.requireNonNull(todoModel.getName()));
        todo.setId(todoModel.getId());

        if(todo.getName().isEmpty() || todo.getName().length() < 3){
            throw new TodoBusinessException("El todo agregar no es valido papu");
        }

        //addition new to-do
        listToDo.getToDos().add(todo);

        var listUpdated = todoListRepository.save(listToDo);
        //last item
        var lastToDo = listUpdated.getToDos()
                .stream()
                .max(Comparator.comparingInt(item -> item.getId().intValue()))
                .orElseThrow();
        todoModel.setId(lastToDo.getId());
        todoModel.setListId(listId);
        return todoModel;
    }

    public TodoModel updateATodoByListId(Long listId, TodoModel todoModel){
        var listToDo = todoListRepository.findById(listId)
                    .orElseThrow(() -> new NotFoundIdException(NO_FOUND_ID));

        //edit to-do
        for(var item : listToDo.getToDos()){
            if(item.getId().equals(todoModel.getId())){
                item.setCompleted(todoModel.isCompleted());
                item.setName(Objects.requireNonNull(todoModel.getName()));
                item.setId(Objects.requireNonNull(todoModel.getId()));
            }
        }

        todoListRepository.save(listToDo);

        return todoModel;
    }

    public TodoListModel updateATodoListById(Long listId, TodoListModel todoListModel){
        var listTodo = todoListRepository.findById(listId)
                    .orElseThrow(() -> new NotFoundIdException(NO_FOUND_ID));
        
        listTodo.setName(todoListModel.getName());
        todoListRepository.save(listTodo);
        
        return todoListModel;           
    }

    public TodoListModel newListTodo(TodoListModel todoListModel){
        var listToDo = new TodoList();
        listToDo.setName(Objects.requireNonNull(todoListModel.getName()));
        if(listToDo.getName().isEmpty() || listToDo.getName().length() < 3){
            throw new TodoBusinessException("La lista que quieres crear no es valida papu");
        }
        var id = todoListRepository.save(listToDo).getId();
        todoListModel.setId(id);
        return todoListModel;
    }

    public Set<TodoListModel> getAllListTodos(){
        return StreamSupport
        .stream(todoListRepository.findAll().spliterator(), false)
        .map(toDoList -> {
            var listDto = toDoList.getToDos()
                    .stream()
                    .map(item -> new TodoModel(item.getId(), item.getName(), item.isCompleted(), toDoList.getId()))
                    .collect(Collectors.toSet());
            return new TodoListModel(toDoList.getId(), toDoList.getName(), listDto);
        })
        .collect(Collectors.toSet());
    }

    public void deleteListById(Long listId){
        var listToDo = todoListRepository.findById(listId)
                .orElseThrow(() -> new NotFoundIdException(NO_FOUND_ID));
        todoListRepository.delete(listToDo);
    }

    public void deleteAToDoById(Long id) {
        var toDo = todoRespository.findById(id).orElseThrow();
        todoRespository.delete(toDo);
    }

}
