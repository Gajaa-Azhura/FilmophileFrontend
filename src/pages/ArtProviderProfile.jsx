import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/ArtProviderProfile.css';

const ArtProviderProfile = () => {
  const [profileData, setProfileData] = useState({
    name: 'Rajesh Kumar',
    films: ['Silent Shadows', 'Echoes of Dawn', 'City Lights'],
    awards: ['Best Indie Film 2025', 'Golden Reel Award'],
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch profile data from API (e.g., /api/art-provider/profile)
    // Replace with actual API call
    // axios.get('http://localhost:5001/api/art-provider/profile')
    //   .then(response => setProfileData(response.data))
    //   .catch(error => console.error('Error fetching profile:', error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-content">
        <h1>{profileData.name}'s Profile</h1>
        <div className="profile-card">
          <h2>Films Provided</h2>
          <ul className="film-list">
            {profileData.films.map((film, index) => (
              <li key={index}>{film}</li>
            ))}
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