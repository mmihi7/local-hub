
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
    <div className={`rounded-md border border-border bg-white dark:bg-gray-800 shadow-sm relative overflow-hidden ${className}`}>
      <div className="flex items-center justify-between p-3 bg-muted/30 dark:bg-gray-700 border-b border-border">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <span>Recent Conversations</span>
        </h3>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 rounded-full hover:bg-muted"
          onClick={onClose}
          aria-label="Close panel"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-4 max-h-[calc(100vh-400px)] overflow-y-auto">
        {chatHistory.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No recent conversations</p>
        ) : (
          <div className="space-y-2">
            {chatHistory.map((message, index) => (
              <div 
                key={index} 
                className="p-3 cursor-pointer hover:bg-muted/50 dark:hover:bg-gray-700 rounded-md transition-colors flex items-center gap-2"
              >
                <span className="text-sm truncate">{message}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHistory;
