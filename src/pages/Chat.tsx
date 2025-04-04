
import React, { useEffect, useState } from 'react';
import Header from '@/components/Layout/Header';
import ChatInterface from '@/components/Chat/ChatInterface';
import MapView from '@/components/Chat/MapView';
import SuggestedTopics from '@/components/Chat/SuggestedTopics';
import ChatHistory from '@/components/Chat/ChatHistory';
import { useTheme } from '@/contexts/ThemeContext';
import { X } from 'lucide-react';

const Chat = () => {
  const { countyInfo } = useTheme();
  const [visiblePanels, setVisiblePanels] = useState({
    map: true,
    topics: true,
    history: true
  });

  // Define images for each county
  const countyImages = {
    kakamega: [
      './src/assets/kakamega/1200px-The_Crying_Stone.jpg',
      './src/assets/kakamega/Bullfighting_in_Kakamega,_Kenya.jpg',
      './src/assets/kakamega/Kakamega_Forest_(2293443551).jpg',
    ],
    nairobi: [
      './src/assets/nairobi/A_giraffe_with_a_beautiful_background_of_Nairobi_City_Skyline.jpg',
      './src/assets/nairobi/Nairobi_view_1_(949939763).jpg',
      './src/assets/nairobi/dc799b123d31ac8cb11b1c87dbde-1588429.jpg!d',
    ],
    mombasa: [
      './src/assets/mombasa/Mombasa,_Kenya_-_51971661708.jpg',
      './src/assets/mombasa/Nyali_Beach_from_the_Reef_Hotel_during_high_tide_in_Mombasa,_Kenya_32.jpg',
      './src/assets/mombasa/Nyali_Beach_towards_the_north_from_the_Reef_Hotel_during_high_tide_in_Mombasa,_Kenya_4.jpg',
      './src/assets/mombasa/Tusks_in_City_of_Mombasa.jpg',
    ],
  };

  const selectedCounty = countyInfo.name.toLowerCase();
  const images = countyImages[selectedCounty] || [];
  const randomImage = images[Math.floor(Math.random() * images.length)];

  // Toggle panel visibility
  const togglePanel = (panel) => {
    setVisiblePanels(prev => ({
      ...prev,
      [panel]: !prev[panel]
    }));
  };

  // Check if all panels are closed
  const allPanelsClosed = !visiblePanels.map && !visiblePanels.topics && !visiblePanels.history;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div 
      className="flex flex-col h-screen"
      style={{
        backgroundImage: `url(${randomImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <Header visiblePanels={visiblePanels} setVisiblePanels={setVisiblePanels} />
      
      <main className="flex-grow pt-24 pb-8 relative z-10 overflow-y-auto">
        <div className="container mx-auto px-4 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Chat Interface */}
            <div className={`h-full overflow-hidden ${allPanelsClosed ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
              <ChatInterface className="" />
            </div>
            
            {/* Sidebar */}
            {!allPanelsClosed && (
              <div className="h-full flex flex-col gap-6 overflow-y-auto pb-4">
                {visiblePanels.map && (
                  <div className="h-full overflow-hidden">
                    <div className="flex justify-end bg-white p-1">
                      <button 
                        onClick={() => togglePanel('map')}
                        className="w-5 h-5 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors rounded-sm"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    <MapView className="" />
                  </div>
                )}
                
                {visiblePanels.topics && (
                  <div className="h-full overflow-hidden">
                    <div className="flex justify-end bg-white p-1">
                      <button 
                        onClick={() => togglePanel('topics')}
                        className="w-5 h-5 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors rounded-sm"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    <SuggestedTopics className="" />
                  </div>
                )}
                
                {visiblePanels.history && (
                  <div className="h-full overflow-hidden">
                    <div className="flex justify-end bg-white p-1">
                      <button 
                        onClick={() => togglePanel('history')}
                        className="w-5 h-5 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors rounded-sm"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    <ChatHistory className="" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
