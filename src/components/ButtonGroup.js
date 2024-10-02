import React from 'react';

function ButtonGroup({ options, onSelect }) {
  return (
    <div className="button-group">
      {options.map((option) => (
        <button key={option} onClick={() => onSelect(option)} className={`button ${option === onSelect ? 'active' : ''}`}>
          {option}
        </button>
      ))}
    </div>
  );
}

export default ButtonGroup;