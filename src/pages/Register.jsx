import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';

const Register = () => {
  const { createUser, updateUserProfile, googleLogin } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    if (password.length < 6) return setError('Password must be at least 6 characters');
    if (!/[A-Z]/.test(password)) return setError('Password must have an uppercase letter');
    if (!/[a-z]/.test(password)) return setError('Password must have a lowercase letter');

    createUser(email, password)
      .then(() => {
        updateUserProfile(name, photo);
        toast.success('Registration successful!');
        navigate('/');
      })
      .catch(err => {
        setError(err.message);
        toast.error(err.message);
      });
  };

  const handleGoogle = () => {
    googleLogin()
      .then(() => navigate('/'))
      .catch(err => toast.error(err.message));
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleRegister}>
          <h1 className="text-3xl font-bold text-center">Register</h1>
          <div className="form-control">
            <label className="label"><span className="label-text">Name</span></label>
            <input type="text" name="name" placeholder="name" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Photo URL</span></label>
            <input type="url" name="photo" placeholder="photo url" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Password</span></label>
            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
          </div>
          {error && <p className="text-error">{error}</p>}
          <div className="form-control mt-6">
            <button className="btn btn-primary">Register</button>
          </div>
          <p className="text-center mt-4">Already have an account? <Link to="/login" className="text-primary">Login</Link></p>
          <button onClick={handleGoogle} className="btn btn-outline mt-4">Register with Google</button>
        </form>
      </div>
    </div>
  );
};

export default Register;