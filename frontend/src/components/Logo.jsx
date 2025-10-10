import React from 'react';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/video/home" className="text-4xl font-bold text-red-600 flex items-center gap-2">
      <span>LoopX</span>
    </Link>
  );
}

export default Logo;
