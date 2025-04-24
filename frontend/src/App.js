import React, { useEffect, useState } from "react";
import AddTodo from "../AddTodo";
import TodoList from "../TodoList";
import {
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
} from "./api";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);
  const fetchTodos = async () => {
    const response = await getTodos();
    setTodos(response.data);
  };

  const handleAddTodo = async (task) => {
    await addTodo(task);
    fetchTodos();
  };

  const handleToggleTodo = async (id) => {
    await toggleTodo(id);
    fetchTodos();
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>My Todo App</h1>
      <AddTodo onAdd={handleAddTodo} />
      <TodoList
        todos={todos}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
      />
    </div>
  );
}

export default App;
