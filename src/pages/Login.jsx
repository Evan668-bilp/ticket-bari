import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';

const Login = () => {
  const { login, googleLogin } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleLogin = e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then(() => navigate(from, { replace: true }))
      .catch(err => {
        setError(err.message);
        toast.error(err.message);
      });
  };

  const handleGoogle = () => {
    googleLogin()
      .then(() => navigate(from, { replace: true }))
      .catch(err => toast.error(err.message));
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleLogin}>
          <h1 className="text-3xl font-bold text-center">Login</h1>
          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Password</span></label>
            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
          </div>
          {error && <p className="text-error">{error}</p>}
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
          <p className="text-center mt-4">New here? <Link to="/register" className="text-primary">Register</Link></p>
          <button onClick={handleGoogle} className="btn btn-outline mt-4">Login with Google</button>
          <Link to="/" className="text-center block mt-2">Forgot Password?</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;