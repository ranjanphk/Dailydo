import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function TaskOverviewChart({ data, colors }) {
  return (
    <div style={{ width: '100%', height: 220 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={60} outerRadius={90} paddingAngle={2} stroke="none">
            {data.map((entry, i) => (
              <Cell key={i} fill={colors[i]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
