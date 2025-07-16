import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Film2 from '../assets/film2.jpg';
import Film3 from '../assets/film3.jpg';
import Film4 from '../assets/film4.jpg';
import Film6 from '../assets/film6.jpg';
import Film7 from '../assets/film7.jpg';
import Film8 from '../assets/film8.jpg';
import Film9 from '../assets/film9.jpg';

const FilmDetail = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    // Dummy data for development/demo
    const dummyFilms = {
      // Removed film with undefined Film1
      '2': {
        title: 'Naangalum Rowdy dhann',
        description: 'A fun-filled action comedy with a twist.',
        year: 2021,
        director: 'B. Raj',
        genre: 'Action/Comedy',
        poster: Film2,
      },
      '3': {
        title: 'ThevarMagans',
        description: 'A tale of legacy and family honor.',
        year: 2020,
        director: 'C. Mani',
        genre: 'Family/Drama',
        poster: Film3,
      },
      '4': {
        title: 'UKI vaazhkai',
        description: 'A journey through the ups and downs of life.',
        year: 2025,
        director: 'D. Kumar',
        genre: 'Drama',
        poster: Film4,
      },
      // Removed film with undefined Film10
      '6': {
        title: 'Moodar Koodam',
        description: 'A dark comedy that explores the absurdities of life.',
        year: 2019,
        director: 'F. Selvan',
        genre: 'Comedy/Drama',
        poster: Film6,
      },
      '7': {
        title: 'Kadatpaarai',
        description: 'A gripping thriller that keeps you on the edge of your seat.',
        year: 2024,
        director: 'G. Ravi',
        genre: 'Thriller',
        poster: Film7,
      },
      '8': {
        title: 'Naan Kadavul',
        description: 'A spiritual journey that challenges the norms of society.',
        year: 2023,
        director: 'H. Kumar',
        genre: 'Spiritual/Drama',
        poster: Film8,
      },
      '9': {
        title: 'Maazhai pozhudhu',
        description: 'A nostalgic look at the beauty of rain and its impact on life.',
        year: 2022,
        director: 'I. Selvan',
        genre: 'Romance/Drama',
        poster: Film9,
      },
    };
    if (dummyFilms[id]) {
      setFilm(dummyFilms[id]);
    } else {
      // fallback to API if not found in dummy
      axios.get(`http://localhost:5000/api/films/${id}`)
        .then(res => setFilm(res.data))
        .catch(() => setFilm(null));
    }
  }, [id]);

  if (!film) return <div>Loading...</div>;

  return (
    <div className="film-detail" style={{ maxWidth: 600, margin: '2rem auto', background: '#232323', color: '#fff', borderRadius: 12, padding: '2rem', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
      {film.poster && (
        <img src={film.poster} alt={film.title} style={{ width: 220, height: 320, objectFit: 'cover', borderRadius: 8, marginBottom: 24, display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
      )}
      <h2 style={{ textAlign: 'center', color: '#E0CD67' }}>{film.title}</h2>
      <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#ccc' }}>{film.genre} | {film.year} | Directed by {film.director}</p>
      <p style={{ marginTop: 24, fontSize: '1.1rem', lineHeight: 1.6 }}>{film.description}</p>
      <button
        style={{
          margin: '2rem auto 0',
          display: 'block',
          padding: '0.7rem 2rem',
          background: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
        }}
        onClick={() => navigate(`/watch`)}
      >
        Watch
      </button>
    </div>
  );
};

export default FilmDetail;