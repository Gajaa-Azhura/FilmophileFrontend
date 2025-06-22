import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { auth, googleProvider, githubProvider } from '../firebase';
import googleIcon from '../assets/google.png';
import githubIcon from '../assets/github.png';
import '../css/Login.css';
import logo from '../assets/logo.png';

const Login = ({ onClose, onOpenRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password) return 'All fields are required';
    if (!/^\S+@\S+\.\S+$/.test(email)) return 'Invalid email format';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password }, { timeout: 10000 });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      setError('Login successful! Redirecting...');
      setTimeout(() => {
        onClose();
        navigate('/user-dashboard');
      }, 1000);
    } catch (err) {
      console.error('Login Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = result.user.accessToken;
      const response = await axios.post('http://localhost:3000/api/auth/google', { token });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      setError('Login successful with Google! Redirecting...');
      setTimeout(() => {
        onClose();
        navigate('/user-dashboard');
      }, 1000);
    } catch (err) {
      console.error('Google Login Error:', err.message);
      setError('Google login failed. Please try again.');
    }
  };

  const handleGithubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const token = result.user.accessToken;
      const response = await axios.post('http://localhost:3000/api/auth/github', { token });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      setError('Login successful with GitHub! Redirecting...');
      setTimeout(() => {
        onClose();
        navigate('/user-dashboard');
      }, 1000);
    } catch (err) {
      console.error('GitHub Login Error:', err.message);
      setError('GitHub login failed. Please try again.');
    }
  };

  return (
    <div className="login-card">
      <img src={logo} alt="Filmophobia Logo" className="login-logo" />
      <h2>Sign In to Filmophobia</h2>
      {error && <div className="error-message">{error}</div>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email Address"
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="submit-btn">Sign In</button>
      </form>
      <div className="social-login">
        <button type="button" className="social-btn google-btn" onClick={handleGoogleLogin}>
          <img src={googleIcon} alt="Google Icon" className="social-icon" /> Sign in with Google
        </button>
        <button type="button" className="social-btn github-btn" onClick={handleGithubLogin}>
          <img src={githubIcon} alt="GitHub Icon" className="social-icon" /> Sign in with GitHub
        </button>
      </div>
      <p className="register-link">
        Don’t have an account? <Link to="#" onClick={onOpenRegister}>Create one</Link>
      </p>
    </div>
  );
};

export default Login;