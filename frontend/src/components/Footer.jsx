import React from 'react';
import { Link } from 'react-router-dom';
import { FaYoutube, FaTwitter, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">

        {/* Branding */}
        <div>
          <h2 className="text-xl font-bold text-red-500">LoopX</h2>
          <p className="text-gray-400 mt-2">
            Share. Explore. Enjoy endless videos. Built for creators, loved by viewers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:text-red-500">Home</Link></li>
            <li><Link to="/explore" className="hover:text-red-500">Explore</Link></li>
            <li><Link to="/upload" className="hover:text-red-500">Upload</Link></li>
            <li><Link to="/profile" className="hover:text-red-500">My Profile</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="font-semibold text-white mb-2">Connect With Us</h3>
          <div className="flex gap-4 mt-1">
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-red-600">
              <FaYoutube size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-400">
              <FaTwitter size={20} />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-gray-400">
              <FaGithub size={20} />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} LoopX. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
