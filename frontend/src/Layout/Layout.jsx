import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';

function Layout() {
  const location = useLocation();

  // Hide header on admin routes
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header />} {/* Hide header if it's an admin route */}
      <Outlet />
    </>
  );
}

export default Layout;
