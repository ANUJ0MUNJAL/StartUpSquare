import React, { useEffect, useState } from 'react';
import { PitchDetails } from './PitchDetails';
import '../css/investor.css';
import { Error } from './Error';

export const Investor = () => {
  if (localStorage.role === 'pitcher') {
    return <Error />;
  }

  const [investments, setInvestments] = useState([]);
  const [selectedPitch, setSelectedPitch] = useState(null);

  const fetchInvestments = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/pitches/showall', {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setInvestments(data);
      } else {
        console.error('Failed to fetch investments');
      }
    } catch (error) {
      console.error('Error fetching investments', error);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  const handleViewPitch = (pitch) => {
    setSelectedPitch(pitch);
  };

  const handleCloseDetails = () => {
    setSelectedPitch(null);
  };

  const handleContactPitcher = (email) => {
    // Assuming you want to open the default email client with the email pre-filled
    console.log(email);
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="investor-container">
      <div className="investor-header">
        <h1>My Investments</h1>
      </div>
      <ul className="investor-list">
        {investments.map((investment) => (
          <li className="investor-item" key={investment._id}>
            <div>
              <h2 className="investor-title">{investment.title}</h2>
              <p>{investment.description}</p>
            </div>
            <div className="investor-actions">
              <button
                className="investor-action"
                onClick={() => handleViewPitch(investment)}
              >
                View Pitch
              </button>
              <button
                className="investor-action"
                onClick={() => handleContactPitcher(investment.entrepreneurEmail)}
              >
                Contact
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedPitch && (
        <PitchDetails pitch={selectedPitch} onClose={handleCloseDetails} />
      )}
    </div>
  );
};
