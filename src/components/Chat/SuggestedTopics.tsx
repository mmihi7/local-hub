
import React from 'react';
import { Lightbulb } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const SuggestedTopics = () => {
  const { countyInfo } = useTheme();
  
  return (
    <div className="rounded-xl border border-border p-4 bg-white/70 backdrop-blur-sm shadow-sm">
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
