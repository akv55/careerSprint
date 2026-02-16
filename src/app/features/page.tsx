"use client";

import Link from "next/link";

export default function Features() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f8ff] via-white to-[#fff5ec]">
      <nav className="bg-white/90 backdrop-blur border-b border-[#e4ecff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-[#0F6FFF] hover:text-[#0057d3] transition-colors">
            ← Back to home
          </Link>
          <span className="hidden text-xs tracking-[0.3em] uppercase text-[#8aa4ff] sm:inline">
            Features overview
          </span>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8aa4ff] mb-3">
            Platform Features
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Everything you need to
            <span className="text-[#0F6FFF]"> impress interviewers</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            ExamDeck AI connects CV analysis, realistic exams, and guided training into one smooth preparation journey.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "CV Analysis",
              desc: "Advanced AI analyzes your resume and provides actionable insights",
              badge: "CV",
              color: "from-[#0F6FFF] to-[#5bc6ff]",
            },
            {
              title: "Practice Exams",
              desc: "Take comprehensive exams tailored to your role",
              badge: "EXAM",
              color: "from-[#FF8A21] to-[#ffc15a]",
            },
            {
              title: "Progress Tracking",
              desc: "Monitor your improvement over time",
              badge: "TRACK",
              color: "from-[#0F6FFF] to-[#a17dff]",
            },
            {
              title: "AI Recommendations",
              desc: "Get personalized training suggestions",
              badge: "AI",
              color: "from-[#0F6FFF] to-[#FF8A21]",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="group flex h-full flex-col rounded-2xl border border-[#e4ecff] bg-white/90 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-[#0F6FFF]/40 hover:shadow-xl"
            >
              <div
                className={`mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${feature.color} px-3 py-1 text-xs font-semibold text-white`}
              >
                <span>{feature.badge}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#0F6FFF] transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 flex-1">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
