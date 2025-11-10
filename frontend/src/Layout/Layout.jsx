import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';

function Layout() {
  const location = useLocation();

  // Hide header on admin routes
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header />} {/* Hide header if it's an admin route */}
      <main className='flex-grow min-h-screen h-auto'>
        <Outlet />
        <ScrollToTopButton />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
