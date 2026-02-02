import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Countdown from 'react-countdown';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';
import Loading from "../components/Loading";

const TicketDetails = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/tickets/${id}`).then(res => setTicket(res.data));
  }, [id]);

  const handleBook = () => {
    if (quantity > ticket.quantity || quantity < 1) return toast.error('Invalid quantity');
    if (new Date(ticket.departure) < new Date()) return toast.error('Ticket expired');

    axios.post('http://localhost:5000/api/bookings', {
      userEmail: user.email,
      ticketId: id,
      quantity,
      totalPrice: ticket.price * quantity
    }, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(() => {
        toast.success('Booking requested!');
        document.getElementById('book_modal').close();
      })
      .catch(err => toast.error(err.message));
  };

  if (!ticket) return <Loading />;

  const isExpired = new Date(ticket.departure) < new Date();

  return (
    <div className="container mx-auto my-16">
      <h1 className="text-4xl font-bold mb-8">{ticket.title}</h1>
      <img src={ticket.image} alt={ticket.title} className="w-full h-64 object-cover mb-6" />
      <p>{ticket.from} → {ticket.to}</p>
      <p>Type: {ticket.type}</p>
      <p>Price: ${ticket.price}</p>
      <p>Quantity Available: {ticket.quantity}</p>
      <p>Perks: {ticket.perks.join(', ')}</p>
      <p>Departure: {new Date(ticket.departure).toLocaleString()}</p>
      {!isExpired && <Countdown date={ticket.departure} className="text-2xl mt-4" />}
      <button 
        className="btn btn-primary mt-6" 
        disabled={isExpired || ticket.quantity === 0} 
        onClick={() => document.getElementById('book_modal').showModal()}
      >
        Book Now
      </button>

      <dialog id="book_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Book Ticket</h3>
          <input 
            type="number" 
            value={quantity} 
            onChange={e => setQuantity(parseInt(e.target.value))} 
            min="1" 
            max={ticket.quantity} 
            className="input input-bordered w-full mt-4" 
          />
          <div className="modal-action">
            <button className="btn" onClick={() => document.getElementById('book_modal').close()}>Cancel</button>
            <button className="btn btn-primary" onClick={handleBook}>Submit</button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default TicketDetails;