package com.example.todolist.service;

import com.example.todolist.model.Todo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class TodoService {
    private final List<Todo> todos = new ArrayList<>();
    private final AtomicLong counter = new AtomicLong();

    public List<Todo> getAllTodos() {
        return todos;
    }

    public Todo addTodo(String task) {
        Todo todo = new Todo(counter.incrementAndGet(), task, false);
        todos.add(todo);
        return todo;
    }

    public Todo toggleTodoCompletion(Long id) {
        Todo todo = todos.stream()
                .filter(t -> t.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Todo not found"));
        todo.setCompleted(!todo.isCompleted());
        return todo;
    }
}
