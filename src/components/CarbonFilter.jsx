import React from 'react';

const CarbonFilter = ({ carbonFootprintValue, onChange }) => {
  const labelForValue = (value) => {
    switch (value) {
      case '0':
        return 'very low';
      case '25':
        return 'low';
      case '50':
        return 'moderate';
      case '75':
        return 'high';
      case '100':
        return 'very high';
      default:
        return '';
    }
  };

  return (
    <div className="carbon-filter">
      <h2>Filter by Carbon Footprint</h2>
      <input 
        type="range" 
        min="0" 
        max="100" 
        step="25"
        value={carbonFootprintValue} 
        onChange={(e) => onChange(e.target.value)} 
        className="slider" 
      />
      <div className="range-values">
        <span>{labelForValue('0')}</span>
        <span>{labelForValue('25')}</span>
        <span>{labelForValue('50')}</span>
        <span>{labelForValue('75')}</span>
        <span>{labelForValue('100')}</span>
      </div>
    </div>
  );
};

export default CarbonFilter;
