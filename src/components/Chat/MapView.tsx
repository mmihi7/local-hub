
import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set the Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoibW1paGkiLCJhIjoiY2x6eHdpMmIyMHhhZzJpc2ZuejJvaWZ6NCJ9.CQTSavpQG9Q_u2RRlHeRGA';

const MapView = () => {
  const { countyInfo } = useTheme();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map with the county coordinates
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: countyInfo.coordinates || [36.8219, -1.2921], // Default to Nairobi if no coordinates
      zoom: 10
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add a marker at the center
    new mapboxgl.Marker()
      .setLngLat(countyInfo.coordinates || [36.8219, -1.2921])
      .addTo(map.current);

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [countyInfo.coordinates]);

  return (
    <div className="rounded-xl border border-border overflow-hidden bg-white/70 backdrop-blur-sm shadow-sm h-96 relative">
      <div className="p-3 absolute z-10 top-0 left-0 right-0 bg-gradient-to-b from-background/80 to-transparent">
        <h3 className="text-sm font-medium flex items-center gap-1">
          <MapPin className="w-3 h-3 text-destructive" />
          <span>{countyInfo.displayName} Map</span>
        </h3>
      </div>
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default MapView;
