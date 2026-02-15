import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../../components/Loading';

const VendorProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const [vendorData, setVendorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ফায়ারবেস থেকে বেসিক ইউজার ডাটা + ব্যাকএন্ড থেকে অতিরিক্ত ডাটা (যেমন রোল, ফ্রড স্ট্যাটাস)
  useEffect(() => {
    if (!user) return;

    const fetchVendorData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/me`, {
          headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setVendorData(res.data); // এখানে role, isFraud, createdAt ইত্যাদি আসবে
      } catch (err) {
        toast.error('Failed to load profile');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVendorData();
  }, [user]);

  if (authLoading || isLoading) return <Loading />;

  if (!vendorData) {
    return <div className="text-center text-error">Profile not found!</div>;
  }

  const { name, email, photoURL, role, isFraud, createdAt } = vendorData;

  return (
    <div className="container mx-auto my-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">Vendor Profile</h1>

      <div className="max-w-4xl mx-auto">
        <div className="card lg:card-side bg-base-100 shadow-2xl">
          {/* প্রোফাইল ছবি */}
          <figure className="lg:w-1/3">
            <img
              src={photoURL || 'https://i.ibb.co.com/0jZ7KZy/user-avatar.png'}
              alt="Vendor Avatar"
              className="w-64 h-64 rounded-full object-cover border-4 border-primary shadow-lg mx-auto lg:mx-0"
            />
          </figure>

          {/* প্রোফাইল ইনফো */}
          <div className="card-body lg:w-2/3">
            <h2 className="card-title text-3xl">{name || 'No Name'}</h2>
            <p className="text-lg text-gray-600">{email}</p>

            <div className="my-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-semibold">Role:</span>
                <div className="badge badge-lg badge-success text-white">Vendor</div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-semibold">Account Status:</span>
                {isFraud ? (
                  <div className="badge badge-error badge-lg">Fraud / Blocked</div>
                ) : (
                  <div className="badge badge-success badge-lg">Active</div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="font-semibold">Member Since:</span>
                <span>{new Date(createdAt).toLocaleDateString('en-GB')}</span>
              </div>
            </div>

            {/* যদি ভেন্ডর ফ্রড মার্কড হয় তাহলে ওয়ার্নিং */}
            {isFraud && (
              <div className="alert alert-error shadow-lg mt-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>
                  <strong>Your account has been marked as Fraud by Admin.</strong><br />
                  You cannot add new tickets and all your tickets are hidden.
                </span>
              </div>
            )}

            <div className="card-actions justify-end mt-8">
              <button className="btn btn-primary btn-lg">
                Edit Profile (Coming Soon)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;