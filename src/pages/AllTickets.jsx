import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [type, setType] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const limit = 9;

  // useEffect(() => {
  //   const url = `http://localhost:5000/api/tickets?from=${from}&to=${to}&type=${type}&sort=${sort}&page=${page}&limit=${limit}`;
  //   axios.get(url).then(res => setTickets(res.data));
  // }, [from, to, type, sort, page]);

useEffect(() => {
  const url = `${import.meta.env.VITE_API_URL}/api/tickets?from=${from}&to=${to}&type=${type}&sort=${sort}&page=${page}&limit=${limit}`;
  axios.get(url)
    .then(res => {
      // ← এখানে শুধু res.data.tickets নাও
      setTickets(res.data.tickets || []);   // যদি tickets না থাকে তাহলে খালি অ্যারে
    })
    .catch(err => {
      console.error('All tickets error:', err);
      setTickets([]);  // এরর হলে খালি
    });
}, [from, to, type, sort, page]);


  return (
    <div className="container mx-auto my-16">
      <h2 className="text-3xl font-bold mb-8 text-center">All Approved Tickets</h2>
      {/* সার্চ/ফিল্টার ফর্ম */}
      <div className="flex flex-wrap gap-4 mb-8">
        <input className="input input-bordered" placeholder="From" onChange={e => setFrom(e.target.value)} />
        <input className="input input-bordered" placeholder="To" onChange={e => setTo(e.target.value)} />
        <select className="select select-bordered" onChange={e => setType(e.target.value)}>
          <option value="">Transport Type</option>
          <option value="bus">Bus</option>
          <option value="train">Train</option>
          <option value="launch">Launch</option>
          <option value="plane">Plane</option>
        </select>
        <select className="select select-bordered" onChange={e => setSort(e.target.value)}>
          <option value="">Sort by Price</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tickets.map(ticket => (
          <div key={ticket._id} className="card bg-base-100 shadow-xl">
            <figure><img src={ticket.image} alt={ticket.title} /></figure>
            <div className="card-body">
              <h2 className="card-title">{ticket.title}</h2>
              <p>{ticket.from} → {ticket.to}</p>
              <p>Type: {ticket.type}</p>
              <p>Price: ${ticket.price}</p>
              <p>Quantity: {ticket.quantity}</p>
              <p>Perks: {ticket.perks.join(', ')}</p>
              <p>Departure: {new Date(ticket.departure).toLocaleString()}</p>
              <Link to={`/ticket/${ticket._id}`} className="btn btn-primary">See Details</Link>
            </div>
          </div>
        ))}
      </div> */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {tickets && Array.isArray(tickets) && tickets.length > 0 ? (
    tickets.map(ticket => (
      <div key={ticket._id} className="card bg-base-100 shadow-xl">
        <figure><img src={ticket.image} alt={ticket.title} className="h-48 w-full object-cover" /></figure>
        <div className="card-body">
          <h2 className="card-title">{ticket.title}</h2>
          <p>{ticket.from} → {ticket.to}</p>
          <p>Type: {ticket.type}</p>
          <p>Price: ${ticket.price}</p>
          <p>Quantity: {ticket.quantity}</p>
          <p>Perks: {ticket.perks?.join(', ') || 'No perks'}</p>
          <p>Departure: {new Date(ticket.departure).toLocaleString()}</p>
          <Link to={`/ticket/${ticket._id}`} className="btn btn-primary">See Details</Link>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center col-span-full text-xl text-gray-500">
      No tickets found. Try different filters.
    </p>
  )}
</div>




      {/* পেজিনেশন */}
      <div className="btn-group mt-8 justify-center">
        <button className="btn" onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>Previous</button>
        <button className="btn">{page}</button>
        <button className="btn" onClick={() => setPage(prev => prev + 1)}>Next</button>
      </div>
    </div>
  );
};

export default AllTickets;