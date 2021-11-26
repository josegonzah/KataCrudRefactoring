package com.backend.backcrud.Repositories;

import com.backend.backcrud.Models.Todo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRespository extends CrudRepository<Todo, Long>{
    
}
