import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/Axios';
import { FaBan, FaCheckCircle, FaTrashAlt } from 'react-icons/fa';

function AdminUserDetailsPage() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch user details on mount
  useEffect(() => {
    async function fetchUserDetails() {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/api/admin/${username}`);
        const data = res.data.data;
        setUser(data.user);
        setVideos(data.videos);
        setComments(data.comments);
        setLikes(data.likes);
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load user details.");
      } finally {
        setLoading(false);
      }
    }
    document.title = "LoopX - Users Details"
    fetchUserDetails();
  }, [username]);

  // Block user
  const blockUser = async () => {
    setActionLoading(true);
    try {
      await axiosInstance.post(`/api/admin/${username}/block`);
      setUser(prev => ({ ...prev, isBlocked: true }));
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to block user.");
    } finally {
      setActionLoading(false);
    }
  };

  // Unblock user
  const unblockUser = async () => {
    setActionLoading(true);
    try {
      await axiosInstance.post(`/api/admin/${username}/unblock`);
      setUser(prev => ({ ...prev, isBlocked: false }));
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to unblock user.");
    } finally {
      setActionLoading(false);
    }
  };

  // Delete user
  const deleteUser = async () => {
    if (!window.confirm(`Are you sure you want to delete user "${username}"? This action cannot be undone.`)) return;
    setActionLoading(true);
    try {
      await axiosInstance.delete(`/api/admin/${username}/delete`);
      alert("User deleted successfully.");
      navigate('/api/admin/all-users'); // go back to all users list
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete user.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading user details...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl mb-4 font-semibold">User Details: {user.fullName} ({user.username})</h2>

      <div className="mb-6">
        <span className='font-semibold'>Avatar: <img src={user.avatar} alt="avatar" className='h-10 w-10 rounded-full' /> </span>
        <strong>Email:</strong>{user.email}<br />
        <strong>Status:</strong> {user.isBlocked ? (
          <span className="text-red-600 font-semibold">Blocked</span>
        ) : (
          <span className="text-green-600 font-semibold">Active</span>
        )}
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border p-4 rounded shadow text-center">
          <h3 className="text-xl font-semibold mb-2">Videos ({videos.length})</h3>
          <ul className="text-sm max-h-32 overflow-auto">
            {videos.length === 0 ? (
              <li>No videos uploaded.</li>
            ) : (
              videos.map(video => <li key={video._id}>{video.title || 'Untitled'}</li>)
            )}
          </ul>
        </div>

        <div className="border p-4 rounded shadow text-center">
          <h3 className="text-xl font-semibold mb-2">Comments ({comments.length})</h3>
          <ul className="text-sm max-h-32 overflow-auto">
            {comments.length === 0 ? (
              <li>No comments made.</li>
            ) : (
              comments.map(comment => <li key={comment._id}>{comment.text || '...'}</li>)
            )}
          </ul>
        </div>

        <div className="border p-4 rounded shadow text-center">
          <h3 className="text-xl font-semibold mb-2">Likes ({likes.length})</h3>
          <p>{likes.length} likes</p>
        </div>
      </div>

      <div className="flex gap-4">
        {user.isBlocked ? (
          <button
            onClick={unblockUser}
            disabled={actionLoading}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FaCheckCircle /> Unblock User
          </button>
        ) : (
          <button
            onClick={blockUser}
            disabled={actionLoading}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FaBan /> Block User
          </button>
        )}

        <button
          onClick={deleteUser}
          disabled={actionLoading}
          className="bg-gray-700 hover:bg-gray-900 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaTrashAlt /> Delete User
        </button>
      </div>

      {actionLoading && <p className="mt-4 text-center">Processing...</p>}
    </div>
  );
}

export default AdminUserDetailsPage;
