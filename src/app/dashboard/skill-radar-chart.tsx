"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type SkillPoint = {
  skill: string;
  value: number;
};

const defaultSkills: SkillPoint[] = [
  { skill: "DSA", value: 68 },
  { skill: "System Design", value: 54 },
  { skill: "JS/TS", value: 82 },
  { skill: "Communication", value: 63 },
  { skill: "Debugging", value: 58 },
];

export default function SkillRadarChart({ skills = defaultSkills }: { skills?: SkillPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={skills} outerRadius="78%">
        <PolarGrid stroke="#E2E7FF" />
        <PolarAngleAxis
          dataKey="skill"
          tick={{ fill: "#3B4260", fontSize: 12, opacity: 0.8 }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fill: "#3B4260", fontSize: 11, opacity: 0.5 }}
          axisLine={{ stroke: "#E2E7FF" }}
          tickLine={{ stroke: "#E2E7FF" }}
        />
        <Tooltip
          contentStyle={{
            background: "#ffffff",
            border: "1px solid #d4d9ff",
            borderRadius: 12,
            color: "#111827",
          }}
          labelStyle={{ color: "#111827" }}
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
  );
}
