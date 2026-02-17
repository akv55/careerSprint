"use client";

import Link from "next/link";

export default function HowItWorks() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f8ff] via-white to-[#fff5ec]">
      <nav className="bg-white/90 backdrop-blur border-b border-[#e4ecff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-[#0F6FFF] hover:text-[#0057d3] transition-colors">
            ← Back to home
          </Link>
          <span className="hidden text-xs tracking-[0.3em] uppercase text-[#8aa4ff] sm:inline">
            How it works
          </span>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8aa4ff] mb-3">
            Step-by-step journey
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            From upload to
            <span className="text-[#0F6FFF]"> interview-ready</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            CareerSprint guides you through a clear, repeatable loop so every session improves both your CV and your interview performance.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-5 top-0 bottom-0 hidden sm:block">
            <div className="h-full w-[2px] bg-gradient-to-b from-[#0F6FFF] via-[#8aa4ff] to-[#FF8A21]" />
          </div>

          <div className="space-y-8 sm:space-y-10">
            {[
              { step: 1, title: "Register", desc: "Create your account with email and password" },
              { step: 2, title: "Upload CV", desc: "Upload your resume for AI analysis" },
              { step: 3, title: "Get Insights", desc: "Receive detailed CV analysis and recommendations" },
              { step: 4, title: "Take Exam", desc: "Complete practice exams tailored to your profile" },
              { step: 5, title: "Get Results", desc: "View detailed evaluation and performance metrics" },
              { step: 6, title: "Training Plan", desc: "Receive personalized training recommendations" },
            ].map((item) => (
              <div
                key={item.step}
                className="relative flex gap-4 sm:gap-8 rounded-2xl bg-white/90 p-5 sm:p-6 shadow-sm backdrop-blur border border-[#e4ecff]"
              >
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="hidden sm:block absolute -left-5 top-1 h-3 w-3 rounded-full bg-white" />
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#0F6FFF] to-[#FF8A21] text-white rounded-full flex items-center justify-center text-sm sm:text-lg font-bold shadow-md">
                      {item.step}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
