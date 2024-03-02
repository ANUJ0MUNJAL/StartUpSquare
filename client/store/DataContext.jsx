// DataContext.js
import React, { useContext, useState } from 'react';

const DataContext = React.createContext();

export const DataProvider = ({ children }) => {
  const [combinedData, setCombinedData] = useState({}); // Adjust the initial state as needed

  const updateCombinedData = (data) => {
    setCombinedData(data);
  };

  return (
    <DataContext.Provider value={{ combinedData, updateCombinedData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
