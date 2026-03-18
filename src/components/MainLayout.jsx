import React from 'react';
import CyberBackground from './CyberBackground';

const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-gray-300 font-mono overflow-x-hidden">
      <CyberBackground />
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
