'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Exam() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    {
      id: 1,
      question: 'What is your experience with your primary programming language?',
      options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    },
    {
      id: 2,
      question: 'How would you approach a system design problem?',
      options: ['Ask for clarification', 'Make assumptions', 'Research similar systems', 'All of the above'],
    },
  ];

  const handleAnswer = (option: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: option }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = () => {
    console.log('Exam submitted:', answers);
    // Navigate to results page
  };

  const question = questions[currentQuestion];

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/dashboard" className="text-indigo-600 font-semibold">← Back to Dashboard</Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-8 rounded-lg shadow">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
              <span className="text-sm font-medium text-gray-600">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{question.question}</h2>

          <div className="space-y-3 mb-8">
            {question.options.map(option => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 text-left border-2 rounded-lg transition ${
                  answers[currentQuestion] === option
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            
            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Submit Exam
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
