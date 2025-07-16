import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/watch.css';
import { useNavigate } from 'react-router-dom';

const Watch = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const paid = localStorage.getItem('hasPaid');
    if (user) {
      setIsAuthenticated(true);
      setShowLogin(false);
      if (paid === 'true') {
        setHasPaid(true);
      } else {
        // Redirect to payment page if not paid
        navigate('/payment', { state: { redirectTo: '/watch' } });
      }
    } else {
      setIsAuthenticated(false);
      setShowLogin(true);
    }
  }, [navigate]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
  };

  const film = {
    title: "Dummy Film Title",
    videoUrl: "dummy-video.mp4",
    description: "This is a description for a dummy film used for testing purposes.",
    views: 123,
    comments: [
      {
        _id: "1",
        user: { username: "user1" },
        text: "Great movie! Loved it."
      },
      {
        _id: "2",
        user: { username: "user2" },
        text: "Interesting plot twist."
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {showLogin && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="modal-content" style={{ background: '#fff', padding: '2rem', borderRadius: '8px', minWidth: 300, textAlign: 'center' }}>
            <h2>Login Required</h2>
            <p>You must be logged in to watch this film.</p>
            <button
              onClick={() => {
                // Simulate login success for demo
                localStorage.setItem('user', JSON.stringify({ username: 'demoUser' }));
                handleLoginSuccess();
              }}
              style={{ margin: '1rem 0', padding: '0.5rem 2rem', background: '#1976d2', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
            >
              Login
            </button>
            <br />
            <button onClick={() => setShowLogin(false)} style={{ background: 'none', border: 'none', color: '#1976d2', cursor: 'pointer', textDecoration: 'underline' }}>Close</button>
          </div>
        </div>
      )}

      <main
        className="watch-container flex-grow"
        style={showLogin ? { filter: 'blur(2px)', pointerEvents: 'none' } : {}}
      >
        {isAuthenticated && hasPaid && (
          <>
            <h1 className="watch-title">{film.title}</h1>
            <video
              className="watch-video"
              controls
              src={`/videos/${film.videoUrl}`}
            />
            <p className="watch-description">{film.description}</p>
            <div className="watch-views">Views: {film.views}</div>

            {/* Comments Section */}
            <section className="comments-section">
              <h2 className="watch-title">Comments</h2>
              {film.comments.map((comment) => (
                <div key={comment._id} className="comment-item">
                  <p className="comment-username">{comment.user.username}</p>
                  <p className="comment-text">{comment.text}</p>
                </div>
              ))}
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Watch;