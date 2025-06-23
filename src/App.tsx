import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import TimelineComponent from './components/TimelineComponent';
import AlertsPanel from './components/AlertsPanel';
import FilterSearch from './components/FilterSearch';
import ChartsPanel from './components/ChartsPanel';
import Login from './components/Login';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

interface Alert {
  id: string;
  message: string;
  timestamp: number;
  type: 'info' | 'warning' | 'error';
}

// Dummy vehicle data for ChartsPanel demonstration
const dummyVehicleData = [
  { id: 'V001', latitude: 40.7128, longitude: -74.0060, status: 'moving', temperature: 25, battery: 80 },
  { id: 'V001', latitude: 40.7130, longitude: -74.0058, status: 'moving', temperature: 26, battery: 79 },
  { id: 'V002', latitude: 40.7200, longitude: -74.0100, status: 'stopped', temperature: 22, battery: 90 },
];

const MainAppContent: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  const [alerts, setAlerts] = useState<Alert[]>([
    { id: '1', message: 'Vehicle A deviated from route!', timestamp: Date.now() - 60000, type: 'error' },
    { id: '2', message: 'Temperature anomaly in Vehicle B', timestamp: Date.now() - 120000, type: 'warning' },
  ]);

  const handleTimeChange = (timestamp: number) => {
    console.log('Time changed to:', new Date(timestamp).toLocaleString());
    // Aquí se manejaría la lógica para actualizar los datos del mapa según el tiempo seleccionado
  };

  const handleDismissAlert = (id: string) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
  };

  const handleFilterChange = (filters: { status?: string; type?: string; batteryLevel?: number; searchTerm?: string }) => {
    console.log('Filters applied:', filters);
    // Aquí se manejaría la lógica para filtrar los vehículos en el mapa
  };

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="App">
      <button onClick={logout} className="logout-button">Logout</button>
      <MapComponent />
      <TimelineComponent onTimeChange={handleTimeChange} />
      <AlertsPanel alerts={alerts} onDismissAlert={handleDismissAlert} />
      <FilterSearch onFilterChange={handleFilterChange} />
      <ChartsPanel vehicleData={dummyVehicleData} />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <MainAppContent />
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;


