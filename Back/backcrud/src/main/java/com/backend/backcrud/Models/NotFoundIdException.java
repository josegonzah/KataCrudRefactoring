package com.backend.backcrud.Models;

public class NotFoundIdException extends RuntimeException{
    public NotFoundIdException(String message){
        super(message);
    }
}
