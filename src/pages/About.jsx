import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/About.css';

const About = () => {
  return (
    <div className="about">
      <Navbar />
      <div className="about-content">
        <h1>About Filmophile</h1>
        <p>
          Welcome to Filmophile, the ultimate haven for cinematic enthusiasts. Launched in 2025, our platform is dedicated to bringing the magic of films to your screen with a curated selection of classics, blockbusters, indie gems, and short masterpieces. Our mission is to create a vibrant community where movie lovers can explore, subscribe, and share their cinematic journey with the world.
        </p>

        <h2>Our Journey</h2>
        <div className="timeline">
          <div className="timeline-item">
            <h3>2025 - Inception</h3>
            <p>Filmophile was born with a vision to revolutionize how we experience local and global cinema.</p>
          </div>
          <div className="timeline-item">
            <h3>2025 - First Release</h3>
            <p>Launched our initial platform, featuring 100+ films and a subscription model.</p>
          </div>
          <div className="timeline-item">
            <h3>2026 - Expansion</h3>
            <p>Expanded our library to include 500+ titles and introduced art provider partnerships.</p>
          </div>
        </div>

        <h2>Why Choose Filmophile?</h2>
        <ul className="features-list">
          <li><span>Curated Collection:</span> Handpicked films from around the globe.</li>
          <li><span>Seamless Subscription:</span> Easy access with flexible plans.</li>
          <li><span>Community Hub:</span> Share reviews and connect with fellow cinephiles.</li>
          <li><span>Exclusive Content:</span> Behind-the-scenes and director interviews.</li>
        </ul>

        <h2>What Our Users Say</h2>
        <div className="testimonials">
          <div className="testimonial-item">
            <p>"Filmophobia transformed my movie nights! The variety is unmatched."</p>
            <span>- Priya S., Subscriber</span>
          </div>
          <div className="testimonial-item">
            <p>"As an indie filmmaker, I love the exposure Filmophobia provides."</p>
            <span>- Rajesh K., Art Provider</span>
          </div>
        </div>

        <h2>Join the Cinematic Revolution</h2>
        <p>
          Ready to dive into the world of Filmophobia? Subscribe today to unlock a universe of films and become part of our growing community. <a href="/contact" className="cta-link">Contact us</a> for partnerships or support!
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;