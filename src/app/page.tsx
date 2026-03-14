'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown, Upload, Settings, LibraryBig, CheckSquare } from "lucide-react";
import LandingNavbar from '@/components/layouts/navbar';
import LandingFooter from '@/components/layouts/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafbfc] text-gray-900 selection:bg-yellow-300 relative">
      {/* Global Background Dots */}
      <div className="fixed inset-0 bg-[radial-gradient(#d1d5db_2px,transparent_2px)] [background-size:24px_24px] opacity-60 pointer-events-none z-0"></div>

      {/* Navigation */}
      <LandingNavbar />

      {/* Hero Section */}
      <section className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 min-h-[90vh] flex flex-col justify-center items-center text-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 space-y-8 max-w-4xl"
        >
          <div className="inline-block px-4 py-1.5 mb-2 border-2 border-gray-900 rounded-full bg-white font-bold text-sm shadow-[4px_4px_0px_0px_rgba(17,24,39,1)]">
            🎯 Build Your Interview Confidence
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-accent tracking-tight leading-[1.1]">
            Validate your skills. <br />
            <span className="text-primary">Nail the interview.</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Extract your skills directly from your resume or enter them manually.
            Generate limitless practice exams tailored to your domain—served in focused, 30-question sessions so you never burn out.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              href="/auth/register"
              className="w-full sm:w-auto px-8 py-4 bg-accent text-white font-extrabold rounded-xl border-2 border-accent shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              Start Practicing Now
            </Link>
            <button
              onClick={() => {
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] hover:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              See How It Works
            </button>
          </div>
        </motion.div>
      </section>

      {/* Feature Banner */}
      <section className="bg-[#0F6FFF] border-y-2 border-gray-900 py-6 overflow-hidden hidden sm:flex relative z-10">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
          className="flex whitespace-nowrap w-max"
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-12 px-6 items-center text-white font-black text-xl md:text-2xl uppercase tracking-widest">
              <span>★ Unlimited Exams</span>
              <span>★ 30 Questions Per Test</span>
              <span>★ 100% Curated Bank</span>
              <span>★ Endless Practice</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
              A straightforward path to interview readiness
            </h2>
            <p className="text-lg text-gray-600 font-medium">
              CareerSprint eliminates the guesswork surrounding interview prep. You define your domain—either by extracting capabilities directly from your PDF resume using lightning-fast local parsing libraries, or by manually typing them in.
            </p>
            <p className="text-lg text-gray-600 font-medium">
              Every time you want to practice, we generate a fresh, comprehensive 30-question exam pulled strictly from verified, industry-standard question banks. You can take as many unique tests as you need to hone your expertise.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="p-6 bg-white border-2 border-gray-900 rounded-xl shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] flex-1 min-w-[120px]">
                <p className="text-4xl font-black text-[#0F6FFF]">30</p>
                <p className="text-xs sm:text-sm font-bold text-gray-700 mt-2 uppercase tracking-wide">Questions <br /> per Session</p>
              </div>
              <div className="p-6 bg-white border-2 border-gray-900 rounded-xl shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] flex-1 min-w-[120px]">
                <p className="text-4xl font-black text-[#FF8A21]">∞</p>
                <p className="text-xs sm:text-sm font-bold text-gray-700 mt-2 uppercase tracking-wide">Unlimited <br /> Practice</p>
              </div>
              <div className="p-6 bg-[#0F6FFF] border-2 border-gray-900 rounded-xl shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] flex-1 min-w-[120px]">
                <p className="text-4xl font-black text-white">100%</p>
                <p className="text-xs sm:text-sm font-bold text-blue-100 mt-2 uppercase tracking-wide">Data <br /> Privacy</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div className="bg-white p-8 rounded-2xl border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] hover:-translate-y-2 transition-transform duration-300">
              <div className="mb-4 inline-block p-3 bg-blue-100 border-2 border-blue-200 rounded-xl">
                <Upload className="h-8 w-8 text-[#0F6FFF]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Resume Parsing</h3>
              <p className="text-sm text-gray-600 font-medium">We extract text locally from your PDF and quickly identify key frameworks and skill sets.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] hover:-translate-y-2 transition-transform duration-300">
              <div className="mb-4 inline-block p-3 bg-orange-100 border-2 border-orange-200 rounded-xl">
                <Settings className="h-8 w-8 text-[#FF8A21]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Manual Control</h3>
              <p className="text-sm text-gray-600 font-medium">Prefer setting the rules? Type in your target role and domains manually to focus the test.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] hover:-translate-y-2 transition-transform duration-300 sm:col-span-2">
              <div className="mb-4 inline-block p-3 bg-green-100 border-2 border-green-200 rounded-xl">
                <LibraryBig className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Curated Question Bank</h3>
              <p className="text-sm text-gray-600 font-medium">Every practice exam is compiled from a massive database of vetted, high-quality interview questions designed to challenge you just like a real technical interview would.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 bg-gray-900 text-white py-24 border-y-2 border-gray-900 overflow-hidden">
        {/* Decorative Grid on dark background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] bg-fixed pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              How CareerSprint Works
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto font-medium">
              Start practicing in minutes. No complex setups, just pure interview prep.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Register', desc: 'Securely create a free account to track your progress over time.' },
              { step: '02', title: 'Parse & Setup', desc: 'Upload your CV or enter your skills. We use fast local logic to determine your domain.' },
              { step: '03', title: 'Take Exam', desc: 'Dive into a fresh 30-question test randomized from our extensive library.' },
              { step: '04', title: 'Review & Repeat', desc: 'Check correct solutions, patch your knowledge gaps, and generate another test.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-gray-800 border-2 border-gray-700 p-8 rounded-2xl relative overflow-hidden transition-all duration-300 hover:border-gray-500 hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]"
              >
                <div className="text-7xl font-black text-gray-700/30 absolute -right-4 -bottom-4 select-none">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3 relative z-10 text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm font-medium relative z-10 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 bg-[#FF8A21] border-b-2 border-gray-900 border-t-2 overflow-hidden">
        {/* Local Background Dots */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.15)_2px,transparent_2px)] [background-size:24px_24px] bg-fixed pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Ready to test your limits?
          </h2>
          <p className="text-xl text-gray-900/80 font-bold mb-10 max-w-2xl mx-auto">
            Join thousands of candidates who are leveling up their interview skills with targeted question banks.
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-gray-900 font-black text-lg rounded-xl border-4 border-gray-900 shadow-[6px_6px_0px_0px_rgba(17,24,39,1)] hover:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
          >
            Create Your Free Account
            <CheckSquare className="w-6 h-6" />
          </Link>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}