import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const FinancialDataBarChart = () => {
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    // Retrieve financial data from localStorage
    const financialDataString = localStorage.getItem('financialData');
    if (!financialDataString) {
      console.error('Financial data not found in localStorage');
      return;
    }

    const financialData = JSON.parse(financialDataString);

    // Calculate EBIT, Depreciation, Amortization, Returns Promised, Gross Margin
    const ebit = financialData.revenue - financialData.expenses;
    const depreciation = (financialData.costOfAsset - financialData.salvageValue) / financialData.usefulLife;
    const amortization = (financialData.costOfAsset - financialData.residualValue) / financialData.usefulLife;
    const totalReturns = financialData.investment * (1 + financialData.promisedReturn / 100);
    const returnsPromised = totalReturns * (financialData.equity / 100) * financialData.years;
    const grossMargin = ((financialData.revenue - financialData.cogs) / financialData.revenue) * 100;

    // Set the bar chart data
    setBarChartData([
      { name: 'EBIT', value: ebit, color: '#8884d8' },
      { name: 'Depreciation', value: depreciation, color: '#82ca9d' },
      { name: 'Amortization', value: amortization, color: '#ffc658' },
      { name: 'Returns Promised', value: returnsPromised, color: '#ff7300' },
      { name: 'Gross Margin', value: grossMargin, color: '#ff4c68' },
    ]);
  }, []);

  return (
    <div>
      <h2>Financial Data Bar Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={barChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {barChartData.map((data, index) => (
            <Bar key={index} dataKey="value" fill={data.color} name={data.name} />
          ))}
        </BarChart>
      </ResponsiveContainer>
      <div style={{ marginLeft: 'auto', marginTop: '10px' }}>
        <table>
          <tbody>
            {barChartData.map((data, index) => (
              <tr key={index}>
                <td style={{ color: data.color }}>{data.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialDataBarChart;
