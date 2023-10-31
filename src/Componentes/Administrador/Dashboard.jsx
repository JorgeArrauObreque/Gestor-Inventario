import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const data = [
    { name: 'Red', sales: 12 },
    { name: 'Blue', sales: 19 },
    { name: 'Yellow', sales: 3 },
    { name: 'Green', sales: 5 },
    { name: 'Purple', sales: 2 },
    { name: 'Orange', sales: 3 },
  ];

  return (
    <div>
      <h2>Ventas Mensuales</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;
