import { Link, useNavigate } from 'react-router-dom';
import {
  FaUpload,
  FaUserCircle,
  FaSignOutAlt,
  FaSign,
  FaComment
} from 'react-icons/fa';
import { SlLike } from 'react-icons/sl'
import { FiUpload, FiUser, FiUserPlus } from 'react-icons/fi'
import axiosInstance from '../utils/Axios';
import { toast } from 'react-toastify';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
      toast.success('Logged out successfully');
      navigate('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  return (
    <ul className="flex flex-col md:flex-row md:items-center gap-4 text-gray-700">
      <li>
        <Link to="/video/upload" className="flex items-center gap-2 hover:text-red-600">
          <FiUpload /> Upload
        </Link>
      </li>
      <li>
        <Link to="/users/me" className="flex items-center gap-2 hover:text-red-600">
          <FiUser /> My Profile
        </Link>
      </li>
      <li>
        <Link to="/users/profile/update" className="flex items-center gap-2 hover:text-red-600">
          <FiUserPlus /> Profile Update
        </Link>
      </li>
      <li>
        <Link to="/likes/my-likes" className="flex items-center gap-2 hover:text-red-600">
          <SlLike /> My Likes
        </Link>
      </li>
      <li>
        <Link to="/comments/my-comments" className="flex items-center gap-2 hover:text-red-600">
          <FaComment /> My Comments
        </Link>
      </li>
      <li>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700"
        >
          <FaSignOutAlt /> Logout
        </button>
      </li>
      <li>
        <Link
          to="/auth/login"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700"
        >
          <FaSign /> Login
        </Link>
      </li>
    </ul>
  );
}

export default Navbar;
