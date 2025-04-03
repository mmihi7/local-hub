
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const MapView = () => {
  const { countyInfo } = useTheme();
  const [mapboxToken, setMapboxToken] = useState('');

  return (
    <div className="rounded-xl border border-border overflow-hidden bg-white/70 backdrop-blur-sm shadow-sm h-64 relative">
      <div className="p-3 absolute z-10 top-0 left-0 right-0 bg-gradient-to-b from-background/80 to-transparent">
        <h3 className="text-sm font-medium flex items-center gap-1">
          <MapPin className="w-3 h-3 text-destructive" />
          <span>{countyInfo.displayName} Map</span>
        </h3>
      </div>
      
      {!mapboxToken ? (
        <div className="flex flex-col items-center justify-center h-full p-4 space-y-2">
          <p className="text-xs text-muted-foreground text-center">
            Enter your Mapbox public token to view the map
          </p>
          <input 
            type="text"
            placeholder="Mapbox public token"
            className="w-full p-2 text-xs border rounded"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
          />
          <p className="text-xs text-muted-foreground text-center">
            Get your token at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="underline">mapbox.com</a>
          </p>
        </div>
      ) : (
        <div className="h-full w-full bg-muted flex items-center justify-center">
          <p className="text-xs text-muted-foreground">Map would load here with token: {mapboxToken.slice(0, 5)}...</p>
        </div>
      )}
    </div>
  );
};

export default MapView;
