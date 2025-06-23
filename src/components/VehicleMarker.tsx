import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

interface VehicleMarkerProps {
  map: mapboxgl.Map;
  vehicle: {
    id: string;
    latitude: number;
    longitude: number;
    status: string;
    temperature: number;
    battery: number;
  };
}

const VehicleMarker: React.FC<VehicleMarkerProps> = ({ map, vehicle }) => {
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const el = useRef(document.createElement('div'));

  useEffect(() => {
    if (!map) return;

    el.current.className = 'marker';
    el.current.style.backgroundImage = `url(https://docs.mapbox.com/mapbox-gl-js/assets/car.png)`; // Placeholder image
    el.current.style.width = `30px`;
    el.current.style.height = `30px`;
    el.current.style.backgroundSize = '100%';

    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h3>Vehicle ID: ${vehicle.id}</h3>
       <p>Status: ${vehicle.status}</p>
       <p>Temperature: ${vehicle.temperature}°C</p>
       <p>Battery: ${vehicle.battery}%</p>`
    );

    markerRef.current = new mapboxgl.Marker(el.current)
      .setLngLat([vehicle.longitude, vehicle.latitude])
      .setPopup(popup) // sets a popup on this marker
      .addTo(map);

    return () => {
      markerRef.current?.remove();
    };
  }, [map]);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLngLat([vehicle.longitude, vehicle.latitude]);
      // Update popup content if needed
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h3>Vehicle ID: ${vehicle.id}</h3>
         <p>Status: ${vehicle.status}</p>
         <p>Temperature: ${vehicle.temperature}°C</p>
         <p>Battery: ${vehicle.battery}%</p>`
      );
      markerRef.current.setPopup(popup);
    }
  }, [vehicle]);

  return null;
};

export default VehicleMarker;


