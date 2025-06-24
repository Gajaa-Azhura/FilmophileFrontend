import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Register.css';
import logo from '../assets/logo.png';

const Register = ({ onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Registration form submitted with:', formData);
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      console.log('Validation failed: All fields are required');
      setError('All fields are required');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      console.log('Validation failed: Invalid email format');
      setError('Invalid email format');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      console.log('Validation failed: Passwords do not match');
      setError('Passwords do not match');
      return;
    }
    try {
      console.log('Sending registration request to http://localhost:5000/api/auth/register');
      const response = await axios.post('http://localhost:3000/api/auth/register', formData, { timeout: 10000 });
      console.log('Registration response received:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      setError('Registration and login successful! Redirecting to home...');
      setTimeout(() => {
        onClose();
        navigate('/');
      }, 1000);
    } catch (err) {
      console.error('Registration Error Details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      if (err.response?.data) {
        console.log('Full server response:', JSON.stringify(err.response.data, null, 2));
      }
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-card">
      <img src={logo} alt="Filmophile Logo" className="register-logo" />
      <h2 className="register-title">Create an Account</h2>
      {error && (
        <div className={error.includes('successful') ? 'success-message' : 'error-message'}>
          {error}
        </div>
      )}
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm your password"
          />
        </div>
        <button type="submit" className="submit-btn">Register</button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};

export default Register;