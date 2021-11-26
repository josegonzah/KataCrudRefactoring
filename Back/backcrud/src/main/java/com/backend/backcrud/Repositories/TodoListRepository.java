package com.backend.backcrud.Repositories;

import com.backend.backcrud.Models.Todo;
import com.backend.backcrud.Models.TodoList;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoListRepository extends CrudRepository<TodoList, Long>{
    Iterable<Todo> findAllTodoById(Long id);
}
