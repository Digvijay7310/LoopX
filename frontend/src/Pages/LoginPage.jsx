import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../utils/Axios';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post('/auth/login', form);
      navigate('/video/home');
      setForm({ email: '', password: '' }); // clear inputs after submit
    } catch (error) {
      console.error('Error in login', error);
      setError(error?.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'LoopX - User Login';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-pink-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-xl w-full max-w-sm space-y-6 rounded-xl"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-3 py-2 rounded text-sm">
            {error}
          </div>
        )}

        {/* Email Field */}
        <div className="flex items-center border-b-2 border-gray-300 focus-within:border-red-600 transition-colors duration-200 py-2">
          <FiMail className="mr-2 text-gray-500" />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            autoComplete="true"
            required
            className="w-full outline-none placeholder-gray-400 focus:placeholder-gray-300"
          />
        </div>

        {/* Password Field */}
        <div className="flex items-center border-b-2 border-gray-300 focus-within:border-red-600 transition-colors duration-200 py-2 relative">
          <FiLock className="mr-2 text-gray-500" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            autoComplete="true"
            required
            className="w-full outline-none placeholder-gray-400 focus:placeholder-gray-300 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-0 top-2 text-gray-500 focus:outline-none pr-2"
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition duration-200"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <span className="flex justify-center items-center gap-1 text-sm">
          Don't have an account?
          <Link to="/auth/signup" className="text-red-600 hover:underline">
            Signup
          </Link>
        </span>

        <span className="flex justify-center items-center gap-1 text-xs">
          Admin Login?
          <Link to="/admin/login" className="text-red-600 hover:underline">
            Click here
          </Link>
        </span>
      </form>
    </div>
  );
}

export default LoginPage;
