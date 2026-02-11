import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DashboardLayout = () => {
  const { user } = useAuth();
  const [role, setRole] = useState('');

  useEffect(() => {
    axios.get('${import.meta.env.VITE_API_URL}/api/users/me', { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(res => setRole(res.data.role));
  }, []);

  let sidebarLinks = [];
  if (role === 'user') {
    sidebarLinks = [
      { path: 'user/profile', label: 'User Profile' },
      { path: 'user/bookings', label: 'My Booked Tickets' },
      { path: 'user/transactions', label: 'Transaction History' },
    ];
  } else if (role === 'vendor') {
    sidebarLinks = [
      { path: 'vendor/profile', label: 'Vendor Profile' },
      { path: 'vendor/add-ticket', label: 'Add Ticket' },
      { path: 'vendor/my-tickets', label: 'My Added Tickets' },
      { path: 'vendor/requested', label: 'Requested Bookings' },
      { path: 'vendor/revenue', label: 'Revenue Overview' },
    ];
  } else if (role === 'admin') {
    sidebarLinks = [
      { path: 'admin/profile', label: 'Admin Profile' },
      { path: 'admin/manage-tickets', label: 'Manage Tickets' },
      { path: 'admin/manage-users', label: 'Manage Users' },
      { path: 'admin/advertise', label: 'Advertise Tickets' },
    ];
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <Outlet />
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
      </div> 
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {sidebarLinks.map(link => (
            <li key={link.path}><Link to={link.path}>{link.label}</Link></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;