import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/UserProfile.css';

const UserProfile = () => {
  const [profileData, setProfileData] = useState({
    name: '', // this will be updated from localStorage
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
    let storedUser = null;
    try {
      storedUser = JSON.parse(localStorage.getItem('user'));
    } catch (e) {
      storedUser = null;
    }
    let name = '';
    if (storedUser) {
      // Only use email if neither name nor username is present
      if (storedUser.name && storedUser.name.trim() !== '') {
        name = storedUser.name;
      } else if (storedUser.username && storedUser.username.trim() !== '') {
        name = storedUser.username;
      } else {
        name = 'User';
      }
    }
    setProfileData((prev) => ({
      ...prev,
      name,
    }));

    // Optional: Fetch user profile data from backend if needed
    // axios.get('http://localhost:5000/api/user/profile', {
    //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    // })
    // .then(res => setProfileData(res.data))
    // .catch(err => console.error('Error fetching profile:', err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
                <span className="film-title">{comment.film}:</span> {comment.comment}{' '}
                <span className="upvotes">({comment.upvotes} upvotes)</span>
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
