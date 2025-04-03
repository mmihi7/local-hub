
import React, { useEffect } from 'react';
import Header from '@/components/Layout/Header';
import ChatInterface from '@/components/Chat/ChatInterface';
import MapView from '@/components/Chat/MapView';
import SuggestedTopics from '@/components/Chat/SuggestedTopics';
import ChatHistory from '@/components/Chat/ChatHistory';
import { useTheme } from '@/contexts/ThemeContext';

const Chat = () => {
  const { countyInfo } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div 
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `url(${countyInfo.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      <Header />
      
      <main className="flex-grow pt-16 pb-8 relative z-10">
        <div className="container mx-auto px-4 h-[calc(100vh-8rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Chat Interface */}
            <div className="lg:col-span-2 h-full">
              <ChatInterface />
            </div>
            
            {/* Sidebar */}
            <div className="h-full flex flex-col gap-6 overflow-y-auto pb-4">
              <MapView />
              <SuggestedTopics />
              <ChatHistory />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
