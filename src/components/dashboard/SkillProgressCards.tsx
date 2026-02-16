"use client";

export type Skill = {
  name: string;
  value: number;
};

export type SkillProgressCardsProps = {
  skills: Skill[];
};

export function SkillProgressCards({ skills }: SkillProgressCardsProps) {
  return (
    <div className="mt-4 space-y-3">
      {skills.map((skill) => (
        <div
          key={skill.name}
          className="flex items-center justify-between gap-4 rounded-xl border border-base-200 bg-base-100 p-4"
        >
          <div className="min-w-0">
            <p className="font-semibold text-base-content truncate">{skill.name}</p>
            <p className="mt-1 text-xs text-base-content/60">Skill readiness</p>
          </div>

          <div className="flex items-center gap-3 w-40">
            <progress className="progress" value={skill.value} max={100} />
            <span className="text-xs text-base-content/60">{skill.value}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}
