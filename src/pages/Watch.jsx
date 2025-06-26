import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/WatchFilmophile.css';

const Watch = () => {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to watch movies.');
      navigate('/login');
      return;
    }

    const fetchFilms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/films', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFilms(response.data);
      } catch (err) {
        setError('Failed to load movies. Please try again.');
        console.error('Fetch films error:', err);
      }
    };

    fetchFilms();
  }, [navigate]);

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="watch-container">
      <h1>Watch Movies</h1>
      {films.length === 0 ? (
        <p>No movies available. Check back later!</p>
      ) : (
        <div className="film-list">
          {films.map((film) => (
            <div key={film._id} className="film-item">
              <h2>{film.title}</h2>
              <p>{film.description}</p>
              <video controls width="600" height="400">
                <source src={film.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p>Views: {film.views}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watch;