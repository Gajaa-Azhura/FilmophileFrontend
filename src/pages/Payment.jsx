import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import '../css/Payment.css';

const Payment = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Load Stripe with your test publishable key
    const initializeStripe = async () => {
      const stripe = await loadStripe('pk_test_your_publishable_key_here');
      const elements = stripe.elements();
      const cardElement = elements.create('card');
      cardElement.mount('#card-element');

      const form = document.getElementById('payment-form');
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        setError('');

        try {
          const { paymentMethod, error: stripeError } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
          });

          if (stripeError) {
            setError(stripeError.message);
            return;
          }

          const response = await axios.post('http://localhost:3000/api/payments/create-subscription', {
            paymentMethodId: paymentMethod.id,
            priceId: 'price_1YourPriceIdHere', // Replace with your Stripe price ID
          });

          if (response.data.success) {
            localStorage.setItem('subscription', 'active');
            setError('Subscription activated! Redirecting...');
            setTimeout(() => navigate('/user-dashboard'), 1000);
          } else {
            setError('Payment failed. Please try again.');
          }
        } catch (err) {
          console.error('Payment Error:', err.response?.data || err.message);
          setError('Server error during payment. Please try again later.');
        }
      });
    };
    initializeStripe();
  }, [navigate]);

  return (
    <div className="payment-container">
      <div className="payment-card">
        <img src="/logo.png" alt="Filmophobia Logo" className="payment-logo" />
        <h2>Subscribe to Filmophobia</h2>
        {error && <div className="error-message">{error}</div>}
        <form id="payment-form">
          <div className="form-group">
            <label>Card Details</label>
            <div id="card-element" className="card-element"></div>
          </div>
          <button type="submit" className="submit-btn">
            Pay $9.99 / Month
          </button>
        </form>
        <p className="back-link">
          <a href="/user-dashboard">Back to Dashboard</a>
        </p>
      </div>
    </div>
  );
};

export default Payment;