
import React from 'react';
import { Lightbulb } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const SuggestedTopics = () => {
  const { countyInfo } = useTheme();
  
  return (
    <div className="rounded-xl border border-border p-4 bg-white shadow-sm">
      <h3 className="font-medium mb-3 flex items-center gap-2">
        <Lightbulb className="w-4 h-4" />
        <span>Suggested Topics</span>
      </h3>
      <div className="space-y-3">
        {countyInfo.suggestedTopics.map((topic, index) => (
          <div key={index} className="cursor-pointer group">
            <h4 className="text-sm font-medium group-hover:text-primary">{topic.title}</h4>
            <p className="text-xs text-muted-foreground">{topic.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedTopics;
