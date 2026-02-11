import { useState } from 'react';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';

const AddTicket = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    from: '',
    to: '',
    type: '',
    price: '',
    quantity: '',
    departure: '',
    perks: [],
    image: '',
    vendorName: user.displayName,
    vendorEmail: user.email
  });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePerks = e => {
    let perks = [...formData.perks];
    if (e.target.checked) {
      perks.push(e.target.value);
    } else {
      perks = perks.filter(p => p !== e.target.value);
    }
    setFormData({ ...formData, perks });
  };

  const handleImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result.split(',')[1] }); // base64 without prefix
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/tickets', formData, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(() => toast.success('Ticket added!'))
      .catch(err => toast.error(err.message));
  };

  return (
    <div className="container mx-auto my-16">
      <h1 className="text-3xl font-bold mb-8">Add New Ticket</h1>
      <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-6">
        <input name="title" onChange={handleChange} placeholder="Ticket Title" className="input input-bordered mb-4" required />
        <input name="from" onChange={handleChange} placeholder="From" className="input input-bordered mb-4" required />
        <input name="to" onChange={handleChange} placeholder="To" className="input input-bordered mb-4" required />
        <select name="type" onChange={handleChange} className="select select-bordered mb-4" required>
          <option value="">Transport Type</option>
          <option value="bus">Bus</option>
          <option value="train">Train</option>
          <option value="launch">Launch</option>
          <option value="plane">Plane</option>
        </select>
        <input name="price" type="number" onChange={handleChange} placeholder="Price per unit" className="input input-bordered mb-4" required />
        <input name="quantity" type="number" onChange={handleChange} placeholder="Quantity" className="input input-bordered mb-4" required />
        <input name="departure" type="datetime-local" onChange={handleChange} className="input input-bordered mb-4" required />
        <div className="form-control mb-4">
          <label>Perks:</label>
          <label><input type="checkbox" value="AC" onChange={handlePerks} /> AC</label>
          <label><input type="checkbox" value="Breakfast" onChange={handlePerks} /> Breakfast</label>
          {/* আরও চেকবক্স */}
        </div>
        <input type="file" onChange={handleImage} className="file-input mb-4" required />
        <input value={user.displayName} readOnly className="input input-bordered mb-4" />
        <input value={user.email} readOnly className="input input-bordered mb-4" />
        <button className="btn btn-primary">Add Ticket</button>
      </form>
    </div>
  );
};

export default AddTicket;