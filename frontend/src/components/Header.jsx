// components/Header.jsx
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import SearchComponent from './SearchComponent';
import Navbar from './Navbar';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="w-full bg-white shadow-md px-4 py-3 z-50 sticky top-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Search Component (visible on md and above) */}
        <div className="hidden md:flex flex-grow-2 mx-6 max-w-xl">
          <SearchComponent />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex">
          <Navbar />
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 border-t pt-4 px-2 pb-4 bg-white shadow-inner">
          <div className="mb-4">
            <SearchComponent />
          </div>
          <Navbar />
        </div>
      )}
    </header>
  );
}

export default Header;
