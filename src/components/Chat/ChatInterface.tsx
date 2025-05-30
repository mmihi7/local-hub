
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Image, RefreshCw, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatInterfaceProps {
  className?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ className }) => {
  const { county, countyInfo, addToChatHistory } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: `Hello! I'm your Local AI assistant for ${countyInfo.displayName}. How can I help you today?`,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update welcome message when county changes
  useEffect(() => {
    setMessages([{
      id: 1,
      content: `Hello! I'm your Local AI assistant for ${countyInfo.displayName}. How can I help you today?`,
      sender: 'ai',
      timestamp: new Date()
    }]);
  }, [county, countyInfo]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Typing effect for AI messages
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.sender === 'ai' && lastMessage.isTyping) {
      const timeout = setTimeout(() => {
        setMessages(messages.map(msg => 
          msg.id === lastMessage.id ? { ...msg, isTyping: false } : msg
        ));
      }, 1500);
      
      return () => clearTimeout(timeout);
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    addToChatHistory(inputValue);
    setInputValue('');
    setIsLoading(true);
    
    // Add AI placeholder for typing effect
    setTimeout(() => {
      const aiResponse = getAIResponse(inputValue, countyInfo.displayName);
      
      const aiMessage: Message = {
        id: messages.length + 2,
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        isTyping: true
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 500);
  };

  const getAIResponse = (userInput: string, county: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('restaurant') || input.includes('food') || input.includes('eat')) {
      return `I found several great restaurants in ${county}! Some popular options include ${county} Bistro (rating: 4.5/5), Green Gardens Restaurant (rating: 4.3/5), and The Milimani Hotel (rating: 4.2/5). Would you like more details about any of these?`;
    } else if (input.includes('event') || input.includes('happening') || input.includes('weekend')) {
      return `This weekend in ${county}: 1) ${county} Marathon (Saturday, 7 AM), 2) Cultural Festival at ${county} Cultural Center (Saturday-Sunday, 10 AM-6 PM), 3) Farmers Market at County Grounds (Sunday, 8 AM-2 PM). Would you like more information about any of these events?`;
    } else if (input.includes('government') || input.includes('service') || input.includes('county')) {
      return `${county} County Government offers various services including: Business permits, Land rates payment, Marriage certificates, Birth registrations, and Agricultural extension services. Most services can be accessed at the County Headquarters or through their online portal.`;
    } else if (input.includes('business') || input.includes('register')) {
      return `To register a business in ${county}, you need to: 1) Reserve a business name at the Registrar of Companies, 2) Register for a KRA PIN, 3) Apply for a business permit at the ${county} County offices, 4) Register for VAT if applicable. Would you like me to explain any of these steps in more detail?`;
    } else if (input.includes('tourist') || input.includes('attraction') || input.includes('visit')) {
      if (county === 'Kakamega') {
        return "Top attractions in Kakamega include: 1) Kakamega Forest - Kenya's only tropical rainforest with amazing biodiversity, 2) Crying Stone of Ilesi - a natural rock formation, 3) Bull fighting arenas in Khayega and Malinya, 4) Mumias Cultural Center, 5) Kibabii University Botanical Gardens. Would you like directions to any of these places?";
      } else if (county === 'Nairobi') {
        return "Top attractions in Nairobi include: 1) Nairobi National Park, 2) Giraffe Centre, 3) Karen Blixen Museum, 4) Nairobi National Museum, 5) Karura Forest. Would you like directions to any of these places?";
      } else {
        return "Top attractions in Mombasa include: 1) Fort Jesus, 2) Old Town, 3) Haller Park, 4) Mombasa Marine National Park, 5) Nyali Beach. Would you like directions to any of these places?";
      }
    } else {
      return `Thank you for your question about ${county}. To provide you with the most accurate information, could you please specify what particular aspect of ${userInput} you're interested in learning about?`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="rounded-md border border-border bg-white dark:bg-gray-800 shadow-sm relative overflow-hidden h-full flex flex-col">
      <div className="flex items-center justify-between p-3 bg-muted/30 dark:bg-gray-700 border-b border-border">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary" />
          <span>Chat</span>
        </h3>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-6">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={cn(
                "flex",
                message.sender === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div 
                className={cn(
                  "max-w-[80%] px-3 py-2 rounded-md",
                  message.sender === 'user' 
                    ? "bg-primary text-white"
                    : "bg-muted/50 text-foreground"
                )}
              >
                <div className={cn(
                  "text-sm",
                )}>
                  {message.isTyping ? (
                    <TypewriterEffect text={message.content} />
                  ) : (
                    message.content
                  )}
                </div>
                <div 
                  className={cn(
                    "text-xs mt-1",
                    message.sender === 'user' ? "text-primary-foreground/70" : "text-foreground/40"
                  )}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="text-sm flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="p-4 bg-muted/30 dark:bg-gray-700 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full p-3 pr-12 border border-border bg-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm"
              placeholder="Type your message..."
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground rounded-full p-1 h-auto"
              >
                <Image className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground rounded-full p-1 h-auto"
              >
                <Mic className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <Button
            onClick={handleSendMessage}
            className="bg-primary hover:bg-primary/90 text-white h-10 w-10 rounded-md flex items-center justify-center p-0 flex-shrink-0"
            disabled={inputValue.trim() === '' || isLoading}
          >
            {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Create a new typewriter effect component
const TypewriterEffect: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30); // Speed of typing
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);
  
  return (
    <span>
      {displayedText}
      {currentIndex < text.length && (
        <span className="inline-block w-1 h-4 ml-0.5 bg-primary animate-pulse"></span>
      )}
    </span>
  );
};

export default ChatInterface;
