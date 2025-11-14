import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';

function Layout() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header />} 
      <main className="flex-grow min-h-screen">
     <Outlet />
     <ScrollToTopButton /> 
      </main>
      <Footer />
    </>
  );
}

export default Layout;
