import { useEffect, useState, useRef } from 'react';

interface VehicleData {
  id: string;
  latitude: number;
  longitude: number;
  status: string;
  temperature: number;
  battery: number;
}

const useWebSocket = (url: string) => {
  const [data, setData] = useState<VehicleData[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connect = () => {
      ws.current = new WebSocket(url);

      ws.current.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
      };

      ws.current.onmessage = (event) => {
        const newData: VehicleData = JSON.parse(event.data);
        setData((prevData) => {
          const existingIndex = prevData.findIndex(v => v.id === newData.id);
          if (existingIndex > -1) {
            const updatedData = [...prevData];
            updatedData[existingIndex] = newData;
            return updatedData;
          } else {
            return [...prevData, newData];
          }
        });
      };

      ws.current.onclose = () => {
        console.log('WebSocket disconnected. Attempting to reconnect...');
        setIsConnected(false);
        setTimeout(connect, 3000); // Reconnect after 3 seconds
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        ws.current?.close();
      };
    };

    connect();

    return () => {
      ws.current?.close();
    };
  }, [url]);

  return { data, isConnected };
};

export default useWebSocket;


