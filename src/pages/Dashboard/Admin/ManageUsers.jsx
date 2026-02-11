import { useEffect, useState } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('${import.meta.env.VITE_API_URL}/api/users', { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(res => setUsers(res.data));
  }, []);

  const handleMakeAdmin = (id) => {
    axios.patch(`http://localhost:5000/api/users/${id}/role`, { role: 'admin' }, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(() => setUsers(users.map(u => u._id === id ? { ...u, role: 'admin' } : u)));
  };

  const handleMakeVendor = (id) => {
    axios.patch(`http://localhost:5000/api/users/${id}/role`, { role: 'vendor' }, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(() => setUsers(users.map(u => u._id === id ? { ...u, role: 'vendor' } : u)));
  };

  const handleMarkFraud = (id) => {
    axios.patch(`http://localhost:5000/api/users/${id}/fraud`, {}, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(() => setUsers(users.map(u => u._id === id ? { ...u, isFraud: true } : u)));
  };

  return (
    <div className="container mx-auto my-16">
      <h1 className="text-3xl font-bold mb-8">Manage Users</h1>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="btn btn-primary mr-2" onClick={() => handleMakeAdmin(user._id)}>Make Admin</button>
                <button className="btn btn-secondary mr-2" onClick={() => handleMakeVendor(user._id)}>Make Vendor</button>
                {user.role === 'vendor' && <button className="btn btn-error" onClick={() => handleMarkFraud(user._id)}>Mark Fraud</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;