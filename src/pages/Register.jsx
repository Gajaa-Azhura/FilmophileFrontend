import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Register.css';
import logo from '../assets/logo.png';
const Register = ({ onClose, onOpenLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Invalid email format');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', formData, { timeout: 10000 });
      setError('Registration successful! Redirecting to login...');
      setTimeout(() => {
        onClose();
        navigate('/login'); // This will now open the login modal via Navbar state
      }, 1000);
    } catch (err) {
      console.error('Register Error:', err.response?.data || err.message);
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