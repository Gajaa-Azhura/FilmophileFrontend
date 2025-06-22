import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import Login from '../pages/Login';
import Register from '../pages/Register';
import logo from '../assets/logo.png';
import '../css/Navbar.css';

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/';
  };

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const openRegister = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img src={logo} alt="Filmophobia Logo" className="navbar-logo" />
        </Link>
      </div>
      <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </button>
      <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {localStorage.getItem('token') ? (
          <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
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
        <Register onClose={() => setIsRegisterOpen(false)} onOpenLogin={openLogin} />
      </Modal>
    </nav>
  );
};

export default Navbar;