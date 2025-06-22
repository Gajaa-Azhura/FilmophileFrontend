import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/UserProfile.css';

const UserProfile = () => {
  const [profileData, setProfileData] = useState({
    name: 'Priya Sharma',
    bestComments: [
      { film: 'Silent Shadows', comment: 'A masterpiece of storytelling!' },
      { film: 'Echoes of Dawn', comment: 'Beautiful cinematography.' },
    ],
    topComments: [
      { film: 'City Lights', comment: 'Best film of the year!', upvotes: 15 },
      { film: 'Silent Shadows', comment: 'Incredible acting!', upvotes: 10 },
    ],
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch profile data from API (e.g., /api/user/profile)
    // Replace with actual API call
    // axios.get('http://localhost:3000/api/user/profile')
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
          <h2>Best Comments</h2>
          <ul className="comment-list">
            {profileData.bestComments.map((comment, index) => (
              <li key={index}>
                <span className="film-title">{comment.film}:</span> {comment.comment}
              </li>
            ))}
          </ul>
          <h2>Top Comments</h2>
          <ul className="comment-list">
            {profileData.topComments.map((comment, index) => (
              <li key={index}>
                <span className="film-title">{comment.film}:</span> {comment.comment} <span className="upvotes">({comment.upvotes} upvotes)</span>
              </li>
            ))}
          </ul>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;