
import React from 'react';
import { Clock } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ChatHistory = () => {
  const { chatHistory } = useTheme();

  if (!chatHistory.length) {
    return null;
  }

  return (
    <div className="rounded-xl border border-border p-4 bg-white shadow-sm">
      <h3 className="font-medium mb-3 flex items-center gap-2">
        <Clock className="w-4 h-4" />
        <span>Recent Conversations</span>
      </h3>
      <ul className="space-y-2">
        {chatHistory.map((message, index) => (
          <li 
            key={index} 
            className="text-sm text-foreground/80 hover:text-foreground cursor-pointer hover:underline truncate"
          >
            {message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatHistory;
