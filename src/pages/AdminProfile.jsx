import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// import '../css/AdminProfile.css';

const AdminProfile = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 150,
    totalFilms: 300,
    pendingApprovals: 5,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch dashboard data from API (e.g., /api/admin/dashboard)
    // Replace with actual API call
    // axios.get('http://localhost:5000/api/admin/dashboard')
    //   .then(response => setDashboardData(response.data))
    //   .catch(error => console.error('Error fetching dashboard:', error));
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
        <h1>Admin Dashboard</h1>
        <div className="profile-card">
          <h2>Overview</h2>
          <ul className="dashboard-list">
            <li>Total Users: {dashboardData.totalUsers}</li>
            <li>Total Films: {dashboardData.totalFilms}</li>
            <li>Pending Approvals: {dashboardData.pendingApprovals}</li>
          </ul>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminProfile;