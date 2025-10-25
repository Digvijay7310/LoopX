import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from './Logo';
import SearchComponent from './SearchComponent';
import Navbar from './Navbar';
import { FaTimes, FaBars } from 'react-icons/fa';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const location = useLocation();

  // Toggle menu open/close
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      {/* Sticky Header */}
      <header className="w-full bg-white shadow-lg px-4 py-3 z-50 sticky top-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo />

          {/* Desktop Search */}
          <div className="hidden md:flex flex-grow mx-6 max-w-xl">
            <SearchComponent />
          </div>

          {/* Hamburger icon */}
          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none cursor-pointer z-50"
            aria-label="Toggle menu"
          >
            <FaBars size={24} />
          </button>
        </div>
      </header>

      {/* Overlay + Sidebar Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[9999] flex">
          {/* Backdrop */}
          <div className="flex-1 bg-black/30" />

          {/* Sidebar */}
          <div
            ref={menuRef}
            className="w-[300px] sm:w-[350px] md:w-[400px] h-full bg-white shadow-lg p-4 overflow-y-auto relative"
          >
            {/* Close Icon */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 text-gray-700"
              aria-label="Close menu"
            >
              <FaTimes size={24} />
            </button>

            {/* Mobile search */}
            <div className="mb-4 mt-8 md:hidden">
              <SearchComponent />
            </div>

            {/* Navbar */}
            <Navbar onLinkClick={() => setMenuOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
