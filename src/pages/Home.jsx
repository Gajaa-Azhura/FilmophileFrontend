import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FilmCard from '../components/Filmcard';
import '../css/Home.css';
import logo from '../assets/logo.png';
const Home = () => {
  const [featuredFilms, setFeaturedFilms] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedFilms = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/films', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeaturedFilms(response.data);
      } catch (err) {
        setError('Failed to fetch featured films. Please try again.');
      }
    };
    fetchFeaturedFilms();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="home">
      <Navbar />
      <main className="home-content">
        <section className="hero">
          <h1>Welcome to Filmophile</h1>
          <p>Discover a world of local films and short masterpieces. Explore, watch, and share your cinematic journey.</p>
          {localStorage.getItem('token') && (
            <div className="dashboard-actions">
              {/* <button onClick={handleLogout} className="logout-btn">Logout</button> */}
            </div>
          )}
        </section>
        <section className="featured-films">
          <h2>Featured Films</h2>
          {error && <p className="error">{error}</p>}
          <div className="film-grid">
            {featuredFilms.length > 0 ? (
              featuredFilms.map((film) => (
                <FilmCard
                  key={film.id}
                  id={film.id}
                  title={film.title}
                  poster={film.poster || 'https://via.placeholder.com/150'}
                />
              ))
            ) : (
              <p>No featured films available.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;