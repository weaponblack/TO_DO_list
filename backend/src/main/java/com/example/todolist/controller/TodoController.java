package com.example.todolist.controller;

import com.example.todolist.model.Todo;
import com.example.todolist.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping
    public List<Todo> getAllTodos() {
        return todoService.getAllTodos();
    }

    @PostMapping
    public Todo addTodo(@RequestParam String task) {
        return todoService.addTodo(task);
    }

    @PutMapping("/{id}/toggle")
    public Todo toggleTodoCompletion(@PathVariable Long id) {
        return todoService.toggleTodoCompletion(id);
    }
}