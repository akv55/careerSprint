'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { skill: 'DSA', score: 68 },
  { skill: 'System', score: 54 },
  { skill: 'JS/TS', score: 82 },
  { skill: 'Comm', score: 63 },
];

export default function SkillBarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
        <CartesianGrid stroke="var(--muted)" vertical={false} />
        <XAxis
          dataKey="skill"
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
          cursor={{ fill: 'var(--secondary)' }}
          contentStyle={{
            background: 'var(--base-100)',
            border: '1px solid var(--base-200)',
            borderRadius: 12,
            color: 'var(--base-content)',
          }}
          labelStyle={{ color: 'var(--base-content)' }}
        />
        <Bar
          dataKey="score"
          radius={[8, 8, 0, 0]}
          fill="var(--primary)"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
