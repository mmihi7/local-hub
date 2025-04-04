
import React, { useState, useEffect } from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import ChatInterface from '@/components/Chat/ChatInterface';
import MapView from '@/components/Chat/MapView';
import SuggestedTopics from '@/components/Chat/SuggestedTopics';
import ChatHistory from '@/components/Chat/ChatHistory';
import { useIsMobile } from '@/hooks/use-mobile';

const Chat = () => {
  const [visiblePanels, setVisiblePanels] = useState({
    map: true,
    topics: true,
    history: true
  });
  
  const isMobile = useIsMobile();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // On mobile, start with only the main chat interface visible
    if (isMobile) {
      setVisiblePanels({
        map: false,
        topics: true,
        history: false
      });
    }
  }, [isMobile]);

  const togglePanel = (panel) => {
    setVisiblePanels(prev => ({
      ...prev,
      [panel]: !prev[panel]
    }));
  };

  const areAllPanelsClosed = !visiblePanels.map && !visiblePanels.topics && !visiblePanels.history;

  return (
    <div className="flex flex-col min-h-screen">
      <Header visiblePanels={visiblePanels} setVisiblePanels={setVisiblePanels} />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-4">
          {/* Main Chat Area */}
          <div className={`w-full ${areAllPanelsClosed ? 'lg:w-full' : 'lg:w-2/3'} transition-all duration-300`}>
            <ChatInterface />
          </div>
          
          {/* Side Panel Container */}
          {!areAllPanelsClosed && (
            <div className="w-full lg:w-1/3 space-y-4">
              {visiblePanels.map && (
                <MapView 
                  onClose={() => togglePanel('map')}
                />
              )}
              
              {visiblePanels.topics && (
                <SuggestedTopics 
                  onClose={() => togglePanel('topics')}
                />
              )}
              
              {visiblePanels.history && (
                <ChatHistory 
                  onClose={() => togglePanel('history')}
                />
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chat;
