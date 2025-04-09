
import React from 'react';
import { Lightbulb, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

interface SuggestedTopicsProps {
  className?: string;
  onClose?: () => void;
}

const SuggestedTopics: React.FC<SuggestedTopicsProps> = ({ className, onClose }) => {
  const { countyInfo } = useTheme();
  
  return (
    <div className={`rounded-md border border-border bg-white dark:bg-gray-800 shadow-sm relative overflow-hidden ${className}`}>
      <div className="flex items-center justify-between p-3 bg-muted/30 dark:bg-gray-700 border-b border-border">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-primary" />
          <span>Suggested Topics</span>
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
      
      <div className="p-4 space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto">
        {countyInfo.suggestedTopics.map((topic, index) => (
          <div key={index} className="p-3 hover:bg-muted/50 rounded-md cursor-pointer transition-colors group">
            <h4 className="text-sm font-medium mb-1 group-hover:text-primary">{topic.title}</h4>
            <p className="text-sm text-muted-foreground">{topic.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedTopics;
