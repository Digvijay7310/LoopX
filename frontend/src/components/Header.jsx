import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchComponent from './SearchComponent';
import { FaUser, FaHeart, FaComments, FaBars, FaTimes, FaHome, FaSignInAlt, FaVideo } from 'react-icons/fa';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="relative bg-white shadow-md p-4 flex items-center justify-between z-50">
      {/* Logo */}
      <Link to="/video/home" className="text-2xl font-bold text-red-600 flex items-center gap-2">
        <FaVideo />
        <span>LoopX</span>
      </Link>

      {/* Search: hidden on mobile */}
      <div className="flex-grow max-w-xl mx-4 hidden sm:block">
        <SearchComponent />
      </div>

      {/* Desktop nav */}
      <nav className="hidden sm:flex gap-6 text-gray-700 items-center">
        <Link to="/video/home" className="flex items-center gap-1 hover:text-red-600">
          <FaHome /> Home
        </Link>
        <Link to="/auth/login" className="flex items-center gap-1 hover:text-red-600">
          <FaSignInAlt /> Login
        </Link>
        <Link to="/users/me" className="flex items-center gap-1 hover:text-red-600">
          <FaUser /> Profile
        </Link>
        <Link to="/users/my-likes" className="flex items-center gap-1 hover:text-red-600">
          <FaHeart /> Likes
        </Link>
        <Link to="/users/my-comments" className="flex items-center gap-1 hover:text-red-600">
          <FaComments /> Comments
        </Link>
      </nav>

      {/* Hamburger menu button for mobile */}
      <button
        onClick={toggleMenu}
        className="sm:hidden text-gray-700 focus:outline-none z-50"
        aria-label="Toggle menu"
      >
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile nav menu */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-white shadow-md p-4 flex flex-col gap-4 sm:hidden z-50 border-t">
          <SearchComponent />
          <Link
            to="/video/home"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-gray-700 hover:text-red-600"
          >
            <FaHome /> Home
          </Link>
          <Link
            to="/auth/login"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-gray-700 hover:text-red-600"
          >
            <FaSignInAlt /> Login
          </Link>
          <Link
            to="/users/me"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-gray-700 hover:text-red-600"
          >
            <FaUser /> Profile
          </Link>
          <Link
            to="/users/my-likes"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-gray-700 hover:text-red-600"
          >
            <FaHeart /> Likes
          </Link>
          <Link
            to="/users/my-comments"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-gray-700 hover:text-red-600"
          >
            <FaComments /> Comments
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
