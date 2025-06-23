import React, { useState } from 'react';

interface TimelineComponentProps {
  onTimeChange: (timestamp: number) => void;
}

const TimelineComponent: React.FC<TimelineComponentProps> = ({ onTimeChange }) => {
  const [selectedTime, setSelectedTime] = useState<number>(Date.now());

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(event.target.value, 10);
    setSelectedTime(newTime);
    onTimeChange(newTime);
  };

  return (
    <div className="timeline-container">
      <h3>Historical Timeline</h3>
      <input
        type="range"
        min={Date.now() - 3600 * 1000 * 24} // Example: 24 hours ago
        max={Date.now()}
        value={selectedTime}
        onChange={handleTimeChange}
        className="timeline-slider"
      />
      <p>Selected Time: {new Date(selectedTime).toLocaleString()}</p>
    </div>
  );
};

export default TimelineComponent;


