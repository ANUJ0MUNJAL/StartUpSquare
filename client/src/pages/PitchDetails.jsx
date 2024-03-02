// PitchDetails.jsx

import React from 'react';

export const PitchDetails = ({ pitch, onClose }) => {
  return (
    <div className="pitch-details-overlay">
      <div className="pitch-details-container">
        <h2>{pitch.title}</h2>
        <p>{pitch.description}</p>
        {/* Add other details you want to display */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};


