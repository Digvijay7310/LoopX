import { Link, useNavigate } from 'react-router-dom';
import {
  FaSignOutAlt,
  FaComment,
  FaRegistered,
} from 'react-icons/fa';
import { SlLike } from 'react-icons/sl';
import { FiUpload, FiUser, FiUserPlus } from 'react-icons/fi';
import axiosInstance from '../utils/Axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

function Navbar({onLinkClick}) {
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
  const fetchCurrentUser = async() => {
    try {
      const res = await axiosInstance.get("/api/users/me");
      setCurrentUser(res.data.data);
    } catch (error) {
      setCurrentUser(null)
    }
  };
  fetchCurrentUser()
}, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/api/auth/logout');
      toast.success('Logged out successfully');
      navigate('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  if(!currentUser){
    navigate("/auth/login")
  }

  return (
    <nav className="w-full max-w-md">
      <ul className="flex flex-col md:gap-6 text-gray-700 mt-5">
        {currentUser ? (
          <>
          <div className="flex justify-center items-center flex-col mb-2">
            <img src={currentUser.avatar} alt="avatar" className='w-10 h-10 border border-red-600 rounded-full' />
          <p className='text-lg text-black font-semibold hover:underline'>{currentUser.username}</p>
          <p className="text-gray-800">FullName: {currentUser.fullName}</p>
          <p className="text-gray-900">Email: {currentUser.email}</p>
          </div>
          
          <li>
          <Link
          onClick={onLinkClick}
            to="/video/upload"
            className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:text-red-600 transition"
          >
            <FiUpload size={18} />
            Upload
          </Link>
        </li>
        <li>
          <Link
          onClick={onLinkClick}
            to="/users/me"
            className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:text-red-600 transition"
          >
            <FiUser size={18} />
            My Profile
          </Link>
        </li>
        <li>
          <Link
          onClick={onLinkClick}
            to="/users/profile/update"
            className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:text-red-600 transition"
          >
            <FiUserPlus size={18} />
            Profile Update
          </Link>
        </li>
        <li>
          <Link
          onClick={onLinkClick}
            to="/likes/my-likes"
            className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:text-red-600 transition"
          >
            <SlLike size={18} />
            My Likes
          </Link>
        </li>
        <li className='mb-2'>
          <Link
          onClick={onLinkClick}
            to="/comments/my-comments"
            className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:text-red-600 transition"
          >
            <FaComment size={18} />
            My Comments
          </Link>
        </li>
    
        <li>
          <Link
          onClick={() => {
            onLinkClick?.();
            handleLogout();
          }}
            to="/auth/login"
            className="flex items-center justify-center gap-2 px-5 py-2 max-w-[200px] rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            <FaSignOutAlt size={18} />
            Logout
          </Link>
        </li>
          </>
        ): (
          <li>
          <Link
          onClick={onLinkClick}
            to="/auth/login"
            className="flex items-center justify-center gap-2 px-5 py-2 max-w-[200px] rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            <FaRegistered size={18} />
            Login
          </Link>
        </li>
        )}
        
      </ul>
    </nav>
  );
}

export default Navbar;
