import React from 'react';
import './Button.css';

export const Button = ({ onClick, className = 'wave-button', children }) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};
