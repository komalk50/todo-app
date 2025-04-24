import React from "react";

function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
          {todo.task}
          <button onClick={() => onToggle(todo.id)}>✓</button>
          <button onClick={() => onDelete(todo.id)}>🗑</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
