import React, { createContext, useContext, useState, ReactNode } from 'react';

export type CountyType = 'kakamega' | 'nairobi' | 'mombasa';

interface CountyInfo {
  id: string;
  displayName: string;
  backgroundImage: string;
  suggestedTopics: { title: string; description: string }[];
  coordinates: [number, number]; // [longitude, latitude]
  name: string; 
}

// Export the counties object so it can be used in other components
export const counties: Record<CountyType, CountyInfo> = {
  kakamega: {
    id: 'kakamega',
    displayName: 'Kakamega County',
    backgroundImage: '/kakamega-bg.jpg',
    name: 'kakamega',
    coordinates: [34.7523, 0.2827],
    suggestedTopics: [
      { 
        title: 'Tourism Licensing', 
        description: 'How to get a business permit for a tour guide service near Kakamega Forest?' 
      },
      { 
        title: 'Agricultural Markets', 
        description: 'Where can I find bulk buyers for agricultural produce in Kakamega?' 
      },
      { 
        title: 'Farming Opportunities', 
        description: 'Best locations for starting a dairy goat farming business?' 
      },
      { 
        title: 'Export Business', 
        description: 'How to register a local handicraft export business?' 
      },
      { 
        title: 'Cultural Souvenirs', 
        description: 'Who buys traditional bull fighting memorabilia?' 
      }
    ]
  },
  nairobi: {
    id: 'nairobi',
    displayName: 'Nairobi County',
    backgroundImage: '/nairobi-bg.jpg',
    coordinates: [36.8219, -1.2921],
    name: 'nairobi',
    suggestedTopics: [
      { 
        title: 'Tech Startup', 
        description: 'How to get a business permit for a tech startup in Nairobi?' 
      },
      { 
        title: 'IT Equipment', 
        description: 'Where can I find wholesale computer and IT equipment?' 
      },
      { 
        title: 'Workspace Solutions', 
        description: 'Best coworking spaces for entrepreneurs in Nairobi?' 
      },
      { 
        title: 'Tourism Licensing', 
        description: 'How to register a tour guide business for city tours?' 
      },
      { 
        title: 'Tech Recruitment', 
        description: 'Who hires software developers and IT professionals in bulk?' 
      }
    ]
  },
  mombasa: {
    id: 'mombasa',
    displayName: 'Mombasa County',
    backgroundImage: '/mombasa-bg.jpg',
    coordinates: [39.6682, -4.0435],
    name: 'mombasa',
    suggestedTopics: [
      { 
        title: 'Business Licensing', 
        description: 'How do I get a business permit for a beachfront restaurant?' 
      },
      { 
        title: 'Maritime Equipment', 
        description: 'Where to find wholesale marine fishing equipment?' 
      },
      { 
        title: 'Tourism Routes', 
        description: 'Best routes for tourist boat tours from Mombasa port?' 
      },
      { 
        title: 'Seafood Market', 
        description: 'Who buys fresh seafood in bulk in Mombasa?' 
      },
      { 
        title: 'Historical Tourism', 
        description: 'How to start a tour guide business for historical sites?' 
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
  isLoggedIn: boolean; // Manage login state
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>; // Function to update login state
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [county, setCounty] = useState<CountyType>('kakamega');
  const [chatHistory, setChatHistory] = useState<string[]>([
    "What services are available at the county hospital?",
    "Where can I find local markets?",
    "How do I apply for business permits?"
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Manage login state

  const addToChatHistory = (message: string) => {
    setChatHistory(prev => [...prev, message].slice(-10));
  };

  return (
    <ThemeContext.Provider value={{ 
      county, 
      setCounty, 
      countyInfo: counties[county],
      chatHistory,
      addToChatHistory,
      isLoggedIn, // Provide the login state
      setIsLoggedIn // Provide the function to update the login state
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