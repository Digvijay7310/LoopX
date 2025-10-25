import React from 'react';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg mb-4">Oops! Page Not Found.</p>
      <a href="/" className="text-blue-600 hover:underline">
        Go back to Home
      </a>
    </div>
  );
}

export default NotFoundPage;
