
import React, { useState, useEffect } from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import ChatInterface from '@/components/Chat/ChatInterface';
import MapView from '@/components/Chat/MapView';
import SuggestedTopics from '@/components/Chat/SuggestedTopics';
import ChatHistory from '@/components/Chat/ChatHistory';
import { useIsMobile } from '@/hooks/use-mobile';
import { ResizablePanelGroup, ResizablePanel } from '@/components/ui/resizable';

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
        map: true,
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

  const areAllPanelsClosed = !visiblePanels.topics && !visiblePanels.history;

  return (
    <div className="flex flex-col min-h-screen">
      <Header visiblePanels={visiblePanels} setVisiblePanels={setVisiblePanels} />
      
      <main className="flex-grow pt-16 pb-16 flex flex-col">
        {/* Map View - Full Width at Top */}
        {visiblePanels.map && (
          <div className="w-full h-[300px] mb-4 px-4">
            <MapView 
              className="h-full"
              onClose={() => togglePanel('map')}
            />
          </div>
        )}
        
        {/* Two Column Layout Below Map */}
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-4 flex-grow">
          {/* Chat Interface Column - 60% width when panels visible */}
          <div className={`w-full ${areAllPanelsClosed ? 'lg:w-full' : 'lg:w-[60%]'} transition-all duration-300`}>
            <ChatInterface />
          </div>
          
          {/* Right Column - Topics and History */}
          {!areAllPanelsClosed && (
            <div className="w-full lg:w-[40%] space-y-4">
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
