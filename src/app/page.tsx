'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Brain, FileText, TrendingUp, ChevronDown } from "lucide-react";

export default function Home() {

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navItems = ['About', 'Features', 'How it Works'];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f8ff] via-white to-[#fff5ec] overflow-hidden">

      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled
            ? 'bg-white/70 backdrop-blur-xl shadow-md py-3'
            : 'bg-white/90 backdrop-blur border-b border-[#e4ecff] py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#0F6FFF] to-[#FF8A21] flex items-center justify-center text-white font-bold shadow-md">
              I2I
            </div>

            <div>
              <p className="text-xl font-extrabold tracking-tight">
                <span className="text-[#0F6FFF]">Exam</span>
                <span className="text-[#FF8A21]">Deck</span>
                <span className="text-[#0F6FFF]"> AI</span>
              </p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#8aa4ff]">
                Invest to <span className="text-[#FF8A21]">Impact</span>
              </p>
            </div>
          </motion.div>

          <div className="flex items-center gap-10">
            {navItems.map((item) => {
              const sectionId = item.toLowerCase().replace(/ /g, '-');
              return (
                <Link
                  key={item}
                  href={`/#${sectionId}`}
                  className="relative text-sm font-medium text-gray-600 hover:text-[#0F6FFF] transition-colors group"
                >
                  {item}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-[#0F6FFF] to-[#FF8A21] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              );
            })}

            <Link
              href="/auth/login"
              className="text-sm font-semibold text-[#0F6FFF] hover:text-[#0057d3] transition"
            >
              Login
            </Link>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/auth/register"
                className="bg-gradient-to-r from-[#FF8A21] to-[#ff7a00] px-6 py-2.5 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition"
              >
                Sign Up
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center h-screen justify-center items-center flex flex-col">

        {/* Glow Background */}
        <div className="absolute w-96 h-96 bg-[#0F6FFF]/20 blur-3xl rounded-full -top-10 -left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-[#FF8A21]/20 blur-3xl rounded-full -bottom-10 -right-20 animate-pulse"></div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-gray-900 mb-6 relative z-10"
        >
          Ace Your Interview with{' '}
          <span className="bg-gradient-to-r from-[#0F6FFF] to-[#FF8A21] bg-clip-text text-transparent">
            AI-Powered Preparation
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto relative z-10"
        >
          Upload your CV, get AI analysis, take practice exams, and receive personalized training recommendations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-x-4 relative z-10"
        >
          <Link
            href="/auth/register"
            className="inline-block bg-gradient-to-r from-[#0F6FFF] to-[#FF8A21] text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition"
          >
            Get Started
          </Link>
          <Link
            href="#how-it-works"
            className="inline-block border-2 border-[#0F6FFF] text-[#0F6FFF] px-8 py-4 rounded-full font-semibold hover:border-[#FF8A21] hover:text-[#FF8A21] hover:bg-[#fff7f0] transition"
          >
            Learn More
          </Link>
        </motion.div>

        <motion.div
          className="mt-16 flex justify-center relative z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-12 w-12 rounded-full bg-gradient-to-br from-[#0F6FFF] to-[#FF8A21] flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F6FFF]"
            aria-label="Scroll down to features"
            onClick={() => {
              const el = document.getElementById('features');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <ChevronDown className="h-6 w-6 text-white" />
          </motion.button>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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

      {/* Features Section */}
      <section id="features" className="relative py-28 bg-gradient-to-b from-white to-[#f6f4ff] overflow-hidden">

        {/* Background Glow Blobs */}
        <div className="absolute w-96 h-96 bg-[#0F6FFF]/10 blur-3xl rounded-full top-10 left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-[#FF8A21]/10 blur-3xl rounded-full bottom-10 right-20 animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center mb-16">
            <h3 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Why Choose  <span className="bg-gradient-to-r from-[#0F6FFF] to-[#FF8A21] bg-clip-text text-transparent">ExamDeck AI?</span>
            </h3>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              AI-driven tools crafted to turn your CV into measurable career growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: 'Smart CV Analysis', desc: 'AI-powered insights on your resume', icon: <Brain className="h-6 w-6 text-white" /> },
              { title: 'Practice Exams', desc: 'Industry-specific interview questions', icon: <FileText className="h-6 w-6 text-white" /> },
              { title: 'Personalized Training', desc: 'Tailored recommendations based on results', icon: <TrendingUp className="h-6 w-6 text-white" /> },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group relative rounded-3xl p-[1px] bg-gradient-to-br from-[#0F6FFF] to-[#FF8A21] shadow-xl"
              >
                <div className="rounded-3xl bg-white/90 backdrop-blur-lg p-8 h-full">
                  <div className="mb-6 h-14 w-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#0F6FFF] to-[#FF8A21] text-white shadow-md text-xl">
                    {feature.icon}
                  </div>

                  <h4 className="font-semibold text-xl mb-4 text-gray-900 group-hover:text-[#0F6FFF] transition">
                    {feature.title}
                  </h4>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8aa4ff] mb-3">
            Step-by-step journey
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            From upload to
            <span className="text-[#0F6FFF]"> interview-ready</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            ExamDeck AI guides you through a clear, repeatable loop so every session improves both your CV and your interview performance.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-5 top-0 bottom-0 hidden sm:block">
            <div className="h-full w-[2px] bg-gradient-to-b from-[#0F6FFF] via-[#8aa4ff] to-[#FF8A21]" />
          </div>

          <div className="space-y-8 sm:space-y-10">
            {[ 
              { step: 1, title: 'Register', desc: 'Create your account with email and password' },
              { step: 2, title: 'Upload CV', desc: 'Upload your resume for AI analysis' },
              { step: 3, title: 'Get Insights', desc: 'Receive detailed CV analysis and recommendations' },
              { step: 4, title: 'Take Exam', desc: 'Complete practice exams tailored to your profile' },
              { step: 5, title: 'Get Results', desc: 'View detailed evaluation and performance metrics' },
              { step: 6, title: 'Training Plan', desc: 'Receive personalized training recommendations' },
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