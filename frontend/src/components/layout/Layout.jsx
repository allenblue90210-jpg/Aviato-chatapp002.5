
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TopBar from './TopBar';
import BottomNav from './BottomNav';

const Layout = () => {
  const location = useLocation();
  const showTopBar = !location.pathname.startsWith('/profile');

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-border">
      {showTopBar && <TopBar />}
      <main className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;
