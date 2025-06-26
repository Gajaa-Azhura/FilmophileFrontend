import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import Login from '../pages/Login';
import Register from '../pages/Register';
import logo from '../assets/logo.png';
import '../css/Navbar.css';

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const userName = localStorage.getItem('name') || 'Guest';

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
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {localStorage.getItem('token') ? (
          <li className="profile-item">
            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="profile-btn">
              {userName} ▼
            </button>
            {isProfileOpen && (
              <div className="profile-dropdown">
                <Link to="/profile" onClick={() => setIsProfileOpen(false)}>Profile</Link>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            )}
          </li>
        ) : (
          <>
            <li><button onClick={openLogin} className="auth-btn">Login</button></li>
            <li><button onClick={openRegister} className="auth-btn">Register</button></li>
          </>
        )}
      </ul>
      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <Login onClose={() => setIsLoginOpen(false)} onOpenRegister={openRegister} />
      </Modal>
      <Modal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)}>
        <Register onClose={() => setIsRegisterOpen(false)} />
      </Modal>
    </nav>
  );
};

export default Navbar;