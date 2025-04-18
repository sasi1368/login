import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }

    const fetchUserData = async () => {
      try {
        const { data } = await axios.get('/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(data);
        setFormData({ name: data.name, email: data.email });
      } catch (error) {
        console.error('Error fetching user data:', error);
        setMessage('Failed to load user data.');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    // اگر هیچ تغییری در فرم داده نشده، درخواست ارسال نشود
    if (formData.name === user.name && formData.email === user.email && formData.password === '') {
      setMessage('No changes detected.');
      return;
    }

    try {
      const { data } = await axios.put('/api/users/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(data.message || 'Profile updated successfully!');
      setUser({ ...user, ...formData });
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile.');
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="New Password (leave blank to keep current)"
        />
        <button type="submit">Update Profile</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Profile;
