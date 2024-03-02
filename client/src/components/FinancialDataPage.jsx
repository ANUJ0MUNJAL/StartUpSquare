import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const FinancialDataPage = () => {
  const [financialData, setFinancialData] = useState({
    revenue: 0,
    expenses: 0,
    cogs: 0,
    costOfAsset: 0,
    salvageValue: 0,
    usefulLife: 0,
    investment: 0,
    equity: 0,
    promisedReturn: 0,
    years: 0,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinancialData({
      ...financialData,
      [name]: name === 'revenue' || name === 'expenses' || name === 'cogs' ||
        name === 'costOfAsset' || name === 'salvageValue' || name === 'usefulLife' ||
        name === 'investment' || name === 'equity' || name === 'promisedReturn' ||
        name === 'years'
        ? parseFloat(value) || 0
        : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // You can submit financialData to the server or store it locally
    // For simplicity, we are using local storage here
    localStorage.setItem('financialData', JSON.stringify(financialData));

    // Retrieve pitchData from local storage
    const pitchData = JSON.parse(localStorage.getItem('pitchData'));

    // Combine pitchData and financialData
    const combinedData = { ...pitchData, ...financialData };

    // Submit the combined data to the server or perform other actions
    console.log('Combined Data:', combinedData);
    
    try {
      
        const response = await fetch('http://localhost:3000/api/pitches/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`,
          },
          body: JSON.stringify(combinedData),
        });
  
        if (response.ok) {
          navigate("/pitches"); // Fetch pitches again after submission
          // Optionally, you can hide the form after submission
          setShowForm(false);
          // Navigate to FinancialDataPage
         
        } else {
          console.error('Error submitting pitch');
        }
      } catch (error) {
        console.error('Error submitting pitch', error);
      }








    // Optionally, you can clear local storage or perform other cleanup
    localStorage.removeItem('pitchData');
    localStorage.removeItem('financialData');
     
    // Navigate to another page or perform other actions
    navigate('/pitches');
  };
  return (
    <div className="financial-data-container">
      <h2>Enter Financial Data</h2>
      <form onSubmit={handleSubmit}>
       
        
        <div className="form-group">
          <label htmlFor="revenue">Revenue:</label>
          <input
            type="number"
            id="revenue"
            name="revenue"
            value={financialData.revenue}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="expenses">Expenses:</label>
          <input
            type="number"
            id="expenses"
            name="expenses"
            value={financialData.expenses}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cogs">Cost of Goods Sold (COGS):</label>
          <input
            type="number"
            id="cogs"
            name="cogs"
            value={financialData.cogs}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="costOfAsset">Cost of Asset:</label>
          <input
            type="number"
            id="costOfAsset"
            name="costOfAsset"
            value={financialData.costOfAsset}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="salvageValue">Salvage/Residual Value:</label>
          <input
            type="number"
            id="salvageValue"
            name="salvageValue"
            value={financialData.salvageValue}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="usefulLife">Useful Life:</label>
          <input
            type="number"
            id="usefulLife"
            name="usefulLife"
            value={financialData.usefulLife}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="investment">Investment:</label>
          <input
            type="number"
            id="investment"
            name="investment"
            value={financialData.investment}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="equity">Equity:</label>
          <input
            type="number"
            id="equity"
            name="equity"
            value={financialData.equity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="promisedReturn">Promised Return:</label>
          <input
            type="number"
            id="promisedReturn"
            name="promisedReturn"
            value={financialData.promisedReturn}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="years">Years:</label>
          <input
            type="number"
            id="years"
            name="years"
            value={financialData.years}
            onChange={handleChange}
            required
          />
        </div>
        {/* Add more form groups for additional financial data */}
        <button type="submit">Submit Financial Data</button>
      </form>
    </div>
  );
};

export default FinancialDataPage;
