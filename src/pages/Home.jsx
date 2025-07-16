import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FilmCard from '../components/Filmcard';
import Film2 from '../assets/Film2.jpg'; // Assuming you have a Film2 image
import Film3 from '../assets/Film3.jpg'; // Assuming you have a Film3 image
import Film4 from '../assets/Film4.jpg'; // Assuming you have a Film4 image
import Film6 from '../assets/Film6.jpg'; // Assuming you have a Film6 image
import Film7 from '../assets/Film7.jpg'; // Assuming you have a Film7 image
import Film8 from '../assets/Film8.jpg'; // Assuming you have a Film8 image
import '../css/Home.css';
import logo from '../assets/logo.png';
const Home = () => {
  const [featuredFilms, setFeaturedFilms] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Dummy carousel films for Home page
  useEffect(() => {
    const dummyFeatured = [
 
      {
        id: '2',
        title: 'Naangalum Rowdy dhann',
        poster: Film2,
      },
      {
        id: '3',
        title: 'ThevarMagans',
        poster: Film3,
      },
      {
        id: '4',
        title: 'UKI vaazhkai',
        poster: Film4,
      },
      // Removed film with undefined Film10
      {
        id: '6',
        title: 'Moodar Koodam',
        poster: Film6,
      },
      {
        id: '7',
        title: 'Kadatpaarai',
        poster: Film7,
      },
      {
        id: '8',
        title: 'Naan Kadavul',
        poster: Film8,
      },
      // Removed film with undefined Film9
    ];
    setFeaturedFilms(dummyFeatured);
  }, []);

  // Carousel CSS injection (should be after the above useEffect)
  useEffect(() => {
    if (!document.head.querySelector('style[data-carousel]')) {
      const style = document.createElement('style');
      style.innerHTML = `
        .carousel-container {
          overflow-x: auto;
          white-space: nowrap;
          padding-bottom: 1rem;
        }
        .carousel {
          display: inline-block;
        }
        .carousel-item {
          display: inline-block;
          vertical-align: top;
        }
      `;
      style.setAttribute('data-carousel', 'true');
      document.head.appendChild(style);
    }
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
          <div className="carousel-container" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
            {featuredFilms.length > 0 ? (
              <Carousel featuredFilms={featuredFilms} navigate={navigate} />
            ) : (
              <p>No featured films available.</p>
            )}
          </div>

        </section>
      </main>
      <Footer />
    </div>
  );
}

// Simple Carousel component for horizontal scrolling
function Carousel({ featuredFilms, navigate }) {
  const [scrollIndex, setScrollIndex] = React.useState(0);
  const itemsToShow = 4; // Number of films visible at once

  // Auto-scroll effect
  React.useEffect(() => {
    if (featuredFilms.length <= itemsToShow) return;
    const interval = setInterval(() => {
      setScrollIndex((prev) => {
        if (prev >= featuredFilms.length - itemsToShow) {
          return 0; // Loop back to start
        }
        return prev + 1;
      });
    }, 2500); // Change slide every 2.5 seconds
    return () => clearInterval(interval);
  }, [featuredFilms, itemsToShow]);

  function handlePrev() {
    setScrollIndex((prev) => Math.max(prev - 1, 0));
  }

  function handleNext() {
    setScrollIndex((prev) => Math.min(prev + 1, featuredFilms.length - itemsToShow));
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <button
        onClick={handlePrev}
        disabled={scrollIndex === 0}
        style={{ fontSize: '2rem', background: 'none', border: 'none', cursor: scrollIndex === 0 ? 'not-allowed' : 'pointer', color: '#333', padding: '0 0.5rem' }}
        aria-label="Scroll left"
      >
        &#8592;
      </button>
      <div style={{ display: 'flex', overflow: 'hidden', flex: 1 }}>
        {featuredFilms.slice(scrollIndex, scrollIndex + itemsToShow).map((film) => (
          <div className="carousel-item" key={film.id} style={{ display: 'inline-block', margin: '0 1rem', textAlign: 'center', flex: '1 0 0' }}>
            <img
              src={film.poster}
              alt={film.title}
              style={{ width: '100%', maxWidth: '220px', height: '320px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.10)', cursor: 'pointer' }}
              onClick={() => navigate(`/films/${film.id}`)}
            />
            <div style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>{film.title}</div>
          </div>
        ))}
      </div>
      <button
        onClick={handleNext}
        disabled={scrollIndex >= featuredFilms.length - itemsToShow}
        style={{ fontSize: '2rem', background: 'none', border: 'none', cursor: scrollIndex >= featuredFilms.length - itemsToShow ? 'not-allowed' : 'pointer', color: '#333', padding: '0 0.5rem' }}
        aria-label="Scroll right"
      >
        &#8594;
      </button>
    </div>
  );
}

export default Home;