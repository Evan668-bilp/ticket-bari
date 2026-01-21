import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { FaUserCircle, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout, toggleTheme, theme } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-base-100 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold flex items-center">
          TicketBari <span className="ml-2 text-primary">🚌</span>
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link to="/">Home</Link>
          {user && <Link to="/all-tickets">All Tickets</Link>}
          {user && <Link to="/dashboard">Dashboard</Link>}
          {!user && <Link to="/login">Login</Link>}
          {!user && <Link to="/register">Register</Link>}
        </div>
        <div className="flex items-center space-x-4">
          {user && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user.photoURL || FaUserCircle} alt="user" />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link to="/dashboard/user/profile">My Profile</Link></li>
                <li><a onClick={logout}>Logout</a></li>
              </ul>
            </div>
          )}
          <button onClick={toggleTheme} className="btn btn-ghost">{theme === 'light' ? 'Dark' : 'Light'}</button>
          <FaBars className="md:hidden cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} size={24} />
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-base-100 p-4">
          <ul className="space-y-2">
            <li><Link to="/">Home</Link></li>
            {user && <li><Link to="/all-tickets">All Tickets</Link></li>}
            {user && <li><Link to="/dashboard">Dashboard</Link></li>}
            {!user && <li><Link to="/login">Login</Link></li>}
            {!user && <li><Link to="/register">Register</Link></li>}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;