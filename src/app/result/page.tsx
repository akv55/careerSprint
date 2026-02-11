'use client';

import Link from 'next/link';

export default function Result() {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/dashboard" className="text-indigo-600 font-semibold">← Back to Dashboard</Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-8 rounded-lg shadow mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Exam Results</h1>
          <p className="text-gray-600">Congratulations! Here&apos;s your detailed evaluation.</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Score Breakdown</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">78%</div>
              <p className="text-gray-600">Overall Score</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">85%</div>
              <p className="text-gray-600">Technical Skills</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">72%</div>
              <p className="text-gray-600">Communication</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Interview Readiness Assessment</h2>
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">Interview Readiness: Moderately Prepared</h3>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Personalized Training Recommendations</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-indigo-600 font-bold mr-3">1.</span>
              <span className="text-gray-700">Focus on improving communication skills through mock interviews</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 font-bold mr-3">2.</span>
              <span className="text-gray-700">Practice system design problems using online resources</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 font-bold mr-3">3.</span>
              <span className="text-gray-700">Strengthen your understanding of data structures</span>
            </li>
          </ul>
          <Link href="/dashboard" className="inline-block mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
