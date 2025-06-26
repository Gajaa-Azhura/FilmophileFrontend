import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { googleProvider, githubProvider } from '../firebase';
import googleIcon from '../assets/google.png';
import githubIcon from '../assets/github.png';
import '../css/Login.css';
import logo from '../assets/logo.png';

const Login = ({ onClose, onOpenRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // For error messages
  const [success, setSuccess] = useState(''); // New state for success messages
  const navigate = useNavigate();
  const auth = getAuth();

  const validateForm = () => {
    console.log('Validating form with:', { email, password });
    if (!email || !password) {
      console.log('Validation failed: All fields are required');
      return 'All fields are required';
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      console.log('Validation failed: Invalid email format');
      return 'Invalid email format';
    }
    return '';
  };

// Handle general login
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Login form submitted with:', { email, password });
  const validationError = validateForm();
  if (validationError) {
    console.log('Login validation error:', validationError);
    setError(validationError);
    setSuccess(''); // Clear success on validation error
    return;
  }
  try {
    const response = await axios.post('/api/auth/login', {
      email,
      password,
    });
    console.log('Login response received:', response.data);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('role', response.data.user.role);
    localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data
    setSuccess('Login successful! Redirecting to home...'); // Set success message
    setError(''); // Clear error
    setTimeout(() => {
      onClose();
      navigate('/');
    }, 1000);
  } catch (err) {
    console.error('Login Error Details:', {
      message: err.message,
      response: err.response?.data,
      status: err.response?.status,
    });
    if (err.response?.data) {
      console.log('Full server response:', JSON.stringify(err.response.data, null, 2));
    }
    setError(err.response?.data?.message || 'Login failed. Please try again.');
    setSuccess(''); // Clear success on error
  }
};

// Google
const handleGoogleLogin = async () => {
  try {
    console.log('Initiating Google login');
    const provider = googleProvider;
    const result = await signInWithPopup(auth, provider);
    const token = result.user.accessToken; // Note: Should use getIdToken() for server-side validation
    console.log('Google login token obtained:', token);
    const response = await axios.post('http://localhost:5000/api/auth/google', { token });
    console.log('Google login response:', response.data);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('role', response.data.role);
    localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data
    setSuccess('Login successful with Google! Redirecting to home...'); // Set success message
    setError(''); // Clear error
    setTimeout(() => {
      onClose();
      navigate('/');
    }, 1000);
  } catch (err) {
    console.error('Google Login Error:', {
      message: err.message,
      code: err.code,
    });
    setError('Google login failed. Please try again.');
    setSuccess(''); // Clear success on error
  }
};

const handleGithubLogin = async () => {
  try {
    console.log('Initiating GitHub login');
    const provider = githubProvider;
    const result = await signInWithPopup(auth, provider);
    const token = result.user.accessToken;
    console.log('GitHub login token obtained:', token);
    const response = await axios.post('http://localhost:5001/api/auth/github', { token });
    console.log('GitHub login response:', response.data);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('role', response.data.role);
    localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data
    setSuccess('Login successful with GitHub! Redirecting to home...'); // Set success message
    setError(''); // Clear error
    setTimeout(() => {
      onClose();
      navigate('/');
    }, 1000);
  } catch (err) {
    console.error('GitHub Login Error:', {
      message: err.message,
      code: err.code,
    });
    setError('GitHub login failed. Please try again.');
    setSuccess(''); // Clear success on error
  }
};

return (
  <div className="login-card">
    <img src={logo} alt="Filmophile Logo" className="login-logo" />
    <h2 className="login-title">Sign In to Filmophile</h2>
    {(error || success) && (
      <div className={error ? 'error-message' : 'success-message'}>
        {error || success}
      </div>
    )}
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