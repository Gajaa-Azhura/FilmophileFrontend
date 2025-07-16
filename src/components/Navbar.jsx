import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ErrorBoundary from './ErrorBoundary';
import logo from '../assets/logo.png';
import '../css/Navbar.css';
// import watch from '../pages/Watch'

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  // Get user info and role from localStorage
  const userObj = localStorage.getItem('user');
  let user = null;
  try {
    user = userObj ? JSON.parse(userObj) : null;
  } catch (e) {
    // If parsing fails, clear the invalid value
    localStorage.removeItem('user');
    user = null;
  }
  const userRole = localStorage.getItem('role') || (user && user.role) || 'user';
  const userName = user?.name || user?.username || 'Guest';

  // Determine profile link based on role
  let profileLink = '/profile';
  if (userRole === 'admin') {
    profileLink = '/admin-profile';
  } else if (userRole === 'provider') {
    profileLink = '/art-provider-profile';
  } else {
    profileLink = '/profile';
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    setIsProfileOpen(false);
    navigate('/');
  };

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const openRegister = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img src={logo} alt="Filmophile Logo" className="navbar-logo" />
        </Link>
      </div>
      <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </button>
   <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Search films..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-btn">🔍</button>
      </form>
      <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
        {localStorage.getItem('token') ? (
          <>
            <li>
              <Link to="/films" className="hover:text-yellow-400">Films</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li className="profile-item">
              <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="profile-btn">
                <span style={{
                  display: 'inline-block',
                  marginLeft: 8,
                  padding: '2px 8px',
                  background: '#E0CD67',
                  color: '#1B1B1B',
                  borderRadius: '12px',
                  fontSize: '0.95em',
                  fontWeight: 500,
                  textTransform: 'capitalize',
                  letterSpacing: '0.5px',
                  verticalAlign: 'middle'
                }}>{userRole}</span>
                <span style={{ marginLeft: 6 }}>▼</span>
              </button>
              {isProfileOpen && (
                <div className="profile-dropdown">
                  <Link to={profileLink} onClick={() => setIsProfileOpen(false)}>Profile</Link>
                  <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
              )}
            </li>
          </>
        ) : (
          <>
            <li><button onClick={openLogin} className="auth-btn">Login</button></li>
            <li><button onClick={openRegister} className="auth-btn">Register</button></li>
          </>
        )}
      </ul>
      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <ErrorBoundary>
          <Login onClose={() => setIsLoginOpen(false)} onOpenRegister={openRegister} />
        </ErrorBoundary>
      </Modal>
      <Modal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)}>
        <Register onClose={() => setIsRegisterOpen(false)} />
      </Modal>
    </nav>
  );
};

export default Navbar;