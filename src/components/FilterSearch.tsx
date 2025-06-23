import React, { useState } from 'react';

interface FilterSearchProps {
  onFilterChange: (filters: { status?: string; type?: string; batteryLevel?: number; searchTerm?: string }) => void;
}

const FilterSearch: React.FC<FilterSearchProps> = ({ onFilterChange }) => {
  const [status, setStatus] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [batteryLevel, setBatteryLevel] = useState<number | ''>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleFilter = () => {
    onFilterChange({
      status: status || undefined,
      type: type || undefined,
      batteryLevel: batteryLevel === '' ? undefined : Number(batteryLevel),
      searchTerm: searchTerm || undefined,
    });
  };

  return (
    <div className="filter-search-container">
      <h3>Filter & Search</h3>
      <div className="filter-group">
        <label htmlFor="status-filter">Status:</label>
        <select id="status-filter" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="moving">Moving</option>
          <option value="stopped">Stopped</option>
          <option value="charging">Charging</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="type-filter">Type:</label>
        <input type="text" id="type-filter" value={type} onChange={(e) => setType(e.target.value)} placeholder="e.g., Truck, Drone" />
      </div>
      <div className="filter-group">
        <label htmlFor="battery-filter">Min. Battery (%):</label>
        <input type="number" id="battery-filter" value={batteryLevel} onChange={(e) => setBatteryLevel(e.target.value === '' ? '' : Number(e.target.value))} min="0" max="100" />
      </div>
      <div className="filter-group">
        <label htmlFor="search-term">Search:</label>
        <input type="text" id="search-term" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by ID" />
      </div>
      <button onClick={handleFilter}>Apply Filters</button>
    </div>
  );
};

export default FilterSearch;


