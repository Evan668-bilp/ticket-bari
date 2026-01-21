import useAuth from '../../../hooks/useAuth';

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto my-16">
      <h1 className="text-3xl font-bold mb-8">User Profile</h1>
      <div className="card bg-base-100 shadow-xl p-6">
        <img src={user.photoURL} alt="profile" className="w-32 h-32 rounded-full mx-auto" />
        <p>Name: {user.displayName}</p>
        <p>Email: {user.email}</p>
        <p>Role: User</p>
      </div>
    </div>
  );
};

export default UserProfile;