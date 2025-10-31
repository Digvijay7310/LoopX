import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaComment, FaRegistered } from 'react-icons/fa';
import { SlLike } from 'react-icons/sl';
import { FiUpload, FiUser, FiUserPlus } from 'react-icons/fi';
import axiosInstance from '../utils/Axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { getCachedUser, setCachedUser } from '../utils/CurrentUserCache';
import Loading from './Loading';

function Navbar({ onLinkClick }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const cached = getCachedUser();
      if (cached) {
        setCurrentUser(cached);
        setLoading(false);
        return;
      }

      try {
        const res = await axiosInstance.get('/api/users/me');
        setCurrentUser(res.data.data);
        setCachedUser(res.data.data);
      } catch (error) {
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/api/auth/logout');
      toast.success('Logged out successfully');
      setCachedUser(null);
      navigate('/auth/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  if (loading) return <div className='flex justify-center items-center min-h-screen'><Loading /></div>;

  return (
    <nav className="w-full max-w-md">
      <ul className="flex flex-col  text-gray-700 mt-5">
        {currentUser ? (
          <>
            {/* User Info */}
            <div className="flex justify-center items-center flex-col mb-2">
              <img
                src={currentUser.avatar}
                alt="avatar"
                className="w-10 h-10 border border-red-600 rounded-full"
              />
              <p title="username" className="text-lg text-black font-semibold hover:underline">
                {currentUser.username}
              </p>
              <p title="fullName" className="text-gray-800">
                FullName: {currentUser.fullName}
              </p>
              <p title="email" className="text-gray-900">
                Email: {currentUser.email}
              </p>
            </div>

            {/* Menu Links */}
            <li title="Video Upload">
              <Link
                onClick={onLinkClick}
                to="/video/upload"
                className="flex items-center gap-2 px-1 py-2 hover:text-red-600"
              >
                <FiUpload size={18} /> Upload
              </Link>
            </li>

            <li title="My Profile">
              <Link
                onClick={onLinkClick}
                to="/users/me"
                className="flex items-center gap-2 px-1 py-2 hover:text-red-600"
              >
                <FiUser size={18} /> My Profile
              </Link>
            </li>

            <li title="Profile Update">
              <Link
                onClick={onLinkClick}
                to="/users/profile/update"
                className="flex items-center gap-2 px-1 py-2 hover:text-red-600"
              >
                <FiUserPlus size={18} /> Profile Update
              </Link>
            </li>

            <li title="My Likes">
              <Link
                onClick={onLinkClick}
                to="/likes/my-likes"
                className="flex items-center gap-2 px-1 py-2 hover:text-red-600"
              >
                <SlLike size={18} /> My Likes
              </Link>
            </li>

            <li title="My Comments">
              <Link
                onClick={onLinkClick}
                to="/comments/my-comments"
                className="flex items-center gap-2 px-1 py-2 hover:text-red-600"
              >
                <FaComment size={18} /> My Comments
              </Link>
            </li>

            <li>
              <button
                title="logout"
                onClick={() => {
                  onLinkClick?.();
                  handleLogout();
                }}
                className="flex items-center justify-center gap-2 px-5 py-2 mt-4 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition"
              >
                <FaSignOutAlt size={18} /> Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link
              onClick={onLinkClick}
              to="/auth/login"
              className="flex items-center justify-center gap-2 px-5 py-2 mt-4 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition"
            >
              <FaRegistered size={18} /> Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
