package com.backend.backcrud.Models;

import java.util.HashSet;
import java.util.Set;

public class TodoListModel {
    private Long id;
    private String name;
    private Set<TodoModel> items = new HashSet<>();

    public TodoListModel(){
        super();
    }
    public TodoListModel(Long id, String name, Set<TodoModel> items) {
        this.id = id;
        this.name = name;
        this.items = items;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<TodoModel> getItems() {
        return items;
    }

    public void setItems(Set<TodoModel> items) {
        this.items = items;
    }
}
