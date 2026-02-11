import { useEffect, useState } from 'react';
import axios from 'axios';

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get('${import.meta.env.VITE_API_URL}/api/tickets/my', { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(res => setTickets(res.data));
  }, []);

  const handleUpdate = (id) => {
    // আপডেট লজিক (মোডাল ওপেন)
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/tickets/${id}`, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(() => setTickets(tickets.filter(t => t._id !== id)));
  };

  return (
    <div className="container mx-auto my-16">
      <h1 className="text-3xl font-bold mb-8">My Added Tickets</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tickets.map(ticket => (
          <div key={ticket._id} className="card bg-base-100 shadow-xl">
            {/* টিকিট ইনফো */}
            <p>Status: {ticket.status}</p>
            <button className="btn btn-secondary" onClick={() => handleUpdate(ticket._id)} disabled={ticket.status === 'rejected'}>Update</button>
            <button className="btn btn-error" onClick={() => handleDelete(ticket._id)} disabled={ticket.status === 'rejected'}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTickets;