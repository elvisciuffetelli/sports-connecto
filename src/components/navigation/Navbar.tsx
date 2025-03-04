
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Home';
      case '/discover':
        return 'Discover';
      case '/social':
        return 'Social';
      case '/messages':
        return 'Messages';
      case '/profile':
        return 'Profile';
      default:
        return 'SportsConnect';
    }
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold">{getTitle()}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 bg-primary w-2 h-2 rounded-full"></span>
          </Button>
          <Link to="/messages">
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <MessageSquare className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
