import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/ArtProviderDashboard.css';

const ArtProviderDashboard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [poster, setPoster] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('poster', poster);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5001/api/films', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      setTitle('');
      setDescription('');
      setPoster(null);
      setError('');
    } catch (err) {
      setError('Failed to upload film. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="art-provider-dashboard">
      <Navbar />
      <main className="dashboard-content">
        <h2>Welcome, Art Provider!</h2>
        {error && <p className="error">{error}</p>}
        <div className="dashboard-actions">
          {/* <button onClick={handleLogout} className="logout-btn">Logout</button> */}
        </div>
        <form className="upload-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Film Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              aria-label="Film Title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              aria-label="Description"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="poster">Poster Image</label>
            <input
              type="file"
              id="poster"
              accept="image/*"
              onChange={(e) => setPoster(e.target.files[0])}
              required
              aria-label="Poster"
            />
          </div>
          <button type="submit">Upload Film</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default ArtProviderDashboard;