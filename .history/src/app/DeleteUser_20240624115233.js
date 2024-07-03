import React from 'react';

const DeleteUser = ({ user, deleteUser }) => {

  const handleDelete = () => {
    deleteUser(user.id);
  };

  return (
    <div>
      <h2>Delete User</h2>
      <p>{user.name} - {user.email}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteUser;
