import React from 'react';
import { Link } from 'react-router-dom';
// import '../css/FilmCard.css';

const FilmCard = ({ id, title, poster }) => {
  return (
    <div className="film-card">
      <img src={poster} alt={`${title} poster`} />
      <h3>{title}</h3>
      <Link to={`/film/${id}`} className="view-btn">View Details</Link>
    </div>
  );
};

export default FilmCard;