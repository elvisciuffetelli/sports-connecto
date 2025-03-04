
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Users, MessageCircle, User } from 'lucide-react';

const TabBar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const tabs = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Discover', path: '/discover', icon: Search },
    { name: 'Social', path: '/social', icon: Users },
    { name: 'Messages', path: '/messages', icon: MessageCircle },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 glass border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            className={`flex flex-col items-center justify-center w-full h-full transition-all duration-200 ${
              isActive(tab.path) 
                ? 'text-primary' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <tab.icon className={`h-5 w-5 ${isActive(tab.path) ? 'animate-float' : ''}`} />
            <span className="text-xs mt-1">{tab.name}</span>
            {isActive(tab.path) && (
              <div className="absolute bottom-0 w-10 h-1 bg-primary rounded-t-md"></div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TabBar;
