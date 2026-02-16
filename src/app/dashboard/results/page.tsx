'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';

const PerformanceChart = dynamic(() => import('../performance-chart'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-xl bg-base-200 animate-pulse" />
  ),
});

const PerformanceAnalytics = dynamic(() => import('./performance-analytics'), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="h-72 rounded-xl bg-base-200 animate-pulse lg:col-span-2" />
      <div className="h-72 rounded-xl bg-base-200 animate-pulse lg:col-span-1" />
    </div>
  ),
});

type ResultRow = {
  date: string;
  test: string;
  score: number;
  readiness: number;
};

const results: ResultRow[] = [
  { date: '2026-02-01', test: 'Frontend Fundamentals (AI)', score: 62, readiness: 58 },
  { date: '2026-02-04', test: 'Data Structures Warm‑up', score: 68, readiness: 61 },
  { date: '2026-02-06', test: 'Behavioral Round Drill', score: 70, readiness: 64 },
  { date: '2026-02-08', test: 'System Design Sprint', score: 74, readiness: 66 },
  { date: '2026-02-10', test: 'Frontend Fundamentals (AI)', score: 78, readiness: 70 },
  { date: '2026-02-12', test: 'Data Structures Warm‑up', score: 82, readiness: 72 },
];

export default function ResultsPage() {
  const scoreSeries = results.map((r, idx) => ({
    label: `A${idx + 1}`,
    score: r.score,
  }));

  const skillSeries = [
    { skill: 'DSA', value: 68 },
    { skill: 'System', value: 54 },
    { skill: 'JS/TS', value: 82 },
    { skill: 'Comm', value: 63 },
    { skill: 'Debug', value: 58 },
  ];

  const bestScore = Math.max(...results.map((r) => r.score));
  const avgScore = Math.round(
    results.reduce((sum, r) => sum + r.score, 0) / results.length,
  );
  const avgReadiness = Math.round(
    results.reduce((sum, r) => sum + r.readiness, 0) / results.length,
  );
  const latestAttempt = results[results.length - 1];

  return (
    <div className="space-y-6">
      {/* Header banner */}
      <section className="relative overflow-hidden rounded-2xl border border-[#d4d9ff] bg-gradient-to-r from-[#0F6FFF] to-[#FF8A21] px-6 py-5 text-white shadow-sm">
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_0_0,white,transparent_55%),radial-gradient(circle_at_100%_100%,white,transparent_55%)]" />
        <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">Results overview</p>
            <h1 className="mt-1 text-2xl font-bold leading-tight">Your recent AI test performance</h1>
            <p className="mt-1 text-sm text-white/80">
              Track how your scores and interview readiness evolve across attempts.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="rounded-2xl bg-white/10 px-4 py-2 text-sm">
              <p className="text-xs text-white/80">Avg score</p>
              <p className="text-lg font-bold">{avgScore}%</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-2 text-sm">
              <p className="text-xs text-white/80">Avg readiness</p>
              <p className="text-lg font-bold">{avgReadiness}%</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-2 text-sm">
              <p className="text-xs text-white/80">Tests taken</p>
              <p className="text-lg font-bold">{results.length}</p>
            </div>
            <Link
              href="/dashboard/ai-tests"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-[#0F6FFF] hover:bg-blue-50"
            >
              Take another test
            </Link>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card card-pad lg:col-span-2 bg-gradient-to-br from-[#f5f8ff] via-white to-[#fff5ec] border border-[#d4d9ff]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-base-content">Performance trend</h2>
              <p className="text-xs text-base-content/60 mt-1">Last {results.length} attempts</p>
            </div>
            <Link href="/dashboard" className="text-xs font-semibold text-[#0F6FFF] hover:opacity-90">Back to dashboard</Link>
          </div>
          <div className="mt-4 h-64">
            <PerformanceChart />
          </div>
        </div>

        <div className="card card-pad border border-[#d4d9ff]">
          <h2 className="text-lg font-bold text-base-content">Summary</h2>
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-[#f0f4ff] px-3 py-2">
                <p className="text-xs text-[#4b5bff]">Best score</p>
                <p className="text-lg font-bold text-[#0F2B6F]">{bestScore}%</p>
              </div>
              <div className="rounded-xl bg-[#fff1e3] px-3 py-2">
                <p className="text-xs text-[#ff8a21]">Last attempt</p>
                <p className="text-lg font-bold text-[#7a3b09]">{latestAttempt.score}%</p>
                <p className="text-[11px] text-[#c15d12] truncate">{latestAttempt.test}</p>
              </div>
              <div className="rounded-xl bg-[#f0f4ff] px-3 py-2">
                <p className="text-xs text-[#4b5bff]">Avg score</p>
                <p className="text-lg font-bold text-[#0F2B6F]">{avgScore}%</p>
              </div>
              <div className="rounded-xl bg-[#fff1e3] px-3 py-2">
                <p className="text-xs text-[#ff8a21]">Avg readiness</p>
                <p className="text-lg font-bold text-[#7a3b09]">{avgReadiness}%</p>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-[#0F6FFF] to-[#FF8A21] px-4 py-3 text-sm text-white">
              <p className="font-semibold">AI suggestion</p>
              <p className="mt-1 text-xs text-white/85">
                Focus on strengthening <span className="font-semibold">System Design</span> and
                <span className="font-semibold"> communication skills</span> to push your readiness above 80%.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card card-pad border border-[#d4d9ff] bg-gradient-to-br from-[#f5f8ff] via-white to-[#fff5ec]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-base-content">Performance analytics</h2>
            <p className="text-sm text-base-content/70 mt-1">
              Scores over time and skill breakdown.
            </p>
          </div>
        </div>

        <div className="mt-4">
          <PerformanceAnalytics scores={scoreSeries} skills={skillSeries} />
        </div>
      </div>

      <div className="card card-pad border border-base-200">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-base-content">Recent attempts</h2>
          <Link href="/exam" className="btn btn-sm btn-secondary">Open exam</Link>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-base-content/60">
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Test</th>
                <th className="py-2 pr-4">Score</th>
                <th className="py-2 pr-4">Readiness</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={`${r.date}-${r.test}`} className="border-t border-base-200">
                  <td className="py-3 pr-4 text-base-content/80 whitespace-nowrap">{r.date}</td>
                  <td className="py-3 pr-4 text-base-content font-semibold min-w-[240px]">{r.test}</td>
                  <td className="py-3 pr-4 text-base-content/80">{r.score}%</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <progress className="progress max-w-[140px]" value={r.readiness} max={100} />
                      <span className="text-xs text-base-content/60">{r.readiness}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
