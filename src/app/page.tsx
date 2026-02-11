'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">ExamDeck AI</h1>
          <div className="space-x-6">
            <Link href="/about" className="text-gray-600 hover:text-indigo-600">About</Link>
            <Link href="/features" className="text-gray-600 hover:text-indigo-600">Features</Link>
            <Link href="/how-it-works" className="text-gray-600 hover:text-indigo-600">How it Works</Link>
            <Link href="/auth/login" className="text-indigo-600 font-semibold hover:text-indigo-700">Login</Link>
            <Link href="/auth/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Ace Your Interview with AI-Powered Preparation
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Upload your CV, get AI analysis, take practice exams, and receive personalized training recommendations to boost your interview readiness.
        </p>
        <div className="space-x-4">
          <Link href="/auth/register" className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Get Started
          </Link>
          <Link href="/how-it-works" className="inline-block border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition">
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Preview */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose ExamDeck AI?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Smart CV Analysis', desc: 'AI-powered insights on your resume' },
              { title: 'Practice Exams', desc: 'Industry-specific interview questions' },
              { title: 'Personalized Training', desc: 'Tailored recommendations based on results' },
            ].map((feature) => (
              <div key={feature.title} className="border border-gray-200 p-6 rounded-lg hover:shadow-lg transition">
                <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
