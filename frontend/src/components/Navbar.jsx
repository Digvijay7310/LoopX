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

function Navbar({onLinkClick}) {
  const navigate = useNavigate();

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

  return (
    <nav className="w-full md:w-[400px] max-w-[400px]">
      <ul className="flex flex-col md:gap-6 text-gray-700 mt-5">
        <li>
          <Link
          onClick={onLinkClick}
            to="/video/upload"
            className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:text-white hover:bg-red-600 transition"
          >
            <FiUpload size={18} />
            Upload
          </Link>
        </li>
        <li>
          <Link
          onClick={onLinkClick}
            to="/users/me"
            className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:text-white hover:bg-red-600 transition"
          >
            <FiUser size={18} />
            My Profile
          </Link>
        </li>
        <li>
          <Link
          onClick={onLinkClick}
            to="/users/profile/update"
            className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:text-white hover:bg-red-600 transition"
          >
            <FiUserPlus size={18} />
            Profile Update
          </Link>
        </li>
        <li>
          <Link
          onClick={onLinkClick}
            to="/likes/my-likes"
            className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:text-white hover:bg-red-600 transition"
          >
            <SlLike size={18} />
            My Likes
          </Link>
        </li>
        <li>
          <Link
          onClick={onLinkClick}
            to="/comments/my-comments"
            className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:text-white hover:bg-red-600 transition"
          >
            <FaComment size={18} />
            My Comments
          </Link>
        </li>
    
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
      </ul>
    </nav>
  );
}

export default Navbar;
