import './App.css';
import TodoList from './components/TodoList';
import UpdateList from './components/UpdateList';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, updateTasks] = useState([]);
  const apiUrl = 'https://bodnar-lab-5.onrender.com/products';

  // 1. Отримання списку товарів з MongoDB
  const fetchTasks = async () => {
    try {
      const res = await axios.get(apiUrl); // Цей рядок обов'язковий
      updateTasks(res.data);
    } catch (err) {
      console.error('Помилка завантаження товарів:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 2. Додавання товару (POST)
  const addTask = async (newTaskData) => {
    try {
      const res = await axios.post(apiUrl, newTaskData);
      updateTasks((prev) => [...prev, res.data]);
    } catch (err) {
      console.error('Помилка додавання:', err);
    }
  };

  // 3. Видалення товару за _id (DELETE)
  const removeTask = async (idToRemove) => {
    try {
      await axios.delete(`${apiUrl}/${idToRemove}`);
      updateTasks((prev) => prev.filter(task => task._id !== idToRemove));
    } catch (err) {
      console.error('Помилка видалення:', err);
    }
  };

  // 4. Редагування товару за _id (PUT)
  const editTask = async (idToEdit, updatedTaskData) => {
    try {
      const res = await axios.put(`${apiUrl}/${idToEdit}`, updatedTaskData);
      updateTasks((prev) => prev.map(task => task._id === idToEdit ? res.data : task));
    } catch (err) {
      console.error('Помилка редагування:', err);
    }
  };

  return (
    <div className='container'>
      <h2>Мій список товарів (MongoDB)</h2>
      <UpdateList onAddTask={addTask} />
      <TodoList tasks={tasks} onDelete={removeTask} onEdit={editTask} />
    </div>
  );
}

export default App;
