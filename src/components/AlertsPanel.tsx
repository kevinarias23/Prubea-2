import React from 'react';

interface Alert {
  id: string;
  message: string;
  timestamp: number;
  type: 'info' | 'warning' | 'error';
}

interface AlertsPanelProps {
  alerts: Alert[];
  onDismissAlert: (id: string) => void;
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts, onDismissAlert }) => {
  return (
    <div className="alerts-panel-container">
      <h3>Alerts & Notifications</h3>
      {alerts.length === 0 ? (
        <p>No new alerts.</p>
      ) : (
        <ul>
          {alerts.map(alert => (
            <li key={alert.id} className={`alert-item alert-${alert.type}`}>
              <span>{new Date(alert.timestamp).toLocaleTimeString()} - {alert.message}</span>
              <button onClick={() => onDismissAlert(alert.id)}>Dismiss</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlertsPanel;


