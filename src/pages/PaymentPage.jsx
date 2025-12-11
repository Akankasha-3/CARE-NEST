import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Check } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ totalAmount, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    // 1. Create payment intent on backend
    const res = await fetch('http://localhost:5000/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: totalAmount }),
    });
    const { clientSecret } = await res.json();

    // 2. Confirm payment with Stripe
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    setLoading(false);

    if (result.error) {
      setError(result.error.message);
    } else if (result.paymentIntent.status === 'succeeded') {
      onPaymentSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement options={{ hidePostalCode: true }} />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-primary-dark transition"
      >
        {loading ? 'Processing...' : `Pay ₹${totalAmount}`}
      </button>
    </form>
  );
};

const PaymentPage = () => {
  const [service, setService] = useState('');
  const [type, setType] = useState('');
  const [duration, setDuration] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setService(params.get('service') || '');
    setType(params.get('type') || '');
    setDuration(Number(params.get('duration') || 0));
    setTotalAmount(Number(params.get('total') || 0));
  }, []);

  const handlePaymentSuccess = () => {
    setPaymentComplete(true);
    setTimeout(() => navigate(-1), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar currentPage="payment" />

      <div className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {!paymentComplete ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-bold mb-6">Secure Payment</h1>

              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{service}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{type}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">
                      {duration} {service === 'companionship' ? 'sessions' : 'days'}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-gray-800 font-semibold">Total Amount:</span>
                    <span className="text-primary font-bold">₹{totalAmount}</span>
                  </div>
                </div>
              </div>

              <Elements stripe={stripePromise}>
                <CheckoutForm totalAmount={totalAmount} onPaymentSuccess={handlePaymentSuccess} />
              </Elements>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
                <Check size={32} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
              <p className="text-gray-600 mb-6">
                Your slot has been successfully booked 🎉  
                Thank you for your payment of ₹{totalAmount}.
              </p>
              <p className="text-sm text-gray-500">Redirecting back...</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentPage;
