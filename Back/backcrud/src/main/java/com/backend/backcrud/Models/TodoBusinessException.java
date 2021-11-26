package com.backend.backcrud.Models;

public class TodoBusinessException extends RuntimeException{
    public TodoBusinessException(String message){
        super(message);
    }
}
