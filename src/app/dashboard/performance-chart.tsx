'use client';

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type Point = { label: string; score: number };

const data: Point[] = [
  { label: 'A1', score: 62 },
  { label: 'A2', score: 68 },
  { label: 'A3', score: 70 },
  { label: 'A4', score: 74 },
  { label: 'A5', score: 73 },
  { label: 'A6', score: 78 },
  { label: 'A7', score: 82 },
];

export default function PerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
        <CartesianGrid stroke="var(--muted)" vertical={false} />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tick={{ fill: 'var(--base-content)', fontSize: 12, opacity: 0.65 }}
        />
        <YAxis
          domain={[0, 100]}
          tickLine={false}
          axisLine={false}
          tick={{ fill: 'var(--base-content)', fontSize: 12, opacity: 0.65 }}
          width={30}
        />
        <Tooltip
          cursor={{ stroke: 'var(--muted)' }}
          contentStyle={{
            background: 'var(--base-100)',
            border: '1px solid var(--base-200)',
            borderRadius: 12,
            color: 'var(--base-content)',
          }}
          labelStyle={{ color: 'var(--base-content)' }}
        />
        <Line
          type="monotone"
          dataKey="score"
          stroke="var(--primary)"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
