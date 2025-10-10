import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Layout() {
  const location = useLocation();

  // Hide header on admin routes
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header />} {/* Hide header if it's an admin route */}
      <main className='h-screen'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
