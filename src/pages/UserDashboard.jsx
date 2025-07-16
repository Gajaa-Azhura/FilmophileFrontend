
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Film2 from '../assets/film2.jpg';
import Film3 from '../assets/film3.jpg';
import Film4 from '../assets/film4.jpg';
import Film6 from '../assets/film6.jpg';
import Film7 from '../assets/film7.jpg';
import Film8 from '../assets/film8.jpg';
import Film9 from '../assets/film9.jpg';
import '../css/UserDashboard.css';

const UserDashboard = () => {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const dummyFilms = [
      { id: '2', title: 'Naangalum Rowdy dhann', poster: Film2 },
      { id: '3', title: 'ThevarMagans', poster: Film3 },
      { id: '4', title: 'UKI vaazhkai', poster: Film4 },
      // Removed film with undefined Film10
      { id: '6', title: 'Moodar Koodam', poster: Film6 },
      { id: '7', title: 'Kadatpaarai', poster: Film7 },
      { id: '8', title: 'Naan Kadavul', poster: Film8 },
      { id: '9', title: 'Maazhai pozhudhu', poster: Film9 },
    ];
    const fetchFilms = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/films', {
          headers: { Authorization: `Bearer ${token}` },
        });
        let backendFilms = response.data || [];
        // Merge backend films with dummy films, avoiding duplicates by title
        const merged = [...backendFilms];
        dummyFilms.forEach(df => {
          if (!backendFilms.some(bf => bf.title === df.title)) {
            merged.push(df);
          }
        });
        setFilms(merged);
      } catch (err) {
        setFilms(dummyFilms);
        setError('Failed to fetch films. Showing featured films instead.');
      }
    };
    fetchFilms();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  // Carousel logic for small cards
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef(null);
  const visibleCount = 4; // Number of cards visible at once
  const autoScrollInterval = 2500; // ms

  useEffect(() => {
    if (films.length <= visibleCount) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % films.length);
    }, autoScrollInterval);
    return () => clearInterval(interval);
  }, [films, visibleCount]);

  const getVisibleFilms = () => {
    if (films.length <= visibleCount) return films;
    let start = carouselIndex;
    let end = start + visibleCount;
    if (end <= films.length) {
      return films.slice(start, end);
    } else {
      // Wrap around
      return films.slice(start).concat(films.slice(0, end - films.length));
    }
  };

  // Carousel logic for big posters
  const [bigPosterIndex, setBigPosterIndex] = useState(0);
  const bigPosterVisibleCount = 1; // Show 1 big poster at a time
  const bigPosterInterval = 5000; // ms

  useEffect(() => {
    if (films.length <= bigPosterVisibleCount) return;
    const interval = setInterval(() => {
      setBigPosterIndex((prev) => (prev + 1) % films.length);
    }, bigPosterInterval);
    return () => clearInterval(interval);
  }, [films, bigPosterVisibleCount]);

  return (
    <div className="user-dashboard">
      <Navbar />
      <main className="dashboard-content">
        <h2>Welcome, User!</h2>
        <div className="dashboard-actions">
          {/* <button onClick={handleLogout} className="logout-btn">Logout</button> */}
        </div>

        {/* Big Poster Banner Carousel */}
        <div
          className="big-poster-banner"
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem',
            marginBottom: 36,
            flexWrap: 'wrap',
            minHeight: 380,
            overflow: 'hidden',
          }}
        >
          {films.length > 0 &&
            (() => {
              // Always show bigPosterVisibleCount films, wrapping around
              let arr = [];
              for (let i = 0; i < bigPosterVisibleCount; i++) {
                const idx = (bigPosterIndex + i) % films.length;
                const film = films[idx];
                arr.push(
                  <div
                    key={`${film.id || idx}-big`}
                    style={{
                      background: '#181818',
                      borderRadius: 18,
                      width: '100%',
                      maxWidth: 900,
                      aspectRatio: '16/7',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                      margin: 0,
                      padding: 0,
                      overflow: 'hidden',
                      position: 'relative',
                      cursor: 'pointer',
                    }}
                    onClick={() => navigate('/watch')}
                  >
                    <img
                      src={film.poster || '/assets/logo.png'}
                      alt={film.title}
                      onError={e => { e.currentTarget.src = '/assets/logo.png'; }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 18,
                        boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
                      }}
                    />
                    <span
                      style={{
                        color: '#fff',
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: 28,
                        fontWeight: 700,
                        letterSpacing: 0.5,
                        background: 'rgba(0,0,0,0.7)',
                        width: '100%',
                        textAlign: 'center',
                        padding: '18px 0',
                        borderBottomLeftRadius: 18,
                        borderBottomRightRadius: 18,
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                      }}
                      title={film.title}
                    >
                      {film.title}
                    </span>
                  </div>
                );
              }
              return arr;
            })()}
        </div>

        {/* Section heading for carousel */}
        <h3
          style={{
            color: '#E0CD67',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: 1.2,
            margin: '0 0 18px 0',
            textAlign: 'center',
            textTransform: 'uppercase',
            textShadow: '0 2px 8px rgba(0,0,0,0.18)',
          }}
        >
          Upcoming Films
        </h3>
        {/* Carousel of small cards */}
        <div
          className="film-carousel"
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1.5rem',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
            minHeight: 180,
            marginBottom: 24,
            width: '100%',
            overflow: 'hidden',
          }}
          ref={carouselRef}
        >
          {films.length > 0 ? (
            getVisibleFilms().map((film, idx) => (
              <div
                key={`${film.id || idx}-small`}
                style={{
                  background: '#232323',
                  borderRadius: 12,
                  width: 150,
                  height: 150,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                  margin: '0',
                  padding: 8,
                  cursor: 'pointer',
                  transition: 'box-shadow 0.3s',
                }}
                onClick={() => navigate('/watch')}
              >
                <img
                  src={film.poster || '/assets/logo.png'}
                  alt={film.title}
                  onError={e => { e.currentTarget.src = '/assets/logo.png'; }}
                  style={{
                    width: 110,
                    height: 110,
                    objectFit: 'cover',
                    borderRadius: 8,
                    marginBottom: 6,
                  }}
                />
                <span
                  style={{
                    color: '#fff',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: 0.2,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: 90,
                    textAlign: 'center',
                  }}
                  title={film.title}
                >
                  {film.title}
                </span>
              </div>
            ))
          ) : (
            <p style={{ color: '#cccccc', padding: '1rem' }}>No films available.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboard;