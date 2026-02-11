'use client';

import Link from 'next/link';

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-indigo-600 font-semibold">← Back to Home</Link>
        </div>
      </nav>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About ExamDeck AI</h1>
        <p className="text-lg text-gray-600 mb-4">
          ExamDeck AI is an advanced interview preparation platform designed to help candidates excel in their interviews.
        </p>
        <p className="text-lg text-gray-600">
          Using artificial intelligence and machine learning, we analyze your CV, identify skill gaps, and provide personalized training recommendations.
        </p>
      </section>
    </main>
  );
}
