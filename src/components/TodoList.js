import React, { useState } from 'react';

function TodoItem({ task, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(task.name);
  const [price, setPrice] = useState(task.price);

  const handleSave = () => {
    onEdit(task._id, { name, price: Number(price) });
    setIsEditing(false);
  };

  return (
    <li className="task-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button className="btn-save" onClick={handleSave}>Зберегти</button>
          <button onClick={() => setIsEditing(false)}>Скасувати</button>
        </>
      ) : (
        <>
          <span><strong>{task.name}</strong> — {task.price}$</span>
          <button className="btn-edit" onClick={() => setIsEditing(true)}>Редагувати</button>
          <button className="btn-delete" onClick={() => onDelete(task._id)}>Видалити</button>
        </>
      )}
    </li>
  );
}

function TodoList({ tasks = [], onDelete, onEdit }) {
  return (
    <div>
      <ul className='task-list'>
        {tasks.map((task) => (
          <TodoItem 
            key={task._id} 
            task={task} 
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;