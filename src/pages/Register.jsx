import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Register.css';
import logo from '../assets/logo.png'; // Assuming you have a logo image

const Register = ({ onClose, onOpenLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Registration form submitted with:', formData);
    if (!formData.name || !formData.email || !formData.password) {
      console.log('Registration validation failed: All fields are required');
      setError('All fields are required');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      console.log('Registration validation failed: Invalid email format');
      setError('Invalid email format');
      return;
    }
    try {
      console.log('Sending registration request to http://localhost:3000/api/auth/register');
      const response = await axios.post('http://localhost:3000/api/auth/register', formData, { timeout: 10000 });
      console.log('Registration response received:', response.data);
      setError('Registration successful! Redirecting to login...');
      setTimeout(() => {
        onClose();
        navigate('/login');
      }, 1000);
    } catch (err) {
      console.error('Registration Error Details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-card">
      <img src={logo} alt="Filmophobia Logo" className="register-logo" />
      <h2 className="register-title">Create an Account</h2>
      {error && <div className="error-message">{error}</div>}
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Your password"
          />
        </div>
        <button type="submit" className="submit-btn">Register</button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="#" onClick={onOpenLogin}>Sign in</Link>
      </p>
    </div>
  );
};

export default Register;