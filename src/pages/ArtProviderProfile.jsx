import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/ArtProviderProfile.css';

const ArtProviderProfile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    films: [],
    awards: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/provider/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfileData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  // Get provider name from localStorage if available
  const storedUser = localStorage.getItem('user');
  const providerName = storedUser ? (JSON.parse(storedUser).name || JSON.parse(storedUser).username || 'Provider') : profileData.name;

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-content">
        <h1>{providerName}&apos;s Profile</h1>
        <div className="profile-card">
          <h2>Films Provided</h2>
          <ul className="film-list">
            {(Array.isArray(profileData.films) && profileData.films.length > 0) ? (
              profileData.films.map((film, index) => (
                <li key={film._id || index}>
                  {film.title ? film.title : JSON.stringify(film)}
                </li>
              ))
            ) : (
              <li>No films uploaded yet.</li>
            )}
          </ul>
          <h2>Awards Claimed</h2>
          <ul className="award-list">
            {profileData.awards.map((award, index) => (
              <li key={index}>{award}</li>
            ))}
          </ul>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ArtProviderProfile;