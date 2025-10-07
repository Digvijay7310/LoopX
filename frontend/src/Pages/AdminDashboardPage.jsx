import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/Axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaUsers, FaHeart, FaVideo, FaComments, FaSignOutAlt } from 'react-icons/fa';

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get('/api/admin/all-users');
        setStats(res.data.data);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate('/api/admin/login');
        } else {
          setError('Failed to load dashboard stats.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
    document.title = "LoopX - Admin Dashboard"
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/api/admin/logout');
      navigate('/api/admin/login');
    } catch {
      navigate('/api/admin/login');
    }
  };


  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold flex items-center gap-3">
          <FaUsers /> Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center gap-2"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Link to="/api/admin/users" className="p-4 border rounded shadow text-center flex flex-col items-center gap-2">
          <FaUsers className="text-4xl text-red-600" />
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="text-2xl">{stats.usersCount}</p>
        </Link>

        <div className="p-4 border rounded shadow text-center flex flex-col items-center gap-2">
          <FaHeart className="text-4xl text-red-600" />
          <h2 className="text-xl font-semibold">Likes</h2>
          <p className="text-2xl">{stats.likesCount}</p>
        </div>

        <div className="p-4 border rounded shadow text-center flex flex-col items-center gap-2">
          <FaVideo className="text-4xl text-red-600" />
          <h2 className="text-xl font-semibold">Videos</h2>
          <p className="text-2xl">{stats.videosCount}</p>
        </div>

        <div className="p-4 border rounded shadow text-center flex flex-col items-center gap-2">
          <FaComments className="text-4xl text-red-600" />
          <h2 className="text-xl font-semibold">Comments</h2>
          <p className="text-2xl">{stats.commentsCount}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
