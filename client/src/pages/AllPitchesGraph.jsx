import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AllPitchesGraph = () => {
  const [allPitchesData, setAllPitchesData] = useState([]);

  useEffect(() => {
    // Fetch data for all pitches
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/pitches/allData', {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAllPitchesData(data);
        } else {
          console.error('Failed to fetch data for all pitches');
        }
      } catch (error) {
        console.error('Error fetching data for all pitches', error);
      }
    };

    fetchData();
  }, []);

  const renderBars = () => {
    // Assuming allPitchesData is an array of pitch data
    return allPitchesData.map((pitch, index) => (
      <Bar key={`bar-${index}`} dataKey="revenue" fill="#8884d8" name={`Pitch ${index + 1}`} />
      // You can customize this based on your actual data structure
    ));
  };

  return (
    <div>
      <h2>All Pitches Graph</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="metric" />
          <YAxis />
          <Tooltip />
          <Legend />
          {renderBars()}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AllPitchesGraph;
