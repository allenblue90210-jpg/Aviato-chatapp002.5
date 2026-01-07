import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center px-4 py-3 bg-card border-b border-border sticky top-0 z-10 h-16">
      {/* Left: Name (Replacing the logo's original position) */}
      <h1 
        onClick={() => navigate('/match')}
        className="absolute left-4 text-xl font-bold text-primary cursor-pointer hover:text-primary/90 transition-colors"
      >
        Aviato
      </h1>

      {/* Center: Logo */}
      <img 
        src="https://customer-assets.emergentagent.com/job_messaging-app-253/artifacts/55vxbv1v_aviato.png" 
        alt="Aviato" 
        className="h-12 w-auto object-contain"
      />
    </div>
  );
};

export default TopBar;
