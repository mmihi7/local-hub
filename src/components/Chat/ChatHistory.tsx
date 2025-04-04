import React from 'react';
import { Clock } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface ChatHistoryProps {
  className?: string; // Allow className as an optional prop
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ className }) => {
  const { chatHistory } = useTheme();

  if (!chatHistory.length) {
    return null;
  }

  return (
    <div className={`border border-border p-4 bg-white/70 backdrop-blur-sm shadow-sm ${className}`}>
      <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
        <Clock className="w-3 h-3" />
        <span>Recent Conversations</span>
      </h3>
      <ul className="space-y-1.5">
        {chatHistory.map((message, index) => (
          <li 
            key={index} 
            className="text-xs text-foreground/80 hover:text-foreground cursor-pointer hover:underline truncate"
          >
            {message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatHistory;