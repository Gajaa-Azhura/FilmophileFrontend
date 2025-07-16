import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import '../css/Payment.css';
import logo from '../assets/logo.png';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PLANS = [
  { name: 'Basic', price: 4.99, priceId: 'price_1RlMWNBTBYe0PrVZnnKt88Jt', description: '720p streaming, 1 device' },
  { name: 'Standard', price: 9.99, priceId: 'price_1RlMYRBTBYe0PrVZj0J0mwl0', description: '1080p streaming, 2 devices' },
  { name: 'Premium', price: 14.99, priceId: 'price_1RlMZuBTBYe0PrVZ9SrRTVgn', description: '4K streaming, 4 devices' }
];

function PaymentForm({ selectedPlan, setSelectedPlan, error, setError }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Card element not found.');
      return;
    }

    const { paymentMethod, error: stripeError } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (stripeError) {
      setError(stripeError.message);
      return;
    }

    try {
      // Find the selected plan object
      const planObj = PLANS.find(p => p.priceId === selectedPlan);
      const token = localStorage.getItem('token'); // Assumes JWT is stored as 'token'
      const response = await axios.post(
        'http://localhost:5000/api/payments/create-subscription',
        {
          paymentMethodId: paymentMethod.id,
          priceId: selectedPlan,
          planName: planObj ? planObj.name : '',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { clientSecret, status, error: backendError } = response.data;

      if (backendError) {
        setError(backendError);
        return;
      }

      if (status === 'requires_action' && clientSecret) {
        // Handle 3D Secure or other next actions
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret);
        if (confirmError) {
          setError(confirmError.message);
          return;
        }
        if (paymentIntent.status === 'succeeded') {
          localStorage.setItem('subscription', 'active');
          setError('Subscription activated! Redirecting...');
          setTimeout(() => navigate('/user-dashboard'), 1000);
          return;
        } else {
          setError('Payment requires further action or failed.');
          return;
        }
      }

      if (status === 'succeeded') {
        localStorage.setItem('subscription', 'active');
        setError('Subscription activated! Redirecting...');
        setTimeout(() => navigate('/user-dashboard'), 1000);
        return;
      }

      setError('Payment failed or requires further action.');
    } catch (err) {
      setError('Server error during payment. Please try again later.');
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Card Details</label>
        <CardElement
          className="card-element"
          options={{
            style: {
              base: {
                color: '#fff',
                '::placeholder': { color: '#fffbe6' },
                fontSize: '16px',
              },
              invalid: {
                color: '#ff6b6b',
              },
            },
          }}
        />
      </div>
      <button type="submit" className="submit-btn" disabled={!stripe}>
        Pay {PLANS.find(p => p.priceId === selectedPlan)?.price
          ? `$${PLANS.find(p => p.priceId === selectedPlan).price.toFixed(2)} / Month`
          : 'Subscribe'}
      </button>
    </form>
  );
}

const Payment = () => {
  const [error, setError] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(PLANS[1].priceId);

  return (
    <Elements stripe={stripePromise}>
      <div className="payment-container">
        <div className="payment-card" style={{
          maxWidth: '900px',
          width: '100%',
          margin: '0 auto',
          padding: '32px 24px',
          boxSizing: 'border-box',
        }}>
          <img src={logo} alt="Filmophobia Logo" className="payment-logo" />
          <h2>Subscribe to Filmophobia</h2>
          <div className="plans-list-cards">
            {PLANS.map(plan => (
              <div
                key={plan.priceId}
                className={`plan-card${selectedPlan === plan.priceId ? ' selected' : ''}`}
                onClick={() => setSelectedPlan(plan.priceId)}
                style={{
                  border: selectedPlan === plan.priceId ? '2px solid #bfa14a' : '1px solid #ccc',
                  borderRadius: '10px',
                  padding: '20px',
                  margin: '10px',
                  cursor: 'pointer',
                  background: selectedPlan === plan.priceId ? '#fffbe6' : '#fff8dc', // soft gold shades
                  boxShadow: selectedPlan === plan.priceId ? '0 2px 8px #bfa14a44' : '0 1px 4px #ccc2',
                  minWidth: '220px',
                  flex: 1,
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: '#fffbe6',
                }}
              >
                <input
                  type="radio"
                  name="plan"
                  value={plan.priceId}
                  checked={selectedPlan === plan.priceId}
                  onChange={() => setSelectedPlan(plan.priceId)}
                  style={{ marginBottom: '10px' }}
                />
                <strong style={{ fontSize: '1.3em', marginBottom: '8px', color: '#111' }}>{plan.name}</strong>
                <div style={{ fontSize: '1.1em', color: '#111', marginBottom: '8px' }}>
                  ${plan.price.toFixed(2)} / Month
                </div>
                <div className="plan-desc" style={{ color: '#222', textAlign: 'center' }}>{plan.description}</div>
              </div>
            ))}
          </div>
          {error && <div className="error-message">{error}</div>}
          <PaymentForm
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            error={error}
            setError={setError}
          />
          <p className="back-link">
            <a href="/user-dashboard">Back to Dashboard</a>
          </p>
        </div>
      </div>
      <style>{`
        .plans-list-cards {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: center;
          align-items: stretch;
          gap: 20px;
          margin-bottom: 30px;
        }
        .plan-card.selected {
          border-color: #bfa14a !important;
          background: #fffbe6 !important;
        }
      `}</style>
    </Elements>
  );
};

export default Payment;