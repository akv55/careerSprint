'use client';

import Link from 'next/link';

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">ExamDeck AI</h1>
          <button className="text-gray-600 hover:text-gray-900">Logout</button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">CV Status</h3>
            <p className="text-gray-600">Upload your CV to get started</p>
            <Link href="#" className="text-indigo-600 font-semibold mt-4 inline-block">Upload CV →</Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Practice Exams</h3>
            <p className="text-gray-600">Take practice exams to prepare</p>
            <Link href="/exam" className="text-indigo-600 font-semibold mt-4 inline-block">Start Exam →</Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Results</h3>
            <p className="text-gray-600">View your exam results and analysis</p>
            <Link href="/result" className="text-indigo-600 font-semibold mt-4 inline-block">View Results →</Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Your Learning Path</h3>
          <p className="text-gray-600">Complete your profile to get personalized recommendations</p>
        </div>
      </div>
    </main>
  );
}
