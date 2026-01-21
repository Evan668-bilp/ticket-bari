// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div className="navbar bg-base-100 shadow-sm">
//   <div className="flex-none">
//     <button className="btn btn-square btn-ghost">
//       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
//     </button>
//   </div>
//   <div className="flex-1">
//     <a className="btn btn-ghost text-xl">daisyUI</a>
//   </div>
//   <div className="flex-none">
//     <button className="btn btn-square btn-ghost">
//       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path> </svg>
//     </button>
//   </div>
// </div>
//     </>
//   )
// }

// export default App


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './providers/AuthProvider';
import MainLayout from './components/MainLayout';
import Home from './pages/Home/Home';
import AllTickets from './pages/AllTickets';
import TicketDetails from './pages/TicketDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './pages/Dashboard/DashboardLayout';
import PrivateRoute from './utils/PrivateRoute';
import ErrorPage from './components/ErrorPage';
// ড্যাশবোর্ড পেজ ইমপোর্ট
import UserProfile from './pages/Dashboard/User/UserProfile';
import MyBookings from './pages/Dashboard/User/MyBookings';
import Transactions from './pages/Dashboard/User/Transactions';
import VendorProfile from './pages/Dashboard/Vendor/VendorProfile';
import AddTicket from './pages/Dashboard/Vendor/AddTicket';
import MyTickets from './pages/Dashboard/Vendor/MyTickets';
import RequestedBookings from './pages/Dashboard/Vendor/RequestedBookings';
import Revenue from './pages/Dashboard/Vendor/Revenue';
import AdminProfile from './pages/Dashboard/Admin/AdminProfile';
import ManageTickets from './pages/Dashboard/Admin/ManageTickets';
import ManageUsers from './pages/Dashboard/Admin/ManageUsers';
import Advertise from './pages/Dashboard/Admin/Advertise';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="all-tickets" element={<PrivateRoute><AllTickets /></PrivateRoute>} />
            <Route path="ticket/:id" element={<PrivateRoute><TicketDetails /></PrivateRoute>} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
            <Route path="user/profile" element={<UserProfile />} />
            <Route path="user/bookings" element={<MyBookings />} />
            <Route path="user/transactions" element={<Transactions />} />
            <Route path="vendor/profile" element={<VendorProfile />} />
            <Route path="vendor/add-ticket" element={<AddTicket />} />
            <Route path="vendor/my-tickets" element={<MyTickets />} />
            <Route path="vendor/requested" element={<RequestedBookings />} />
            <Route path="vendor/revenue" element={<Revenue />} />
            <Route path="admin/profile" element={<AdminProfile />} />
            <Route path="admin/manage-tickets" element={<ManageTickets />} />
            <Route path="admin/manage-users" element={<ManageUsers />} />
            <Route path="admin/advertise" element={<Advertise />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;