"use client"

import React, { useEffect, useState } from 'react';
import ListUsers from './ListUsers';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';
import Modal from './Modal';
import styles from './page.module.css'; // Import your CSS for styling page

const Page = () => {
  const [users, setUsers] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = async (user) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      setUsers([...users, data]);
      setCreateModalOpen(false);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const updateUser = async (id, updatedUser) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      const data = await response.json();
      setUsers(users.map((user) => (user.id === id ? data : user)));
      setUpdateModalOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
      });
      setUsers(users.filter((user) => user.id !== id));
      setDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedUser(null);
    setUpdateModalOpen(false);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedUser(null);
    setDeleteModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <h1>User Management</h1>
      <button onClick={openCreateModal}>Add User</button>
      <ListUsers users={users} />
      <Modal isOpen={isCreateModalOpen} closeModal={closeCreateModal}>
        <CreateUser addUser={addUser} />
      </Modal>
      {users.map((user) => (
        <div key={user.id}>
          <button onClick={() => openUpdateModal(user)}>Update</button>
          <button onClick={() => openDeleteModal(user)}>Delete</button>
        </div>
      ))}
      <Modal isOpen={isUpdateModalOpen} closeModal={closeUpdateModal}>
        {selectedUser && <UpdateUser user={selectedUser} updateUser={updateUser} />}
      </Modal>
      <Modal isOpen={isDeleteModalOpen} closeModal={closeDeleteModal}>
        {selectedUser && <DeleteUser user={selectedUser} deleteUser={deleteUser} />}
      </Modal>
    </div>
  );
};

export default Page;
