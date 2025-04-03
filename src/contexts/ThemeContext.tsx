
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type CountyType = 'kakamega' | 'nairobi' | 'mombasa';

interface CountyInfo {
  name: CountyType;
  displayName: string;
  extent: [number, number];
  zoom: number;
  backgroundImage: string;
  suggestedTopics: {
    title: string;
    description: string;
  }[];
}

export const counties: Record<CountyType, CountyInfo> = {
  kakamega: {
    name: 'kakamega',
    displayName: 'Kakamega',
    extent: [34.7519, 0.2827],
    zoom: 12,
    backgroundImage: '/kakamega-bg.jpg',
    suggestedTopics: [
      {
        title: "Bull Fighting",
        description: "Traditional cultural events and locations"
      },
      {
        title: "Kakamega Forest",
        description: "Kenya's only tropical rainforest"
      },
      {
        title: "Local Businesses",
        description: "Find shops, markets, and services"
      },
      {
        title: "County Services",
        description: "Government offices and public services"
      }
    ]
  },
  nairobi: {
    name: 'nairobi',
    displayName: 'Nairobi',
    extent: [36.8219, -1.2921],
    zoom: 12,
    backgroundImage: '/nairobi-bg.jpg',
    suggestedTopics: [
      {
        title: "Tech Hub",
        description: "Startup ecosystem and innovation centers"
      },
      {
        title: "National Parks",
        description: "Nairobi National Park and wildlife"
      },
      {
        title: "Business District",
        description: "Commercial centers and corporate offices"
      },
      {
        title: "Cultural Sites",
        description: "Museums, galleries and historical landmarks"
      }
    ]
  },
  mombasa: {
    name: 'mombasa',
    displayName: 'Mombasa',
    extent: [39.6636, -4.0547],
    zoom: 12,
    backgroundImage: '/mombasa-bg.jpg',
    suggestedTopics: [
      {
        title: "Coastal Tourism",
        description: "Beaches, resorts, and water activities"
      },
      {
        title: "Fort Jesus",
        description: "Historical sites and Portuguese influence"
      },
      {
        title: "Old Town",
        description: "Cultural heritage and architecture"
      },
      {
        title: "Port and Maritime",
        description: "Shipping, logistics and trade"
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
      countyInfo: counties[county],
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
