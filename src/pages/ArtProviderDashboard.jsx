import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/ArtProviderDashboard.css';

const ArtProviderDashboard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim inputs to avoid whitespace-only values
    // const trimmedVideoUrl = videoUrl.trim();
    // const trimmedThumbnailUrl = thumbnailUrl.trim();

    // if (!trimmedVideoUrl || !trimmedThumbnailUrl) {
    //   setMessage({ type: 'error', text: 'Please enter both a video URL and a thumbnail URL.' });
    //   return;
    // }

   const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("videoUrl", videoUrl);       // 👈 use File object
  formData.append("thumbnailUrl", thumbnailUrl);


    // Debug: log the data being sent
    // console.log('Submitting filmData:', formData);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/films/upload', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTitle('');
      setDescription('');
      setVideoUrl('');
      setThumbnailUrl('');
      setMessage({ type: 'success', text: 'Film uploaded successfully!' });
      setTimeout(() => {
        navigate('/art-provider-profile');
      }, 2000);
    } catch (err) {
      console.error("Upload failed:", err);
      setMessage({ type: 'error', text: 'Upload failed. Please try again.' });
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
        {message.text && <p className={`message ${message.type}`}>{message.text}</p>}
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
  <label className="form-label">Video URL</label>
  <input
    type="url"
    className="form-input"
    placeholder="https://example.com/video.mp4"
    value={videoUrl}
  onChange={(e) => setVideoUrl(e.target.value)}
    required
  />
</div>
        <div className="form-group">
          <label htmlFor="thumbnailUrl">Thumbnail Image URL</label>
          <input
            type="url"
            id="thumbnailUrl"
           value={thumbnailUrl}
           onChange={(e) => setThumbnailUrl(e.target.value)}
            required
            aria-label="Thumbnail Image URL"
            placeholder="https://your-storage.com/path/to/thumbnail.jpg"
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