import React from 'react';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/video/home" className="text-4xl text-red-600 ">
      LoopX
    </Link>
  );
}

export default Logo;
