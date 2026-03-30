import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#020617] text-gray-300 font-mono overflow-x-hidden">
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
