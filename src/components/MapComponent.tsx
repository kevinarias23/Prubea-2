import React, { useRef, useEffect, useState, memo } from 'react';
import mapboxgl from 'mapbox-gl';
import useWebSocket from '../services/useWebSocket';
import VehicleMarker from './VehicleMarker';

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN'; // Reemplaza con tu token de acceso de Mapbox

const MapComponent: React.FC = memo(() => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(-74.0060);
  const [lat, setLat] = useState(40.7128);
  const [zoom, setZoom] = useState(9);

  const { data: vehicles, isConnected } = useWebSocket('ws://localhost:8080'); // Reemplaza con la URL de tu WebSocket

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom
      });

      map.current.on('move', () => {
        if (map.current) {
          setLng(parseFloat(map.current.getCenter().lng.toFixed(4)));
          setLat(parseFloat(map.current.getCenter().lat.toFixed(4)));
          setZoom(parseFloat(map.current.getZoom().toFixed(2)));
        }
      });
    }
  }, [lng, lat, zoom]);

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} | WebSocket: {isConnected ? 'Connected' : 'Disconnected'}
      </div>
      <div ref={mapContainer} className="map-container" />
      {map.current && vehicles.map(vehicle => (
        <VehicleMarker key={vehicle.id} map={map.current as mapboxgl.Map} vehicle={vehicle} />
      ))}
    </div>
  );
});

export default MapComponent;


