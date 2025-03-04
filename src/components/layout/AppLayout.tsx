
import React, { ReactNode } from 'react';
import Navbar from '../navigation/Navbar';
import TabBar from '../navigation/TabBar';
import MotionWrapper from '../shared/MotionWrapper';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6 pb-20">
        <MotionWrapper animation="fade-in">
          {children}
        </MotionWrapper>
      </main>
      <TabBar />
    </div>
  );
};

export default AppLayout;
