import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('All fields are required');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Invalid email format');
      return;
    }
    try {
      // Simulate API call (replace with actual backend endpoint)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setError('');
    } catch (err) {
      setError('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="contact">
      <Navbar />
      <div className="contact-content">
        <h1>Contact Us</h1>
        <p>Get in touch with us for support, feedback, or inquiries.</p>
        <div className="contact-info">
          <p><strong>Email:</strong> kisakabes@gmail.com</p>
          <p><strong>Phone:</strong> 0751731759</p>
          <p><strong>Address:</strong> Ponnar lane,Meesalai west ,Iyakadai</p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your email"
            />
          </div>
        <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63304.474234242135!2d79.8317!3d6.9271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2595df7c24d2f%3A0x62d126727d5353e1!2sColombo!5e0!3m2!1sen!2slk!4v1652345678901"
 
></iframe>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your message"
            />
          </div>
          <button type="submit" className="submit-btn">Send Message</button>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;