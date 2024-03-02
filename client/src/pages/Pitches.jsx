// Pitches.jsx
import React, { useEffect, useState } from 'react';
import { PitchForm } from '../components/PitchForm';
import '../css/pitches.css';
import { Error } from './Error';
import { useNavigate } from 'react-router-dom';

export const Pitches = () => {
  const [userToken, setUserToken] = useState(localStorage.token);
  const [pitches, setPitches] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  if (localStorage.role === 'investor') {
    return <Error />;
  }

  const handlePitchSubmit = async (pitchData) => {
    try {
      const response = await fetch('http://localhost:3000/api/pitches/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(pitchData),
      });

      if (response.ok) {
        fetchPitches(); // Fetch pitches again after submission
        // Optionally, you can hide the form after submission
        setShowForm(false);
        // Navigate to FinancialDataPage
        navigate('/financial-data');
      } else {
        console.error('Error submitting pitch');
      }
    } catch (error) {
      console.error('Error submitting pitch', error);
    }
  };

  const handlePitchDelete = async (pitchId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/pitches/${pitchId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.ok) {
        fetchPitches(); // Fetch pitches again after deletion
      } else {
        console.error('Error deleting pitch');
      }
    } catch (error) {
      console.error('Error deleting pitch', error);
    }
  };

  const fetchPitches = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/pitches/show', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPitches(data);
      } else {
        console.error('Failed to fetch pitches');
      }
    } catch (error) {
      console.error('Error fetching pitches', error);
    }
  };

  useEffect(() => {
    fetchPitches();
  }, [userToken]);

  return (
    <div className="pitches-container">
      <h1 className="pitches-header">Your Pitches</h1>
      <ul className="pitches-list">
        {pitches.map((pitch) => (
          <li className="pitch" key={pitch._id}>
            <h3 className="pitch-title">{pitch.title}</h3>
            <p>{pitch.description}</p>
            <button className="btn-delete-pitch" onClick={() => handlePitchDelete(pitch._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <button
        className="btn-show-form"
        onClick={() => setShowForm(true)}
      >
        Create New Pitch
      </button>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <span
              className="close-button"
              onClick={() => setShowForm(false)}
            >
              &times;
            </span>
            {/* Render PitchForm with handlePitchSubmit */}
            <PitchForm className="pitch-form" onSubmit={handlePitchSubmit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Pitches;
