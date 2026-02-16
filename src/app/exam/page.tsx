'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type Question =
  | {
      id: string;
      kind: 'mcq';
      title: string;
      prompt: string;
      options: string[];
    }
  | {
      id: string;
      kind: 'code';
      title: string;
      prompt: string;
      starterCode: string;
    };

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

function formatTime(totalSeconds: number) {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${pad2(minutes)}:${pad2(seconds)}`;
}

function clamp01(n: number) {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

export default function Exam() {
  const questions: Question[] = useMemo(
    () => [
      {
        id: 'q1',
        kind: 'mcq',
        title: 'JavaScript Basics',
        prompt: 'Which statement about JavaScript closures is correct?',
        options: [
          'A closure is created only when using the class keyword.',
          'A closure allows a function to access variables from its outer scope even after the outer function returns.',
          'A closure is the same as a Promise.',
          'Closures prevent garbage collection entirely.',
        ],
      },
      {
        id: 'q2',
        kind: 'mcq',
        title: 'React Rendering',
        prompt: 'In React, what is the primary purpose of keys in lists?',
        options: [
          'They encrypt props at runtime.',
          'They help React identify which items changed, are added, or are removed.',
          'They automatically memoize components.',
          'They improve CSS specificity.',
        ],
      },
      {
        id: 'q3',
        kind: 'code',
        title: 'Coding',
        prompt:
          'Write a function `isPalindrome(s)` that returns true if the input string is a palindrome (ignoring non-alphanumeric characters and case).',
        starterCode:
          "export function isPalindrome(s: string) {\n  // TODO\n  return false;\n}\n",
      },
      {
        id: 'q4',
        kind: 'mcq',
        title: 'APIs',
        prompt: 'Which HTTP status code best represents a successful resource creation?',
        options: ['200', '201', '204', '304'],
      },
      {
        id: 'q5',
        kind: 'code',
        title: 'Coding',
        prompt:
          'Implement `topKFrequent(nums, k)` that returns the k most frequent numbers. Aim for better than O(n log n) if possible.',
        starterCode:
          "export function topKFrequent(nums: number[], k: number) {\n  // TODO\n  return [];\n}\n",
      },
    ],
    []
  );

  const totalSeconds = 30 * 60;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>({});
  const [codeAnswers, setCodeAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const active = questions[activeIndex];

  useEffect(() => {
    if (submitted) return;
    const id = window.setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [submitted]);

  useEffect(() => {
    if (secondsLeft === 0 && !submitted) {
      setSubmitted(true);
    }
  }, [secondsLeft, submitted]);

  useEffect(() => {
    // Seed starter code when entering a code question.
    if (active.kind === 'code') {
      setCodeAnswers((prev) => {
        if (prev[active.id] != null) return prev;
        return { ...prev, [active.id]: active.starterCode };
      });
    }
  }, [active]);

  const answeredCount = useMemo(() => {
    let count = 0;
    for (const q of questions) {
      if (q.kind === 'mcq') {
        if (mcqAnswers[q.id] != null) count += 1;
      } else {
        const v = codeAnswers[q.id];
        if (v != null && v.trim().length > 0) count += 1;
      }
    }
    return count;
  }, [questions, mcqAnswers, codeAnswers]);

  const progress = clamp01(answeredCount / questions.length);
  const timeIsLow = secondsLeft <= 5 * 60;

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-base-100">
      <div className="container-app py-6">
        {/* Header */}
        <header className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <Link href="/dashboard" className="text-sm font-semibold text-primary hover:opacity-90">
              ← Back
            </Link>
            <h1 className="mt-2 text-xl sm:text-2xl font-bold text-base-content truncate">
              AI Test
            </h1>
            <p className="mt-1 text-sm text-base-content/70">
              Answer quickly and keep it clean.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <div
              className={`inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-bold bg-base-100 ${
                timeIsLow ? 'border-accent/40 text-base-content' : 'border-base-200 text-base-content'
              }`}
              aria-label="Time remaining"
              title="Time remaining"
            >
              <span className="text-xs font-semibold text-base-content/60 mr-2">Time</span>
              <span className={`tabular-nums ${timeIsLow ? 'text-accent' : ''}`}>{formatTime(secondsLeft)}</span>
            </div>

            <button
              type="button"
              className="btn btn-md btn-primary"
              onClick={handleSubmit}
              disabled={submitted}
            >
              {submitted ? 'Submitted' : 'Submit'}
            </button>
          </div>
        </header>

        {/* Layout */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
          {/* Main */}
          <section className="card card-pad">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-base-content/60">
                  Question {activeIndex + 1} of {questions.length} • {active.title}
                </p>
                <h2 className="mt-2 text-lg sm:text-xl font-bold text-base-content">
                  {active.prompt}
                </h2>
              </div>

              <div className="shrink-0 w-28">
                <p className="text-right text-xs text-base-content/60">Progress</p>
                <div className="mt-2 h-2 w-full rounded-full bg-base-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
                    style={{ width: `${Math.round(progress * 100)}%` }}
                  />
                </div>
                <p className="mt-2 text-right text-xs font-semibold text-base-content">
                  {answeredCount}/{questions.length}
                </p>
              </div>
            </div>

            {/* MCQ options */}
            {active.kind === 'mcq' ? (
              <div className="mt-5">
                <p className="text-sm font-semibold text-base-content">Choose one</p>
                <div className="mt-3 grid gap-2">
                  {active.options.map((opt, idx) => {
                    const selected = mcqAnswers[active.id] === idx;
                    return (
                      <button
                        key={opt}
                        type="button"
                        disabled={submitted}
                        onClick={() => setMcqAnswers((p) => ({ ...p, [active.id]: idx }))}
                        className={`w-full rounded-xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${
                          selected
                            ? 'border-primary/40 bg-primary/10'
                            : 'border-base-200 bg-base-100 hover:border-base-300'
                        } ${submitted ? 'opacity-90 cursor-not-allowed' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 h-4 w-4 rounded-full border flex items-center justify-center ${
                              selected ? 'border-primary bg-primary/10' : 'border-base-300'
                            }`}
                            aria-hidden
                          >
                            {selected ? <div className="h-2 w-2 rounded-full bg-primary" /> : null}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-base-content">{opt}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {/* Coding editor section */}
            <div className="mt-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-base-content">Coding editor</p>
                <p className="text-xs text-base-content/60">TypeScript</p>
              </div>

              <div className="mt-3 rounded-xl border border-base-200 bg-base-100 overflow-hidden">
                <div className="border-b border-base-200 bg-secondary px-3 py-2 text-xs text-base-content/70">
                  {active.kind === 'code'
                    ? 'Write your solution below.'
                    : 'Scratchpad (optional).'}
                </div>
                <textarea
                  value={codeAnswers[active.id] ?? (active.kind === 'code' ? active.starterCode : '')}
                  onChange={(e) => setCodeAnswers((p) => ({ ...p, [active.id]: e.target.value }))}
                  disabled={submitted}
                  spellCheck={false}
                  className="w-full min-h-[260px] bg-base-100 px-4 py-3 font-mono text-sm text-base-content outline-none resize-y"
                  placeholder={active.kind === 'code' ? '' : 'You can draft ideas or pseudo-code here…'}
                />
              </div>
            </div>

            {/* Footer controls */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  className="btn btn-md btn-secondary"
                  onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
                  disabled={activeIndex === 0}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="btn btn-md btn-secondary"
                  onClick={() => setActiveIndex((i) => Math.min(questions.length - 1, i + 1))}
                  disabled={activeIndex === questions.length - 1}
                >
                  Next
                </button>
              </div>
              <button
                type="button"
                className="btn btn-md btn-primary"
                onClick={handleSubmit}
                disabled={submitted}
              >
                {submitted ? 'Submitted' : 'Submit test'}
              </button>
            </div>

            {submitted ? (
              <div className="mt-4 rounded-xl border border-base-200 bg-secondary px-4 py-3 text-sm text-base-content">
                Submitted. You can leave this page or review your answers.
              </div>
            ) : null}
          </section>

          {/* Navigation panel */}
          <aside className="card card-pad h-fit lg:sticky lg:top-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-base-content">Questions</p>
              <p className="text-xs text-base-content/60">{answeredCount}/{questions.length}</p>
            </div>
            <div className="mt-4 grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const isActive = idx === activeIndex;
                const isAnswered =
                  q.kind === 'mcq'
                    ? mcqAnswers[q.id] != null
                    : (codeAnswers[q.id]?.trim()?.length ?? 0) > 0;

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`h-10 rounded-lg border text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${
                      isActive
                        ? 'border-primary/50 bg-primary/10 text-base-content'
                        : isAnswered
                          ? 'border-base-200 bg-base-100 text-base-content'
                          : 'border-base-200 bg-secondary text-base-content/80'
                    }`}
                    aria-label={`Go to question ${idx + 1}`}
                    title={q.title}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 rounded-xl border border-base-200 bg-base-100 p-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-base-content/70">Current</span>
                <span className="font-semibold text-base-content">{activeIndex + 1}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-base-content/70">Type</span>
                <span className="font-semibold text-base-content">{active.kind === 'mcq' ? 'MCQ' : 'Coding'}</span>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-md btn-primary w-full mt-4"
              onClick={handleSubmit}
              disabled={submitted}
            >
              {submitted ? 'Submitted' : 'Submit test'}
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}
