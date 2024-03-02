// PitchForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const PitchForm = ({ onSubmit }) => {
  const [pitchData, setPitchData] = useState({
    title: '',
    description: '',
    pptLink: '',
    videoLink: '',
    // Add more fields as needed
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPitchData({
      ...pitchData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Store pitchData in local storage
    localStorage.setItem('pitchData', JSON.stringify(pitchData));

    // Optionally, you can reset the form fields here
    setPitchData({
      title: '',
      description: '',
      pptLink: '',
      videoLink: '',
      // Reset other fields as needed
    });

    
    navigate('/financial-data');
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create a New Pitch</h2>
      <form className="pitch-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={pitchData.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={pitchData.description}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pptLink">PPT Link:</label>
          <input
            type="text"
            id="pptLink"
            name="pptLink"
            value={pitchData.pptLink}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="videoLink">Video Link:</label>
          <input
            type="text"
            id="videoLink"
            name="videoLink"
            value={pitchData.videoLink}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {/* Add more form groups for additional fields */}
        <button type="submit" className="btn-submit">
          Add Finanancial Details
        </button>
      </form>
    </div>
  );
};


