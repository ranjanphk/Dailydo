import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function LineChartComponent({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="completed" stroke="#4CAF50" />
        <Line type="monotone" dataKey="inProgress" stroke="#2196F3" />
        <Line type="monotone" dataKey="pending" stroke="#FF9800" />
      </LineChart>
    </ResponsiveContainer>
  );
}
