import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const CheckoutForm = ({ booking, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setProcessing(true);

    try {
      const { data } = await axios.post('http://localhost:5000/api/payments/create-payment-intent', { bookingId: booking._id }, {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        }
      });

      if (result.error) {
        setError(result.error.message);
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        toast.success('Payment successful!');
        onClose();
      }
    } catch (err) {
      toast.error(err.message);
    }
    setProcessing(false);
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Pay ${booking.totalPrice} for {booking.ticketTitle}</h3>
        <form onSubmit={handleSubmit} className="mt-4">
          <CardElement className="p-4 border rounded" />
          {error && <p className="text-error mt-2">{error}</p>}
          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose} disabled={processing}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={processing}>{processing ? 'Processing...' : 'Pay'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;