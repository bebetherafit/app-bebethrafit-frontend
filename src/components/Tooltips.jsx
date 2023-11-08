// Tooltip.js
import React from 'react';
import '../styles/Tooltips.css'

const Tooltip = ({ children, text }) => {
  return (
    <div className="tooltip-container">
      {children}
      <div className="tooltip-content">{text}</div>
    </div>
  );
};

export default Tooltip;
