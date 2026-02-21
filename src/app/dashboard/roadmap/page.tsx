"use client";

import { CheckCircle2, Circle, ArrowRight, Target, BookOpen, Brain } from "lucide-react";

type Milestone = {
  id: number;
  phase: string;
  label: string;
  description: string;
  status: "completed" | "current" | "upcoming";
};

const roadmap: Milestone[] = [
  {
    id: 1,
    phase: "Profile",
    label: "Upload CV & complete profile",
    description: "Add your latest CV, role preferences, and target companies to personalise exams.",
    status: "completed",
  },
  {
    id: 2,
    phase: "Skills",
    label: "Core skill assessment",
    description: "Run your first AI-powered exam aligned to your current skill level.",
    status: "current",
  },
  {
    id: 3,
    phase: "Practice",
    label: "Strengthen weak areas",
    description: "Use targeted quizzes and explanations to fix your top 3 gaps.",
    status: "upcoming",
  },
  {
    id: 4,
    phase: "Interview",
    label: "Mock interview sprints",
    description: "Simulate interview rounds and build consistency across attempts.",
    status: "upcoming",
  },
  {
    id: 5,
    phase: "Offer",
    label: "Final readiness check",
    description: "Run a full exam set and review your readiness score before real interviews.",
    status: "upcoming",
  },
];

export default function RoadmapPage() {
  const progressPercent = 28;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-base-content">Learning roadmap</h1>
          <p className="mt-1 text-sm text-base-content/70">
            Stay on track from CV upload to interview-ready with a clear, visual roadmap.
          </p>
        </div>
        <div className="rounded-2xl bg-gradient-to-r from-[#f5f8ff] to-[#fff5ec] px-4 py-3 text-xs text-gray-600 max-w-xs">
          <p className="font-semibold text-[#0F6FFF] flex items-center gap-2">
            <Target className="h-4 w-4" />
            Next focus
          </p>
          <p className="mt-1">
            Complete your <span className="font-semibold">core skill assessment</span> to unlock targeted practice sets.
          </p>
        </div>
      </div>

      {/* Summary & legend */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="card card-pad">
          <h2 className="text-base sm:text-lg font-semibold text-base-content">Roadmap progress</h2>
          <p className="mt-1 text-xs text-base-content/70">
            Follow each step in order. You&apos;re about {progressPercent}% of the way to interview-ready.
          </p>

          <div className="mt-5">
            <div className="flex items-center justify-between text-xs text-base-content/60 mb-2">
              <span>Overall progress</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="h-2 rounded-full bg-base-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#0F6FFF] via-[#4b7bff] to-[#FF8A21]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="mt-4 grid gap-3 text-xs sm:grid-cols-3">
              <Stat label="Completed" value="1" icon={<CheckCircle2 className="h-4 w-4 text-emerald-500" />} />
              <Stat label="In progress" value="1" icon={<Brain className="h-4 w-4 text-[#0F6FFF]" />} />
              <Stat label="Upcoming" value="3" icon={<BookOpen className="h-4 w-4 text-amber-500" />} />
            </div>
          </div>
        </div>

        <div className="card card-pad">
          <h2 className="text-base sm:text-lg font-semibold text-base-content mb-3">How to use this roadmap</h2>
          <ol className="space-y-3 text-xs text-base-content/70">
            <li>
              <span className="font-semibold text-base-content">1. Start at the top:</span> Each step builds on the previous one.
            </li>
            <li>
              <span className="font-semibold text-base-content">2. Focus on current:</span> Spend most of your time on the blue &quot;current&quot; step.
            </li>
            <li>
              <span className="font-semibold text-base-content">3. Reflect after exams:</span> Use your analytics to update priorities.
            </li>
            <li>
              <span className="font-semibold text-base-content">4. Repeat the loop:</span> As you grow, repeat the roadmap at a higher difficulty.
            </li>
          </ol>
        </div>
      </div>

      {/* Roadmap timeline */}
      <div className="card card-pad">
        <h2 className="text-base sm:text-lg font-semibold text-base-content mb-4">Your CareerSprint journey</h2>

        <div className="relative pl-4 sm:pl-6">
          <div className="absolute left-[10px] top-1 bottom-1 w-px bg-gradient-to-b from-[#0F6FFF] via-[#b6c5ff] to-[#FF8A21] sm:left-[13px]" />

          <div className="space-y-4">
            {roadmap.map((item) => (
              <div
                key={item.id}
                className="relative flex gap-3 rounded-2xl bg-base-100/80 p-4 sm:p-5 border border-base-200"
              >
                <div className="mt-1 flex flex-col items-center">
                  {item.status === "completed" ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : item.status === "current" ? (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0F6FFF]/10">
                      <Circle className="h-3 w-3 text-[#0F6FFF]" />
                    </div>
                  ) : (
                    <Circle className="h-4 w-4 text-base-300" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide mb-1">
                    <span className="rounded-full bg-base-200 px-2 py-0.5 font-semibold text-base-content/70">
                      Step {item.id}
                    </span>
                    <span className="text-base-content/40">{item.phase}</span>
                  </div>
                  <p className="text-sm font-semibold text-base-content">{item.label}</p>
                  <p className="mt-1 text-xs text-base-content/70">{item.description}</p>

                  {item.status === "current" && (
                    <button className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#0F6FFF] px-3 py-1.5 text-[11px] font-medium text-white hover:bg-[#0057d3] transition">
                      Continue this step
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type StatProps = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

function Stat({ label, value, icon }: StatProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-base-100 px-3 py-2 border border-base-200">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold text-base-content">{value}</p>
        <p className="text-[11px] text-base-content/60">{label}</p>
      </div>
    </div>
  );
}
