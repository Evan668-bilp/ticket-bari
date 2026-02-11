import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [advertised, setAdvertised] = useState([]);
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    axios.get('${import.meta.env.VITE_API_URL}/api/tickets/advertised').then(res => setAdvertised(res.data));
    axios.get('${import.meta.env.VITE_API_URL}/api/tickets/latest').then(res => setLatest(res.data));
  }, []);

  return (
    <div>
      {/* হিরো ব্যানার */}
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome to TicketBari</h1>
            <p className="py-6">Book your travel tickets easily for bus, train, launch, and plane.</p>
          </div>
        </div>
      </div>

      {/* অ্যাডভারটাইজড সেকশন */}
      <section className="container mx-auto my-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Advertised Tickets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {advertised.map(ticket => (
            <div key={ticket._id} className="card bg-base-100 shadow-xl">
              <figure><img src={ticket.image} alt={ticket.title} className="h-48 w-full object-cover" /></figure>
              <div className="card-body">
                <h2 className="card-title">{ticket.title}</h2>
                <p>Price: ${ticket.price}</p>
                <p>Quantity: {ticket.quantity}</p>
                <p>Type: {ticket.type}</p>
                <p>Perks: {ticket.perks.join(', ')}</p>
                <Link to={`/ticket/${ticket._id}`} className="btn btn-primary">See Details</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* লেটেস্ট টিকিটস */}
      <section className="container mx-auto my-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Latest Tickets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latest.map(ticket => (
            <div key={ticket._id} className="card bg-base-100 shadow-xl">
              {/* সিমিলার কার্ড */}
              <Link to={`/ticket/${ticket._id}`} className="btn btn-primary">See Details</Link>
            </div>
          ))}
        </div>
      </section>

      {/* এক্সট্রা সেকশন 1: পপুলার রুটস */}
      <section className="bg-base-200 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* স্যাম্পল রুট কার্ড */}
            <div className="card bg-base-100 shadow">Dhaka to Chittagong</div>
            {/* আরও */}
          </div>
        </div>
      </section>

      {/* এক্সট্রা সেকশন 2: কেন চুজ আস? */}
      <section className="container mx-auto my-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-xl p-6">
            <h3>Easy Booking</h3>
            <p>Book in minutes</p>
          </div>
          {/* আরও */}
        </div>
      </section>
    </div>
  );
};

export default Home;



// আলাদা repo