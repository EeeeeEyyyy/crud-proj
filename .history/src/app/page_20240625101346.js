"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const Page = () => {
  const [users, setUsers] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUser = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        newUser
      );
      setUsers([...users, response.data]);
      setCreateModalOpen(false);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const updateUser = async (id) => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        selectedUser
      );
      setUsers(users.map((user) => (user.id === id ? response.data : user)));
      setUpdateModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const openCreateModal = () => {
    setNewUser({ name: "", email: "" });
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

  const handleGoToHome = () => {
    router.push("/");
  };

  return (
    <div className="container">
      <h1>User Management</h1>
      <div className="Add-me">
        <button
          onClick={openCreateModal}
          className="glassButton-add"
          id="add-n"
        >
          {" "}
          Add User
        </button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} <br /> {user.email}
            <div className="buttones">
              {" "}
              <button
                onClick={() => openUpdateModal(user)}
                className="glassButton"
                id="update-n"
              >
                {" "}
                Update
              </button>
              <button
                onClick={() => openDeleteModal(user)}
                className="glassButton"
                id="delete-n"
              >
                {" "}
                <Image
                  src="rubbish-bin-svgrepo-com.svg" // Adjust the path to your image
                  alt="Delete Icon"
                  width={16}
                  height={16}
                  style={{ marginRight: "5px" }}
                />
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isCreateModalOpen && (
        <div className="modalOverlay">
          <div className="modal">
            <h2>Add User</h2>
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <div className="update-b">
              <button onClick={addUser} className="glassButton" id="add-n">
                Add
              </button>
            </div>
            <button onClick={closeCreateModal} className="closeButton">
              Close
            </button>
          </div>
        </div>
      )}
      {isUpdateModalOpen && selectedUser && (
        <div className="modalOverlay">
          <div className="modal">
            <h2>Update User</h2>
            <input
              type="text"
              placeholder="Name"
              value={selectedUser.name}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              value={selectedUser.email}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, email: e.target.value })
              }
            />
            <div className="update-b">
              <button
                onClick={() => updateUser(selectedUser.id)}
                className="glassButton"
                id="update-g"
              >
                Update
              </button>
            </div>
            <button onClick={closeUpdateModal} className="closeButton">
              Close
            </button>
          </div>
        </div>
      )}
      {isDeleteModalOpen && selectedUser && (
        <div className="modalOverlay">
          <div className="modal">
            <h2>Are you sure you want to delete {selectedUser.name}?</h2>
            <div className="yes-b">
              <button
                onClick={() => deleteUser(selectedUser.id)}
                className="glassButton"
              >
                Yes
              </button>
            </div>
            <button onClick={closeDeleteModal} className="closeButton">
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Page;
