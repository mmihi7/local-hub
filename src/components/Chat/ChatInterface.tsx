
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Image, X, ChevronDown, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your Kakamega AI assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [quickQuestions] = useState([
    "What are the top restaurants in Kakamega?",
    "Tell me about government services",
    "What events are happening this weekend?",
    "How can I register my business?",
    "Show me tourist attractions nearby"
  ]);

  // Auto-scroll to the bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
    setInputValue('');
    setIsLoading(true);
    
    // Simulate AI response after delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        content: getAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  // Simple mock AI responses based on user input
  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('restaurant') || input.includes('food') || input.includes('eat')) {
      return "I found several great restaurants in Kakamega! Some popular options include Kakamega Bistro (rating: 4.5/5), Green Gardens Restaurant (rating: 4.3/5), and The Milimani Hotel (rating: 4.2/5). Would you like more details about any of these?";
    } else if (input.includes('event') || input.includes('happening') || input.includes('weekend')) {
      return "This weekend in Kakamega: 1) Kakamega Forest Marathon (Saturday, 7 AM), 2) Cultural Festival at Kakamega Cultural Center (Saturday-Sunday, 10 AM-6 PM), 3) Farmers Market at County Grounds (Sunday, 8 AM-2 PM). Would you like more information about any of these events?";
    } else if (input.includes('government') || input.includes('service') || input.includes('county')) {
      return "Kakamega County Government offers various services including: Business permits, Land rates payment, Marriage certificates, Birth registrations, and Agricultural extension services. Most services can be accessed at the County Headquarters or through their online portal.";
    } else if (input.includes('business') || input.includes('register')) {
      return "To register a business in Kakamega, you need to: 1) Reserve a business name at the Registrar of Companies, 2) Register for a KRA PIN, 3) Apply for a business permit at the Kakamega County offices, 4) Register for VAT if applicable. Would you like me to explain any of these steps in more detail?";
    } else if (input.includes('tourist') || input.includes('attraction') || input.includes('visit')) {
      return "Top attractions in Kakamega include: 1) Kakamega Forest - Kenya's only tropical rainforest with amazing biodiversity, 2) Crying Stone of Ilesi - a natural rock formation, 3) Kakamega Golf Hotel, 4) Mumias Cultural Center, 5) Kibabii University Botanical Gardens. Would you like directions to any of these places?";
    } else {
      return "Thank you for your question about Kakamega. To provide you with the most accurate information, could you please specify what particular aspect of " + userInput + " you're interested in learning about?";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm overflow-hidden border border-border">
      {/* Chat header */}
      <div className="bg-kakamega-500 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <span className="font-semibold">KA</span>
          </div>
          <div>
            <h3 className="font-medium">Kakamega AI Assistant</h3>
            <div className="flex items-center text-xs text-white/70">
              <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2" />
              Online
            </div>
          </div>
        </div>
        <Button variant="ghost" className="text-white hover:bg-white/10 rounded-full p-2 h-auto">
          <ChevronDown className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages container */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
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
                  "max-w-[80%] rounded-2xl px-4 py-2 animate-scale-in",
                  message.sender === 'user' 
                    ? "bg-kakamega-100 text-kakamega-900 rounded-tr-none"
                    : "bg-white shadow-sm border border-gray-100 rounded-tl-none"
                )}
              >
                <div>{message.content}</div>
                <div 
                  className={cn(
                    "text-xs mt-1",
                    message.sender === 'user' ? "text-kakamega-600/70" : "text-gray-400"
                  )}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm border border-gray-100 animate-pulse flex items-center space-x-2">
                <div className="w-2 h-2 bg-kakamega-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-kakamega-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                <div className="w-2 h-2 bg-kakamega-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Quick questions */}
      <div className="p-2 bg-white border-t border-gray-100 overflow-x-auto whitespace-nowrap flex gap-2">
        {quickQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => handleQuickQuestion(question)}
            className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-full hover:bg-gray-50 whitespace-nowrap flex-shrink-0 transition-standard"
          >
            {question}
          </button>
        ))}
      </div>

      {/* Input area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full p-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-kakamega-500 focus:border-transparent resize-none"
              placeholder="Type your message..."
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-gray-600 rounded-full p-1 h-auto"
              >
                <Image className="w-5 h-5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-gray-600 rounded-full p-1 h-auto"
              >
                <Mic className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <Button
            onClick={handleSendMessage}
            className="bg-kakamega-500 hover:bg-kakamega-600 text-white h-10 w-10 rounded-full flex items-center justify-center p-0 flex-shrink-0"
            disabled={inputValue.trim() === '' || isLoading}
          >
            {isLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
