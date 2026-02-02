import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../../components/Loading';

const AdminProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const [adminData, setAdminData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchAdminData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/me', {
          headers: { authorization: `Bearer ${localStorage.getItem('access-token')}` }
        });
        setAdminData(res.data);
      } catch (err) {
        toast.error('Failed to load admin profile');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminData();
  }, [user]);

  if (authLoading || isLoading) return <Loading />;

  if (!adminData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-error text-2xl">Admin profile not found!</div>
      </div>
    );
  }

  const { name, email, photoURL, role, createdAt } = adminData;

  return (
    <div className="container mx-auto my-16 px-4">
      {/* পেজ টাইটেল */}
      <h1 className="text-5xl font-bold text-center mb-12 text-primary">
        Admin Dashboard – Profile
      </h1>

      <div className="max-w-5xl mx-auto">
        <div className="card lg:card-side bg-base-100 shadow-2xl border border-primary/20">
          
          {/* প্রোফাইল ছবি */}
          <figure className="lg:w-1/3 p-8 flex justify-center items-center bg-gradient-to-br from-primary/10 to-secondary/10">
            <div className="relative">
              <img
                src={photoURL || 'https://i.ibb.co.com/0jZ7KZy/admin-avatar.png'}
                alt="Admin Avatar"
                className="w-72 h-72 rounded-full object-cover border-8 border-white shadow-2xl"
              />
              <div className="absolute bottom-4 right-4 badge badge-primary badge-lg shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </figure>

          {/* প্রোফাইল ইনফরমেশন */}
          <div className="card-body lg:w-2/3">
            <h2 className="card-title text-4xl font-extrabold text-primary">
              {name || 'Administrator'}
            </h2>
            <p className="text-xl text-gray-600 mb-6">{email}</p>

            <div className="space-y-6">

              {/* রোল ব্যাজ */}
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold">Role:</span>
                <div className="badge badge-lg badge-primary text-white px-6 py-4 text-base">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Super Admin
                </div>
              </div>

              {/* অ্যাকাউন্ট স্ট্যাটাস */}
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold">Status:</span>
                <div className="badge badge-success badge-lg px-6 py-4 text-white text-base">
                  Active & Verified
                </div>
              </div>

              {/* মেম্বার সিন্স */}
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold">Admin Since:</span>
                <span className="text-lg">
                  {new Date(createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>

              {/* অ্যাডমিন পাওয়ার লিস্ট */}
              <div className="mt-10">
                <h3 className="text-2xl font-bold mb-4 text-primary">Admin Privileges</h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Manage All Tickets (Approve/Reject)
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Manage Users (Make Admin/Vendor)
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Mark Fraud Vendors
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Control Homepage Advertisements (Max 6)
                  </li>
                </ul>
              </div>
            </div>

            {/* একশন বাটন */}
            <div className="card-actions justify-end mt-10">
              <button className="btn btn-primary btn-lg px-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                System Settings (Coming Soon)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;                            