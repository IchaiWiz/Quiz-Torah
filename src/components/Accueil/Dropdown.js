// components/Dropdown.js
import React from 'react';
import './dropdown.css';

const Dropdown = ({ options, value, onChange, placeholder }) => (
  <select className='dropdown' value={value} onChange={(e) => onChange(e.target.value)}>
    <option value="">{placeholder}</option>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

export default Dropdown;
