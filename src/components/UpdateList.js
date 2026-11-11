import React, { useState } from 'react';

function UpdateList({ onAddTask }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && price !== '') {
      onAddTask({ name: name.trim(), price: Number(price) });
      setName('');
      setPrice('');
    }
  };

  return (
    <form className="update-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Назва товару"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Ціна ($)"
      />
      <button type="submit">Додати</button>
    </form>
  );
}

export default UpdateList;