import React, { useState } from 'react';
import axiosInstance from '../utils/Axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus, FaEnvelope, FaLock } from 'react-icons/fa';

function AdminSignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    fullName: '',
    password: '',
  });

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
      await axiosInstance.post('/admin/signup', form);
      navigate('/admin/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center flex items-center justify-center gap-2">
          <FaUserPlus /> Admin Signup
        </h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}

        <label className="block mb-2 flex items-center gap-2">
          <FaUserPlus />
          Full Name
        </label>
        <input
          name="fullName"
          type="text"
          value={form.fullName}
          onChange={handleChange}
          required
          className="mb-4 p-2 border rounded w-full"
          placeholder="Your full name"
        />

        <label className="block mb-2 flex items-center gap-2">
          <FaEnvelope />
          Email
        </label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          className="mb-4 p-2 border rounded w-full"
          placeholder="you@example.com"
        />

        <label className="block mb-2 flex items-center gap-2">
          <FaLock />
          Password
        </label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          className="mb-6 p-2 border rounded w-full"
          placeholder="••••••••"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          {loading ? 'Signing up...' : 'Signup'}
        </button>
        <span className="mt-2 inline-flex items-center gap-1">
          Already have an account?
          <Link to="/admin/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
}

export default AdminSignupPage;
