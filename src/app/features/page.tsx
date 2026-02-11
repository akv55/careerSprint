'use client';

import Link from 'next/link';

export default function Features() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-indigo-600 font-semibold">← Back to Home</Link>
        </div>
      </nav>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">Features</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: 'CV Analysis', desc: 'Advanced AI analyzes your resume and provides actionable insights' },
            { title: 'Practice Exams', desc: 'Take comprehensive exams tailored to your role' },
            { title: 'Progress Tracking', desc: 'Monitor your improvement over time' },
            { title: 'AI Recommendations', desc: 'Get personalized training suggestions' },
          ].map((feature) => (
            <div key={feature.title} className="border border-gray-200 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
