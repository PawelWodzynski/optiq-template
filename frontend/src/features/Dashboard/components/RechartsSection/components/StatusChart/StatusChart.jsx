import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './StatusChart.module.css';
import { useStatusChartLogic } from './StatusChart';

const StatusChart = ({ data }) => {
  // Basic chart data - might be passed as props or fetched in a real scenario
  const { chartData } = useStatusChartLogic(data); // Pass initial data if needed

  if (!chartData || chartData.length === 0) {
    return <div className={styles.noData}>No chart data available</div>;
  }

  return (
    <div className={styles.chartContainer}> {/* Use styles from CSS module */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" /> {/* Adjusted grid color */}
          <XAxis dataKey="name" stroke="#9ca3af" /> {/* Adjusted axis color */}
          <YAxis stroke="#9ca3af" /> {/* Adjusted axis color */}
          <Tooltip 
            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} 
            itemStyle={{ color: '#d1d5db' }}
          />
          <Legend wrapperStyle={{ color: '#d1d5db' }}/>
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusChart;

