import axios from "axios";

const API = "http://localhost:5000";

export const getTodos = () => axios.get(`${API}/todos`);
export const addTodo = (task) => axios.post(`${API}/todos`, { task });
export const toggleTodo = (id) => axios.put(`${API}/todos/${id}`);
export const deleteTodo = (id) => axios.delete(`${API}/todos/${id}`);
