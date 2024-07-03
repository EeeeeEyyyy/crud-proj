// pages/users/[id].js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const UserDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Accessing the id parameter from the URL

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      fetchUser(id);
    }
  }, [id]);

  const fetchUser = async (id) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h1>User Detail</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Website:</strong> {user.website}</p>
    </div>
  );
};

export default UserDetail;
