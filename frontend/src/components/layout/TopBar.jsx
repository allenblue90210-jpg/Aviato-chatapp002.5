
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-start items-center px-4 py-3 bg-card border-b border-border sticky top-0 z-10">
      <h1 
        onClick={() => navigate('/match')}
        className="text-xl font-bold text-primary cursor-pointer hover:text-primary/90 transition-colors flex items-center"
      >
        <img 
          src="https://customer-assets.emergentagent.com/job_messaging-app-253/artifacts/qzzmcpqd_aviato.png" 
          alt="Aviato" 
          className="h-8 w-auto object-contain"
        />
      </h1>
    </div>
  );
};

export default TopBar;
