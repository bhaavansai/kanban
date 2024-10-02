import React from 'react';

function SortDropdown({ options, onSelect }) {
  return (
    <div className="sort-dropdown">
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="none">None</option>
        {options.map((option) => (
          <option key={option} value={option}>
            Sort by {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortDropdown;