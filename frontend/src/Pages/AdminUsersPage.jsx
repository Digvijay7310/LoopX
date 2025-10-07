import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/Axios';
import { Link } from 'react-router-dom';

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get('/admin/users');
        setUsers(res.data.data.users || []);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load users.');
      } finally {
        setLoading(false);
      }
    };

    document.title = "LoopX - User Block or unBlock and Delete"
    fetchUsers();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading users...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto overflow-auto">
      <h2 className="text-2xl mb-6 font-semibold">Users List</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Avatar</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Username</th>
            <th className="border border-gray-300 p-2">Full Name</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No users found.
              </td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2 text-center">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  ) : (
                    '—'
                  )}
                </td>
                <td className="border border-gray-300 p-2">{user.email}</td>
                <td className="border border-gray-300 p-2 text-blue-600 underline cursor-pointer">
                  <Link to={`/admin/${user.username}`}>{user.username}</Link>
                </td>
                <td className="border border-gray-300 p-2">{user.fullName}</td>
                <td
                  className={`border border-gray-300 p-2 font-semibold ${
                    user.isBlock ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {user.isBlock ? 'Blocked' : 'Active'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsersPage;
