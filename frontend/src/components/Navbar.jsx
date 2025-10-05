import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUpload,
  FaUserCircle,
  FaHeart,
  FaComments,
  FaEdit,
  FaSignOutAlt,
} from 'react-icons/fa';
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
    <nav>
        <div className='flex justify-between items-center gap-2'>
          <Link className="flex items-center gap-2 px-4 py-2 rounded-4xl cursor-pointer bg-red-600 text-white font-semibold focus:outline-none" to="/users/login">Login</Link>
        </div>

        <ul className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-700">
          <li>
            <Link to="/video/upload" className="flex items-center gap-2 hover:text-red-600">
              <FaUpload /> Upload
            </Link>
          </li>
          <li>
            <Link to="/users/me" className="flex items-center gap-2 hover:text-red-600">
              <FaUserCircle /> My Profile
            </Link>
          </li>
          <li>
            <Link to="/users/profile/update" className="flex items-center gap-2 md:hidden hover:text-red-600">
              <FaEdit /> Edit Profile
            </Link>
          </li>
          <li>
            <Link to="/likes/my-likes" className="flex items-center gap-2 md:hidden hover:text-red-600">
              <FaHeart /> Likes
            </Link>
          </li>
          <li>
            <Link to="/comments/my-comments" className="flex items-center gap-2 md:hidden hover:text-red-600">
              <FaComments /> Comments
            </Link>
          </li>
          <li className='inline-flex'>
            <button
              type='button'
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-4xl cursor-pointer bg-red-600 text-white font-semibold focus:outline-none"
            >
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>

    </nav>
  );
}

export default Navbar;
