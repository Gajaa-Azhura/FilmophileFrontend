import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../css/FilmList.css';

const SearchResults = () => {
  const [films, setFilms] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query) {
      axios.get(`http://localhost:5000/api/films/search?query=${encodeURIComponent(query)}`)
        .then(res => setFilms(res.data))
        .catch(() => setFilms([]));
    }
  }, [query]);

  return (
    <div className="films-list">
      <Navbar />
      <h2>Search Results for "{query}"</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2.5rem 3.5rem',
        margin: '2.5rem 0',
        padding: '0 2.5rem',
      }}>
        {films.map(film => (
          <div
            key={film._id || film.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: '#111',
              border: '1px solid #222',
              borderRadius: '18px',
              boxShadow: '0 2px 18px rgba(0,0,0,0.18)',
              padding: '1.5rem',
              minHeight: 480,
              minWidth: 380,
              maxWidth: 500,
              width: '100%',
              margin: '0 left',
              position: 'left',
              transition: 'box-shadow 0.2s',
            }}
          >
            <div
              style={{
                width: 340,
                height: 420,
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 18px rgba(30,215,96,0.13)',
                position: 'relative',
                cursor: 'pointer',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'flex-end',
              }}
              onClick={() => navigate(`/films/${film._id || film.id}`)}
            >
              <img
                src={film.poster || '/assets/logo.png'}
                alt={film.title + ' poster'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  filter: 'brightness(0.97) saturate(1.1)',
                  transition: 'transform 0.35s cubic-bezier(.4,2,.3,1), filter 0.2s',
                  willChange: 'transform, filter',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'scale(1.08)';
                  e.currentTarget.style.filter = 'brightness(1.12) saturate(1.25)';
                  e.currentTarget.style.zIndex = 2;
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.filter = 'brightness(0.97) saturate(1.1)';
                  e.currentTarget.style.zIndex = 1;
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.1) 100%)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 22,
                  padding: '16px 14px 10px 14px',
                  borderBottomLeftRadius: '16px',
                  borderBottomRightRadius: '16px',
                  textShadow: '0 2px 8px rgba(0,0,0,0.18)',
                  letterSpacing: 0.5,
                  textAlign: 'left',
                  pointerEvents: 'none',
                  zIndex: 3,
                }}
              >
                {film.title}
              </span>
            </div>
            <div style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ cursor: 'pointer', width: '100%' }} onClick={() => navigate(`/films/${film._id || film.id}`)}>
                <div style={{ marginTop: '0.5rem', color: '#e0e0e0', fontSize: '1.08rem' }}>{film.description || 'No description available.'}</div>
                <div style={{ marginTop: '0.5rem', fontSize: '1rem', color: '#bfa76a' }}>
                  <span>Year: {film.year || 'N/A'}</span>
                  {film.genre && <span style={{ marginLeft: '1rem' }}>Genre: {film.genre}</span>}
                </div>
              </div>
              <button
                style={{ marginTop: '1.2rem', padding: '0.7rem 1.6rem', background: '#bfa76a', color: '#222', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.08rem', alignSelf: 'flex-end', boxShadow: '0 2px 8px rgba(191,167,106,0.13)' }}
                onClick={() => navigate(`/watch`)}
              >
                Watch
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;