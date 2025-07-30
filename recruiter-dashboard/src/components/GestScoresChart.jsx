// src/components/GestScoresChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const GestScoresChart = ({ scores }) => {
  const data = Object.entries(scores).map(([skill, value]) => ({
    name: skill,
    score: value
  }));

  const colors = ['#4caf50', '#2196f3', '#f44336']; // Green, Blue, Red

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="score">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GestScoresChart;
