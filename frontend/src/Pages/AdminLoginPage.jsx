import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../utils/Axios';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'react-toastify';

function AdminLoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'LoopX - Admin Login';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post('/admin/login', { email, password });
      toast.success('Logged in successfully!');
      navigate('/admin/all-users-data');
    } catch (err) {
      console.error('Login error:', err);
      toast.error(err?.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl px-8 py-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Admin Login</h2>

        {/* Email */}
        <div className="flex flex-col border-b-2 border-gray-300 focus-within:border-red-600 transition-colors duration-200">
          <div className="flex items-center rounded px-3 py-2">
            <FiMail className="mr-2 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <div className="flex items-center border-b-2 border-gray-300 focus-within:border-red-600 rounded px-3 py-2 relative">
            <FiLock className="mr-2 text-gray-500" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 text-gray-500 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded font-semibold text-white transition duration-200 ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {/* Switch to User Login */}
        <span className="mt-2 flex justify-center items-center gap-1 text-sm">
          User Login?{' '}
          <Link to="/auth/login" className="text-blue-500 hover:underline">
            Click here
          </Link>
        </span>
      </form>
    </div>
  );
}

export default AdminLoginPage;
