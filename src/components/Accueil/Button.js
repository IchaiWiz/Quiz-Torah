// components/Button.js
import React from 'react';
import './Button.css';

const Button = ({ category }) => (
  <button className='button' disabled={!category}>
    Accéder au quiz sur la catégorie "{category}"
  </button>
);

export default Button;
