
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
        <Lightbulb className="w-3 h-3" />
        <span>Suggested Topics</span>
      </h3>
      <div className="space-y-2">
        {countyInfo.suggestedTopics.map((topic, index) => (
          <div key={index} className="cursor-pointer group">
            <h4 className="text-xs font-medium group-hover:text-primary">{topic.title}</h4>
            <p className="text-xs text-muted-foreground">{topic.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedTopics;
