import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaUpload,
  FaUserCircle,
  FaHeart,
  FaComments,
  FaEdit,
  FaSignOutAlt,
  FaUser,
} from 'react-icons/fa';
import axiosInstance from '../utils/Axios';
import { toast } from 'react-toastify';
// import useAuth from '../context/useAuth';

function Navbar() {
  const navigate = useNavigate();
  //  const { user } = useAuth();

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
      {/* {user ? ( */}
         <>
        <button
        type='button' className='flex items-center gap-2 px-4 py-2 rounded-4xl cursor-pointer bg-red-600 text-white font-semibold focus:outline-none'>
          <Link to="/users/login">Login</Link>
        </button>
        <button
        type='button' className='flex items-center gap-2 px-4 py-2 rounded-4xl cursor-pointer bg-red-600 text-white font-semibold focus:outline-none'>
        <Link to="/users/signup">Signup</Link>
        </button>
        </>
      {/* ): ( */}
        <>
        <ul className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-700">
      <li>
        <Link to="/video/home" className="flex items-center gap-2 hover:text-red-600">
          <FaHome /> Home
        </Link>
      </li>
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
        </>
      {/* )} */}
    </nav>
  );
}

export default Navbar;
