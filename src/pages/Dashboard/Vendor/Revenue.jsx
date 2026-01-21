import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const Revenue = () => {
  const [data, setData] = useState({ totalRevenue: 0, totalSold: 0, totalAdded: 0 });

  useEffect(() => {
    axios.get('http://localhost:5000/api/revenue', { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(res => setData(res.data));
  }, []);

  const chartData = [
    { name: 'Total Revenue', value: data.totalRevenue },
    { name: 'Tickets Sold', value: data.totalSold },
    { name: 'Tickets Added', value: data.totalAdded },
  ];

  return (
    <div className="container mx-auto my-16">
      <h1 className="text-3xl font-bold mb-8">Revenue Overview</h1>
      <BarChart width={600} height={300} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
      {/* Pie চার্ট যদি চাও */}
    </div>
  );
};

export default Revenue;