'use client';

import Link from 'next/link';
import { FileText } from 'lucide-react';

type Test = {
  id: string;
  title: string;
  category: string;
  minutes: number;
  completedPercent?: number;
};

const mockTests: Test[] = [
  { id: 'm1', title: 'Frontend Fundamentals (AI)', category: 'Mock Test', minutes: 25, completedPercent: 0 },
  { id: 'm2', title: 'Backend ', category: 'Mock Test', minutes: 30, completedPercent: 0 },
  { id: 'm3', title: 'Database Design', category: 'Mock Test', minutes: 20, completedPercent: 0 },
  { id: 'm4', title: 'AI & ML Fundamentals', category: 'Mock Test', minutes: 25, completedPercent: 0 },
];

const practiceSets: Test[] = [
  { id: 'p1', title: 'Frontend', category: 'Practice Questions', minutes: 15, completedPercent: 0 },
  { id: 'p2', title: 'DSA', category: 'Practice Questions', minutes: 20, completedPercent: 0 },
  { id: 'p3', title: 'System Design Basics', category: 'Practice Questions', minutes: 15, completedPercent: 0 },
  { id: 'p4', title: 'Python Basics', category: 'Practice Questions', minutes: 10, completedPercent: 0 },
];

export default function AiTestsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-base-content">AI Exams & Practice</h1>
          <p className="text-sm text-base-content/70 mt-1">
            Choose a mock exam or quick practice set to get started.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/exam" className="btn btn-md btn-primary">
            Start quick exam
          </Link>
        </div>
      </div>

      {/* Mock Tests */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-base-content">Mock tests</h2>
          <button className="text-xs font-semibold text-primary hover:opacity-80 cursor-pointer">
            View all
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockTests.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
      </section>

      {/* Practice Questions */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-base-content">Practice questions</h2>
          <button className="text-xs font-semibold text-primary hover:opacity-80 cursor-pointer">
            View all
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {practiceSets.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
      </section>
    </div>
  );
}

type TestCardProps = {
  test: Test;
};

function TestCard({ test }: TestCardProps) {
  const completed = test.completedPercent ?? 0;

  const cardBg =
    test.category === 'Mock Test'
      ? 'bg-gradient-to-b from-primary/5 via-base-100 to-base-100'
      : 'bg-gradient-to-b from-accent/5 via-base-100 to-base-100';

  return (
    <div
      className={`relative flex flex-col items-center justify-between rounded-2xl border border-base-200 px-6 py-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all ${cardBg}`}
    >
      {/* Progress header */}
      <div className="w-full mb-6">
        <div className="flex items-center justify-between text-[11px] text-base-content/60 mb-1">
          <span>{completed}% Completed</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-base-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${Math.max(completed, 8)}%` }}
          />
        </div>
      </div>

      {/* Icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-sm mb-4">
        <FileText className="h-6 w-6" />
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-base-content text-center">
        {test.title}
      </h3>

      {/* CTA */}
      <div className="mt-5 w-full">
        <Link
          href="/exam"
          className="w-full inline-flex items-center justify-center rounded-full border border-blue-500 bg-blue-400 text-white px-2 py-2 text-xs font-semibold hover:bg-blue-600 hover:border-blue-600 transition-colors shadow-sm"
        >
          Take test
        </Link>
      </div>
    </div>
  );
}
