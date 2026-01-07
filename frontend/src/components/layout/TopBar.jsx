import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center px-4 py-3 bg-card border-b border-border sticky top-0 z-10 h-16">
      {/* Left: Logo (Clickable) */}
      <div 
        onClick={() => navigate('/match')}
        className="absolute left-4 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <img 
          src="https://customer-assets.emergentagent.com/job_messaging-app-253/artifacts/55vxbv1v_aviato.png" 
          alt="Aviato" 
          className="h-12 w-auto object-contain"
        />
      </div>

      {/* Center: Name */}
      <h1 className="text-xl font-bold text-primary">
        Aviato
      </h1>
    </div>
  );
};

export default TopBar;
