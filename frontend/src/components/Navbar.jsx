import { Link, useNavigate } from 'react-router-dom';
import {
  FaUpload,
  FaUserCircle,
  FaSignOutAlt,
  FaSign
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
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-4xl cursor-pointer bg-red-600 text-white font-semibold focus:outline-none"
              >
                <FaSignOutAlt /> Logout
              </button>
            </li>

          <li>
            <Link
              to="/auth/login"
              className="flex items-center gap-2 px-4 py-2 rounded-4xl cursor-pointer bg-red-600 text-white font-semibold focus:outline-none"
            >
              <FaSign /> Login
            </Link>
          </li>

      </ul>
    </nav>
  );
}

export default Navbar;
