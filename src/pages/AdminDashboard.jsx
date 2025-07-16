import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [films, setFilms] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users. Please try again.');
      }
    };
    const fetchAllFilms = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/admin/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFilms(response.data);
      } catch (err) {
        setError('Failed to fetch films.');
      }
    };
    fetchUsers();
    fetchAllFilms();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter(user => (user.id || user._id) !== userId));
    } catch (err) {
      setError('Failed to delete user.');
    }
  };

  return (
    <div className="admin-dashboard">
      <Navbar />
      <main className="dashboard-content">
        <h2 className="welcome-heading">Welcome, Admin!</h2>
        {error && <p className="error">{error}</p>}
        <div className="dashboard-actions">
          {/* <button onClick={handleLogout} className="logout-btn">Logout</button> */}
        </div>
        <h2 className="dashboard-heading">Pending Films</h2>
        {films.filter(film => film.status === 'pending').length === 0 ? (
          <p>No pending films.</p>
        ) : (
          <table className="film-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Uploader</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {films.filter(film => film.status === 'pending').map((film) => (
                <tr key={film.id || film._id}>
                  <td>{film.id || film._id}</td>
                  <td>{film.title}</td>
                  <td>{film.uploaderName || film.uploader || 'provider'}</td>
                  <td>{film.status}</td>
                  <td>
                    <button
                      onClick={async () => {
                        try {
                          const token = localStorage.getItem('token');
                          await axios.put(`http://localhost:5000/api/admin/approve/${film._id}`, {}, {
                            headers: { Authorization: `Bearer ${token}` },
                          });
                          setFilms(films.map(f =>
                            (f.id || f._id) === (film.id || film._id) ? { ...f, status: 'approved' } : f
                          ));
                        } catch (err) {
                          setError('Failed to approve film.');
                        }
                      }}
                      className="approve-btn"
                    >
                      Approve
                    </button>
                    <button
                      onClick={async () => {
                        if (window.confirm('Are you sure you want to reject this film?')) {
                          try {
                            const token = localStorage.getItem('token');
                            await axios.put(`http://localhost:5000/api/admin/reject/${film._id}`, {}, {
                              headers: { Authorization: `Bearer ${token}` },
                            });
                            setFilms(films.filter(f => (f.id || f._id) !== (film.id || film._id)));
                          } catch (err) {
                            setError('Failed to reject film.');
                          }
                        }
                      }}
                      className="reject-btn"
                      style={{ marginLeft: '0.5rem', background: '#ff4444', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.4rem 0.9rem', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <h2 className="dashboard-heading">Approved Films</h2>
        {films.filter(film => film.status === 'approved').length === 0 ? (
          <p>No approved films.</p>
        ) : (
          <table className="film-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Uploader</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {films.filter(film => film.status === 'approved').map((film) => (
                <tr key={film.id || film._id}>
                  <td>{film.id || film._id}</td>
                  <td>{film.title}</td>
                  <td>{film.uploaderName || film.uploader || 'provider'}</td>
                  <td>{film.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <h2 className="dashboard-heading">Users</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id || user._id}>
                <td>{user.id || user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user.id || user._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;