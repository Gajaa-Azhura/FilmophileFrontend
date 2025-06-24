import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FilmCard from '../components/Filmcard';
import '../css/UserDashboard.css';

const UserDashboard = () => {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/films', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFilms(response.data);
      } catch (err) {
        setError('Failed to fetch films. Please try again.');
      }
    };
    fetchFilms();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="user-dashboard">
      <Navbar />
      <main className="dashboard-content">
        <h2>Welcome, User!</h2>
        {error && <p className="error">{error}</p>}
        <div className="dashboard-actions">
          {/* <button onClick={handleLogout} className="logout-btn">Logout</button> */}
        </div>
        <div className="film-grid">
          {films.length > 0 ? (
            films.map((film) => (
              <FilmCard
                key={film.id}
                id={film.id}
                title={film.title}
                poster={film.poster || 'https://via.placeholder.com/150'}
              />
            ))
          ) : (
            <p>No films available.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboard;