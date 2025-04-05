import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // اضافه کردن useNavigate

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();  // استفاده از useNavigate برای هدایت به صفحه دیگر

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/login', formData);
      // Store the JWT token in localStorage
      localStorage.setItem('token', data.token);
      navigate('/dashboard');  // استفاده از navigate برای هدایت به داشبورد
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
