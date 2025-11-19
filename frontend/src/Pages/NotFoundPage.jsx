import React from 'react';
import { FaHome } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center gap-2 min-h-screen px-2">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg mb-4 text-center">Oops! The page are you looking for is not available or redirect to another url.</p>
      <button onClick={() => navigate("/")}><FaHome size={55} /></button>
      <Link href="/" className="text-blue-600 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
