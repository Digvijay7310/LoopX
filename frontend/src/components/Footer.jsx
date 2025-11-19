import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaYoutube, FaTwitter, FaGithub } from 'react-icons/fa';
import Logo from './Logo';

function Footer() {
  const year = useMemo(() => new Date().getFullYear(), [])
  return (
    <footer className="bg-gray-950 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {/* Branding */}
        <div>
          <Logo />
          <p className="text-gray-400 mt-2 text-xl">
            Share. Explore. Enjoy endless videos. Built for creators, loved by viewers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white mb-2 text-2xl">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/" aria-label='home' className="hover:text-red-500 text-lg">
                Home
              </Link>
            </li>
            <li>
              <Link to="/videos/home" aria-label='explore' className="hover:text-red-500 text-lg">
                Explore
              </Link>
            </li>
            <li>
              <Link to="/videos/upload" aria-label='Upload' className="hover:text-red-500 text-lg">
                Upload
              </Link>
            </li>
            <li>
              <Link to="/users/me" aria-label='My profile' className="hover:text-red-500 text-lg">
                My Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="font-semibold text-white mb-2 text-2xl">Connect With Us</h3>
          <div className="flex gap-4 mt-1">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label='Youtube'
              className="hover:text-red-600"
            >
              <FaYoutube size={20} />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label='X'
              className="hover:text-blue-400"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://github.com/Digvijay7310/"
              target="_blank"
              rel="noreferrer"
              aria-label='Github'
              className="hover:text-gray-400"
            >
              <FaGithub size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-lg">
        © {year} LoopX. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
