// src/services/todoService.ts

export interface Todo {
    id: number;
    task: string;
    completed: boolean;
  }
  
  const API_URL = "http://localhost:8080/api/todos";
  
  export const getTodos = async (): Promise<Todo[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener los todos");
    }
    return response.json();
  };
  
  export const addTodo = async (task: string): Promise<Todo> => {
    const response = await fetch(`${API_URL}?task=${encodeURIComponent(task)}`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("Error al agregar el todo");
    }
    return response.json();
  };
  
  export const toggleTodo = async (id: number): Promise<Todo> => {
    const response = await fetch(`${API_URL}/${id}/toggle`, {
      method: "PUT",
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el todo");
    }
    return response.json();
  };
  