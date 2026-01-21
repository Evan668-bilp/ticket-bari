import { useEffect, useState } from 'react';
import axios from 'axios';

const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tickets/all', { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(res => setTickets(res.data));
  }, []);

  const handleApprove = (id) => {
    axios.patch(`http://localhost:5000/api/tickets/${id}/approve`, {}, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(() => setTickets(tickets.map(t => t._id === id ? { ...t, status: 'approved' } : t)));
  };

  const handleReject = (id) => {
    axios.patch(`http://localhost:5000/api/tickets/${id}/reject`, {}, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(() => setTickets(tickets.map(t => t._id === id ? { ...t, status: 'rejected' } : t)));
  };

  return (
    <div className="container mx-auto my-16">
      <h1 className="text-3xl font-bold mb-8">Manage Tickets</h1>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Vendor</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket._id}>
              <td>{ticket.title}</td>
              <td>{ticket.vendorEmail}</td>
              <td>{ticket.status}</td>
              <td>
                <button className="btn btn-success mr-2" onClick={() => handleApprove(ticket._id)}>Approve</button>
                <button className="btn btn-error" onClick={() => handleReject(ticket._id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTickets;