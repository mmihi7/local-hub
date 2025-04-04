
import React from 'react';
import { Clock, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

interface ChatHistoryProps {
  className?: string;
  onClose?: () => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ className, onClose }) => {
  const { chatHistory } = useTheme();
  
  return (
    <div className={`border border-border p-4 bg-white/70 backdrop-blur-sm shadow-sm relative ${className}`}>
      <div className="absolute top-2 right-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 hover:bg-muted rounded-full panel-close-btn"
          onClick={onClose}
          aria-label="Close panel"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
      <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
        <Clock className="w-3 h-3" />
        <span>Recent Conversations</span>
      </h3>
      <div className="space-y-1">
        {chatHistory.map((message, index) => (
          <div key={index} className="cursor-pointer hover:bg-muted/50 p-1 rounded-md text-xs">
            {message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;
