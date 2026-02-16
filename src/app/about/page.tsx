"use client";

import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f8ff] via-white to-[#fff5ec]">
      <nav className="bg-white/90 backdrop-blur border-b border-[#e4ecff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-[#0F6FFF] hover:text-[#0057d3] transition-colors">
            ← Back to home
          </Link>
          <span className="hidden text-xs tracking-[0.3em] uppercase text-[#8aa4ff] sm:inline">
            Invest to Impact
          </span>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8aa4ff] mb-3">
              About ExamDeck AI
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Turning ambition into
              <span className="text-[#0F6FFF]"> interview-ready impact</span>
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              ExamDeck AI is an advanced interview preparation platform designed to help candidates move from potential to performance with confidence.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Using modern AI, we read between the lines of your CV, uncover strengths and blind spots, and translate that into tailored exams and training plans so every practice session brings you closer to the offer.
            </p>
            <div className="flex flex-wrap gap-6">
              <div>
                <p className="text-3xl font-extrabold text-[#0F6FFF]">+10k</p>
                <p className="text-sm text-gray-600">Profiles analyzed</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-[#FF8A21]">82%</p>
                <p className="text-sm text-gray-600">Report higher confidence</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-gray-900">24/7</p>
                <p className="text-sm text-gray-600">AI support at your pace</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/90 p-6 shadow-sm backdrop-blur border border-[#e4ecff]">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Human-centred design</h3>
              <p className="text-sm text-gray-600">
                Clear language, structured flows, and focused insights designed for busy candidates.
              </p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-[#0F6FFF] to-[#FF8A21] p-[1px] shadow-sm">
              <div className="h-full rounded-2xl bg-white/95 p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-2">AI that explains</h3>
                <p className="text-sm text-gray-600">
                  Not just scores—ExamDeck AI gives you context, reasoning, and next best steps.
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-white/90 p-6 shadow-sm backdrop-blur border border-[#ffe2c3]">
              <h3 className="text-base font-semibold text-gray-900 mb-2">For every stage</h3>
              <p className="text-sm text-gray-600">
                From first job to leadership roles, adapt the difficulty and focus to your path.
              </p>
            </div>
            <div className="rounded-2xl bg-[#0F6FFF]/5 p-6 border border-[#e4ecff]">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Ethical & private</h3>
              <p className="text-sm text-gray-600">
                Your data is used only to improve your preparation—never sold or shared.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
