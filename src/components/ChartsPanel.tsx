import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartsPanelProps {
  vehicleData: {
    id: string;
    latitude: number;
    longitude: number;
    status: string;
    temperature: number;
    battery: number;
  }[];
}

const ChartsPanel: React.FC<ChartsPanelProps> = ({ vehicleData }) => {
  // Example: Data for battery level over time for a specific vehicle
  const selectedVehicleId = vehicleData.length > 0 ? vehicleData[0].id : 
''; // For demonstration, pick the first vehicle
  const selectedVehicleHistory = vehicleData.filter(v => v.id === 
selectedVehicleId);

  const data = {
    labels: selectedVehicleHistory.map((_, index) => `Update ${index + 1}`),
    datasets: [
      {
        label: 'Battery Level (%)',
        data: selectedVehicleHistory.map(v => v.battery),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Temperature (°C)',
        data: selectedVehicleHistory.map(v => v.temperature),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Vehicle ${selectedVehicleId} Data`,
      },
    },
  };

  return (
    <div className="charts-panel-container">
      <h3>Vehicle Statistics</h3>
      {vehicleData.length > 0 ? (
        <Line data={data} options={options} />
      ) : (
        <p>No vehicle data available for charts.</p>
      )}
    </div>
  );
};

export default ChartsPanel;


