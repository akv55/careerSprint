'use client';

import Link from 'next/link';

export default function HowItWorks() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-indigo-600 font-semibold">← Back to Home</Link>
        </div>
      </nav>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">How It Works</h1>
        <div className="space-y-8">
          {[
            { step: 1, title: 'Register', desc: 'Create your account with email and password' },
            { step: 2, title: 'Upload CV', desc: 'Upload your resume for AI analysis' },
            { step: 3, title: 'Get Insights', desc: 'Receive detailed CV analysis and recommendations' },
            { step: 4, title: 'Take Exam', desc: 'Complete practice exams tailored to your profile' },
            { step: 5, title: 'Get Results', desc: 'View detailed evaluation and performance metrics' },
            { step: 6, title: 'Training Plan', desc: 'Receive personalized training recommendations' },
          ].map((item) => (
            <div key={item.step} className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                  {item.step}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
