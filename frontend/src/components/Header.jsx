import { useState } from "react";
import Logo from './Logo'
import SearchComponent from './SearchComponent'
import Navbar from './Navbar'
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
          <div className="hidden md:flex flex-grow-2 mx-6 max-w-xl">
            <SearchComponent />
          </div>
          <nav className="hidden md:flex">
            <Navbar />
          </nav>
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu outside of sticky header */}
      {menuOpen && (
        <div className="md:hidden border-t pt-4 px-4 pb-4 bg-white shadow-inner">
          <div className="mb-4">
            <SearchComponent />
          </div>
          <Navbar />
        </div>
      )}
    </>
  );
}


export default Header