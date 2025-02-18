// src/components/TodoList.tsx
import React, { useEffect, useState } from "react";
import { getTodos, addTodo, toggleTodo } from "../services/todoService";

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async (): Promise<void> => {
    try {
      const data: Todo[] = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      const todo: Todo = await addTodo(newTask);
      setTodos([...todos, todo]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleToggle = async (id: number): Promise<void> => {
    try {
      const updatedTodo: Todo = await toggleTodo(id);
      setTodos(
        todos.map((todo) =>
          todo.id === id ? updatedTodo : todo
        )
      );
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nueva tarea"
        />
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
            onClick={() => handleToggle(todo.id)}
          >
            {todo.task}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
