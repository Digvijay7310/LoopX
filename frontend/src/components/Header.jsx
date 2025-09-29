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
    <header className="relative bg-white shadow-md p-4 flex items-center justify-between z-50">
      {/* Logo */}
      <Logo />

      {/* Search (hidden on mobile) */}
      <div className="flex-grow max-w-xl mx-4 hidden sm:block">
        <SearchComponent />
      </div>

      {/* Desktop Nav */}
      <nav className="hidden sm:flex">
        <Navbar />
      </nav>

      {/* Hamburger button (mobile) */}
      <button
        onClick={toggleMenu}
        className="sm:hidden text-gray-700 focus:outline-none z-50"
        aria-label="Toggle menu"
      >
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-white shadow-md p-4 flex flex-col gap-4 sm:hidden z-50 border-t">
          <SearchComponent />
          <Navbar isMobile onLinkClick={() => setMenuOpen(false)} />
        </nav>
      )}
    </header>
  );
}

export default Header;
