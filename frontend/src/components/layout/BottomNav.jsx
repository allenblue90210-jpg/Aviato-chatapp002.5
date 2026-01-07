import React from 'react';
import { MessageSquare, Search, Star, User, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`);
  
  const navItems = [
    { id: 'chat', icon: MessageSquare, label: t('nav.chat'), path: '/chat' },
    { id: 'match', icon: Search, label: t('nav.match'), path: '/match' },
    { id: 'review', icon: Star, label: t('nav.review'), path: '/review' },
    { id: 'profile', icon: User, label: t('nav.profile'), path: '/profile' },
    { id: 'settings', icon: Settings, label: t('nav.settings'), path: '/settings' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border pb-safe pt-2 px-4 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center p-2 min-w-[56px] transition-colors ${
              isActive(item.path) 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <item.icon className={`w-5 h-5 mb-1 ${isActive(item.path) ? 'stroke-2' : 'stroke-1'}`} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
