import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f172a] to-[#334155] font-sans selection:bg-indigo-500/30">
      <Navbar />
      <main className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
