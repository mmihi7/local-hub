import React, { createContext, useContext, useState, ReactNode } from 'react';

export type CountyType = 'kakamega' | 'nairobi' | 'mombasa';

interface CountyInfo {
  id: string;
  displayName: string;
  backgroundImage: string;
  suggestedTopics: { title: string; description: string }[];
  coordinates: [number, number]; // [longitude, latitude]
}

const defaultCounties: Record<string, CountyInfo> = {
  kakamega: {
    id: 'kakamega',
    displayName: 'Kakamega County',
    backgroundImage: '/kakamega-bg.jpg',
    coordinates: [34.7523, 0.2827],
    suggestedTopics: [
      { 
        title: 'Bull Fighting', 
        description: 'Learn about the traditional bull fighting culture in Kakamega' 
      },
      { 
        title: 'Kakamega Forest', 
        description: 'Explore the only tropical rainforest in Kenya' 
      },
      { 
        title: 'Local Cuisine', 
        description: 'Discover traditional Western Kenya dishes' 
      }
    ]
  },
  nairobi: {
    id: 'nairobi',
    displayName: 'Nairobi County',
    backgroundImage: '/nairobi-bg.jpg',
    coordinates: [36.8219, -1.2921],
    suggestedTopics: [
      { 
        title: 'Nairobi National Park', 
        description: 'The only national park within a city in the world' 
      },
      { 
        title: 'Tech Innovation', 
        description: 'Explore Nairobi\'s growing tech ecosystem' 
      },
      { 
        title: 'Urban Culture', 
        description: 'Learn about Nairobi\'s diverse urban culture' 
      }
    ]
  },
  mombasa: {
    id: 'mombasa',
    displayName: 'Mombasa County',
    backgroundImage: '/mombasa-bg.jpg',
    coordinates: [39.6682, -4.0435],
    suggestedTopics: [
      { 
        title: 'Old Town', 
        description: 'Discover the historical architecture and culture' 
      },
      { 
        title: 'Coastal Cuisine', 
        description: 'Explore the rich flavors of coastal Kenyan food' 
      },
      { 
        title: 'Beach Activities', 
        description: 'Learn about water sports and beach activities' 
      }
    ]
  }
};

type ThemeContextType = {
  county: CountyType;
  setCounty: (county: CountyType) => void;
  countyInfo: CountyInfo;
  chatHistory: string[];
  addToChatHistory: (message: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [county, setCounty] = useState<CountyType>('kakamega');
  const [chatHistory, setChatHistory] = useState<string[]>([
    "What services are available at the county hospital?",
    "Where can I find local markets?",
    "How do I apply for business permits?"
  ]);

  const addToChatHistory = (message: string) => {
    setChatHistory(prev => [...prev, message].slice(-10));
  };

  return (
    <ThemeContext.Provider value={{ 
      county, 
      setCounty, 
      countyInfo: defaultCounties[county],
      chatHistory,
      addToChatHistory
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
