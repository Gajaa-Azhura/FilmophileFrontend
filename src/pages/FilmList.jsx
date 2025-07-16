import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Film2 from '../assets/film2.jpg'; // Example image import, replace with actual image paths
import Film3 from '../assets/film3.jpg'; // Example image import, replace with actual
import Film4 from '../assets/film4.jpg'; // Example image import, replace with actual image paths
import Film6 from '../assets/film6.jpg'; // Example image import, replace with actual image paths
import Film7 from '../assets/film7.jpg'; // Example image import, replace with actual
import Film8 from '../assets/film8.jpg'; // Example image import, replace with actual image paths
import Film9 from '../assets/film9.jpg'; // Example image import, replace with actual image paths
import '../css/FilmList.css'; // Assuming you have a CSS file for styling

const FilmsList = () => {
  const [films, setFilms] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const navigate = useNavigate();

  // Dummy film data for immediate frontend testing
  useEffect(() => {
    const dummyFilms = [
      {
        id: '2',
        title: 'Naangalum Rowdy dhann',
        description: 'A fun-filled action comedy with a twist. Follow a group of unlikely heroes as they stumble into a world of chaos and laughter. Their misadventures will keep you on the edge of your seat and leave you smiling.',
        year: 2021,
        director: 'B. Raj',
        genre: 'Action/Comedy',
        poster: Film2,
      },
      {
        id: '3',
        title: 'ThevarMagans',
        description: 'A tale of legacy and family honor. In a village torn by tradition and ambition, one family must choose between the past and the future. Loyalty, sacrifice, and love are put to the ultimate test.',
        year: 2020,
        director: 'C. Mani',
        genre: 'Family/Drama',
        poster: Film3,
      },
      {
        id: '4',
        title: 'UKI vaazhkai',
        description: 'A journey through the ups and downs of life. This coming-of-age drama explores the dreams and struggles of a young artist. Every setback is a lesson, and every triumph is a step toward self-discovery.',
        year: 2025,
        director: 'D. Kumar',
        genre: 'Drama',
        poster: Film4,
      },
      {
        id: '6',
        title: 'Moodar Koodam',
        description: 'A dark comedy that explores the absurdities of life. Four misfits find themselves in a series of bizarre situations, challenging their beliefs and friendships. Expect laughter, surprises, and a touch of madness.',
        year: 2019,
        director: 'F. Selvan',
        genre: 'Comedy/Drama',
        poster: Film6,
      },
      {
        id: '7',
        title: 'Kadatpaarai',
        description: 'A rural drama about tradition and change. As the old ways clash with new ideas, a community must decide what to preserve and what to let go. The story is rich with emotion, humor, and hope.',
        year: 2018,
        director: 'G. Muthu',
        genre: 'Drama',
        poster: Film7,
      },
      {
        id: '8',
        title: 'Naan Kadavul',
        description: 'A powerful story of faith and fate. When destiny brings together strangers from different worlds, their lives intertwine in miraculous ways. Belief, courage, and destiny shape their paths.',
        year: 2017,
        director: 'H. Bala',
        genre: 'Drama',
        poster: Film8,
      },
      {
        id: '9',
        title: 'Maazhai pozhudhu',
        description: 'A poetic tale of love and rain. In a city where every raindrop tells a story, two hearts find each other against all odds. Their romance is as fleeting and beautiful as a summer storm.',
        year: 2016,
        director: 'I. Ravi',
        genre: 'Romance',
        poster: Film9,
      },
    ];
    axios.get('http://localhost:5000/api/films')
      .then(res => {
        const backendFilms = res.data || [];
        // Merge backend films with dummy films, avoiding duplicates by title
        const merged = [...backendFilms];
        dummyFilms.forEach(df => {
          if (!backendFilms.some(bf => bf.title === df.title)) {
            merged.push(df);
          }
        });
        setFilms(merged);
      })
      .catch(() => setFilms(dummyFilms));
  }, []);

  const isAdmin = localStorage.getItem('role') === 'admin';

  // Handler to delete a film
  const handleDelete = (filmId) => {
    if (window.confirm('Are you sure you want to delete this film?')) {
      const token = localStorage.getItem('token');
      axios.delete(`http://localhost:5000/api/films/${filmId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(() => {
          setFilms(films.filter(f => (f._id || f.id) !== filmId));
          setMessage("Film deleted successfully.");
          setMessageType("success");
        })
        .catch(() => {
          setMessage("Failed to delete film.");
          setMessageType("error");
        });
    }
  };

  // Handler to reject a film (set status to 'declined')
  const handleReject = (filmId) => {
    if (window.confirm('Are you sure you want to reject this film?')) {
      axios.put(`http://localhost:5000/api/films/${filmId}`, { status: 'declined' })
        .then(() => {
          setFilms(films.filter(f => (f._id || f.id) !== filmId));
          setMessage("Film rejected successfully.");
          setMessageType("success");
        })
        .catch(() => {
          setMessage("Failed to reject film.");
          setMessageType("error");
        });
    }
  };

  // Auto-clear message after 3 seconds
  React.useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <>
      <div className="films-list" style={{ minHeight: '100vh', background: '#181818', overflowX: 'hidden' }}>
        {message && (
          <div style={{
            background: messageType === 'success' ? '#4caf50' : '#ff4444',
            color: '#fff',
            padding: '1rem 2rem',
            borderRadius: '8px',
            textAlign: 'center',
            margin: '1.5rem auto 0.5rem auto',
            maxWidth: 600,
            fontWeight: 600,
            fontSize: '1.1rem',
            boxShadow: '0 2px 12px rgba(0,0,0,0.13)',
          }}>
            {message}
          </div>
        )}
        <h2 style={{ color: '#fff', textAlign: 'center', marginTop: '2rem' }}>All Films</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(340px, 1fr))',
          gap: '2.5rem 3.5rem',
          margin: '2.5rem 0',
          padding: '0 2.5rem',
          boxSizing: 'border-box',
          width: '100%',
          overflowX: 'hidden',
          justifyItems: 'center',
        }}>
          {films.map(film => (
          <div
            key={film._id || film.id}
            className="film-card"
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
                src={film.thumbnailUrl || film.poster || '/assets/logo.png'}
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
              {isAdmin && (film._id || film.id) && (
                <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: '0.5rem', zIndex: 10 }}>
                  <button
                    style={{ background: '#ff4444', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.4rem 0.9rem', cursor: 'pointer', fontWeight: 'bold' }}
                    onClick={e => { e.stopPropagation(); handleDelete(film._id || film.id); }}
                  >Delete</button>
                 
                </div>
              )}
            </div>
            <div style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ cursor: 'pointer', width: '100%' }} onClick={() => navigate(`/films/${film._id || film.id}`)}>
                {/* Title removed here, only description and details below */}
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
      <div style={{ position: 'absolute', top: 56, left: 24, zIndex: 20 }}>
        <button
          style={{
            padding: '0.8rem 2.2rem',
            background: '#bfa76a',
            color: '#222',
            border: 'none',
            borderRadius: '7px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1.13rem',
            boxShadow: '0 2px 8px rgba(191,167,106,0.13)'
          }}
          onClick={() => {
            const role = localStorage.getItem('role');
            if (role === 'admin') navigate('/admin-dashboard');
            else if (role === 'provider') navigate('/art-provider-dashboard');
            else navigate('/user-dashboard');
          }}
        >
          Back
        </button>
      </div>
    </>
  );
}

export default FilmsList;