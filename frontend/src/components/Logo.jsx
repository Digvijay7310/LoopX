// components/Logo.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaVideo } from 'react-icons/fa';

function Logo() {
  return (
    <Link to="/video/home" className="text-2xl font-bold text-red-600 flex items-center gap-2">
      <FaVideo />
      <span>LoopX</span>
    </Link>
  );
}

export default Logo;
