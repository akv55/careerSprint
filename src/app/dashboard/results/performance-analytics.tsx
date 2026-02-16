'use client';

import {
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type ScorePoint = { label: string; score: number };
type SkillPoint = { skill: string; value: number };

export default function PerformanceAnalytics({
  scores,
  skills,
}: {
  scores: ScorePoint[];
  skills: SkillPoint[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="rounded-xl border border-[#d4d9ff] bg-gradient-to-br from-[#f5f8ff] via-white to-[#fff5ec] p-4 lg:col-span-2">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-[#0F2B6F]">Test scores over time</p>
            <p className="text-xs text-base-content/70 mt-1">Blue line shows overall score trend.</p>
          </div>
        </div>

        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={scores} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
              <CartesianGrid stroke="#E2E7FF" vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#3B4260', fontSize: 12, opacity: 0.75 }}
              />
              <YAxis
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#3B4260', fontSize: 12, opacity: 0.75 }}
                width={34}
              />
              <Tooltip
                cursor={{ stroke: '#E2E7FF' }}
                contentStyle={{
                  background: '#ffffff',
                  border: '1px solid #d4d9ff',
                  borderRadius: 12,
                  color: 'var(--base-content)',
                }}
                labelStyle={{ color: 'var(--base-content)' }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#0F6FFF"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: '#FF8A21', strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-[#d4d9ff] bg-white p-4 lg:col-span-1">
        <div>
          <p className="text-sm font-bold text-[#0F2B6F]">Skill breakdown</p>
          <p className="text-xs text-base-content/70 mt-1">Orange area highlights your strongest domains.</p>
        </div>

        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={skills} outerRadius="78%">
              <PolarGrid stroke="#E2E7FF" />
              <PolarAngleAxis
                dataKey="skill"
                tick={{ fill: '#3B4260', fontSize: 12, opacity: 0.8 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: '#3B4260', fontSize: 11, opacity: 0.5 }}
                axisLine={{ stroke: '#E2E7FF' }}
                tickLine={{ stroke: '#E2E7FF' }}
              />
              <Tooltip
                contentStyle={{
                  background: '#ffffff',
                  border: '1px solid #d4d9ff',
                  borderRadius: 12,
                  color: '#111827',
                }}
                labelStyle={{ color: '#111827' }}
              />
              <Radar
                name="Skill"
                dataKey="value"
                stroke="#FF8A21"
                fill="#FF8A21"
                fillOpacity={0.18}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] text-base-content/60">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-4 rounded-full bg-[#0F6FFF]" />
              Score trend
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-4 rounded-full bg-[#FF8A21]" />
              Skill strength
            </span>
          </div>
          <span>Radar is normalized to 0–100.</span>
        </div>
      </div>
    </div>
  );
}
