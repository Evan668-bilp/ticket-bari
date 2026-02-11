import { useEffect, useState } from 'react';
import axios from 'axios';

const RequestedBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('${import.meta.env.VITE_API_URL}/api/bookings/requested', { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(res => setBookings(res.data));
  }, []);

  const handleAccept = (id) => {
    axios.patch(`http://localhost:5000/api/bookings/${id}/accept`, {}, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(() => setBookings(bookings.map(b => b._id === id ? { ...b, status: 'accepted' } : b)));
  };

  const handleReject = (id) => {
    axios.patch(`http://localhost:5000/api/bookings/${id}/reject`, {}, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(() => setBookings(bookings.map(b => b._id === id ? { ...b, status: 'rejected' } : b)));
  };

  return (
    <div className="container mx-auto my-16">
      <h1 className="text-3xl font-bold mb-8">Requested Bookings</h1>
      <table className="table w-full">
        <thead>
          <tr>
            <th>User Email</th>
            <th>Ticket Title</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking._id}>
              <td>{booking.userEmail}</td>
              <td>{booking.ticketTitle}</td>
              <td>{booking.quantity}</td>
              <td>${booking.totalPrice}</td>
              <td>
                <button className="btn btn-success mr-2" onClick={() => handleAccept(booking._id)}>Accept</button>
                <button className="btn btn-error" onClick={() => handleReject(booking._id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestedBookings;