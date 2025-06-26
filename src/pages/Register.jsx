import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Register.css';
import logo from '../assets/logo.png';

const Register = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '', // for display/input
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim inputs
    const name = formData.name.trim();
    const email = formData.email.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;
    const role = 'user'; // default role for all users

    // Frontend validations
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Invalid email format');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', {
        username: name, // ✅ must match backend schema
        email,
        password,
        role, // hardcoded as 'user'
      });

      console.log('Registration response:', response.data);
      setError('Registration successful! Redirecting...');
      setTimeout(() => {
        onClose();
        navigate('/');
      }, 1000);
    } catch (err) {
      console.error('Registration error:', err);
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
        Already have an account?{' '}
        <span
          className="signin-link"
          style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => {
            if (onClose) onClose(); // Close modal and switch to login if needed
          }}
        >
          Sign in
        </span>
      </p>
    </div>
  );
};

export default Register;
