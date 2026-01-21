import { useEffect, useState } from 'react';
import axios from 'axios';
import Countdown from 'react-countdown';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../../../stripe';
import CheckoutForm from './CheckoutForm';
import useAuth from '../../../hooks/useAuth';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    axios.get('http://localhost:5000/api/bookings/my', { headers: { authorization: `Bearer ${localStorage.getItem('access-token')}` } })
      .then(res => setBookings(res.data));
  }, []);

  return (
    <div className="container mx-auto my-16">
      <h1 className="text-3xl font-bold mb-8">My Booked Tickets</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bookings.map(booking => {
          const isExpired = new Date(booking.departure) < new Date();
          return (
            <div key={booking._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{booking.ticketTitle}</h2>
                <p>Quantity: {booking.quantity}</p>
                <p>Total Price: ${booking.totalPrice}</p>
                <p>{booking.from} → {booking.to}</p>
                <p>Departure: {new Date(booking.departure).toLocaleString()}</p>
                <p>Status: {booking.status}</p>
                {!isExpired && <Countdown date={booking.departure} />}
                {booking.status === 'accepted' && !isExpired && (
                  <button className="btn btn-primary mt-4" onClick={() => setSelectedBooking(booking)}>Pay Now</button>
                )}
                {booking.status === 'rejected' && <p className="text-error">Rejected</p>}
              </div>
            </div>
          );
        })}
      </div>
      {selectedBooking && (
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={selectedBooking} onClose={() => setSelectedBooking(null)} />
        </Elements>
      )}
    </div>
  );
};

export default MyBookings;