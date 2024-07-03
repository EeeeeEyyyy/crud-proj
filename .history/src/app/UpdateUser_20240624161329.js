import React, { useState } from 'react';

const UpdateUser = ({ user, updateUser }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(user.id, { name, email });
  };

  return (
    <div>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" style="  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  align-items:flex-start;">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUser;
