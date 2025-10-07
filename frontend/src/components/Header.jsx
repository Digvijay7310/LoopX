import { useState } from "react";
import Logo from './Logo';
import SearchComponent from './SearchComponent';
import Navbar from './Navbar';
import { FaTimes, FaBars } from "react-icons/fa";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      {/* Sticky Header */}
      <header className="w-full bg-white shadow-md px-4 py-3 z-50 sticky top-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo />

          {/* Search Bar (Hidden in collapsed nav, shown in menu) */}
          <div className="hidden md:flex flex-grow mx-6 max-w-xl">
            <SearchComponent />
          </div>

          {/* Hamburger menu shown on all screen sizes */}
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </header>

      {/* Fullscreen-style Menu for All Screens */}
      {menuOpen && (
        <div className="w-full px-4 pt-4 pb-6 bg-white shadow-inner border-t space-y-4">
          {/* Search bar for all screen sizes inside the expanded menu */}
          <div className="md:hidden mb-4">
            <SearchComponent />
          </div>
          <Navbar />
        </div>
      )}
    </>
  );
}

export default Header;
