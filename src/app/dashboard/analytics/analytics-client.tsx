'use client'

import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ScatterChart, Scatter, ZAxis
} from 'recharts'
import { TrendingUp, Target, Clock, AlertTriangle, FileText } from 'lucide-react'
import Link from 'next/link'

interface AnalyticsData {
  hasData: boolean
  trendData: { name: string; scorePct: number; domain: string }[]
  timeVsScore: { name: string; timeMin: number; scorePct: number }[]
  domainCompare: { domain: string; avgScore: number; exams: number }[]
  skillRadar: { skill: string; accuracy: number; fullMark: number }[]
  weakestSkills: { skill: string; accuracy: number; fullMark: number }[]
}

export default function AnalyticsClient({ data }: { data: AnalyticsData }) {
  if (!data.hasData) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-16 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto mb-4">
          <TrendingUp className="w-6 h-6 text-gray-300" />
        </div>
        <p className="text-base font-bold text-gray-500">Not enough data to analyze</p>
        <p className="text-sm text-gray-400 mt-1 mb-6">Complete at least one practice exam to generate insights.</p>
        <Link href="/dashboard/exam" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-all">
          <FileText className="w-4 h-4" /> Start an Exam
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">Analytics & Insights</h1>
        <p className="text-sm text-gray-500 mt-1">Track your progress and identify areas for improvement.</p>
      </div>

      {/* Weakest links alert */}
      {data.weakestSkills.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-red-900">Recommended Focus Areas</h2>
              <p className="text-xs text-red-600">Based on your recent performance, you should study these topics:</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.weakestSkills.map(ws => (
              <div key={ws.skill} className="bg-white rounded-xl border border-red-100 p-4 shadow-sm">
                <p className="text-xs font-bold text-gray-500 uppercase">{ws.skill}</p>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-2xl font-extrabold text-red-500">{ws.accuracy}%</span>
                  <span className="text-xs font-semibold text-gray-400 mb-1">accuracy</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Trend Area Chart */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" /> Score Trend
            </h3>
            <p className="text-xs text-gray-400 mt-1">Your overall performance progression</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any) => [`${value}%`, 'Score']}
                />
                <Area type="monotone" dataKey="scorePct" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Mastery Radar Chart */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" /> Skill Mastery Radar
            </h3>
            <p className="text-xs text-gray-400 mt-1">Relative strengths across tested topics</p>
          </div>
          
          {data.skillRadar.length < 3 ? (
            <div className="h-64 flex items-center justify-center">
              <p className="text-sm text-gray-400 text-center px-8">Need data for at least 3 distinct skills to generate radar chart. Keep taking tests!</p>
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data.skillRadar}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: '#6b7280' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Accuracy" dataKey="accuracy" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.4} />
                  <Tooltip formatter={(val: any) => [`${val}%`, 'Accuracy']} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Domain Comparison Bar Chart */}
        {data.domainCompare.length > 1 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                 Domain Breakdown
              </h3>
              <p className="text-xs text-gray-400 mt-1">Average scores grouped by domain</p>
            </div>
            <div className="space-y-4 pt-2">
              {data.domainCompare.map(d => (
                <div key={d.domain}>
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-sm font-semibold text-gray-700">{d.domain}</span>
                    <span className="text-sm font-extrabold text-gray-900">{d.avgScore}%</span>
                  </div>
                  <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${d.avgScore >= 70 ? 'bg-green-500' : d.avgScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${d.avgScore}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">Based on {d.exams} exam{d.exams > 1 ? 's' : ''}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Time vs Score Scatter Plot */}
        <div className={`bg-white border border-gray-200 rounded-2xl p-6 shadow-sm ${data.domainCompare.length <= 1 ? 'lg:col-span-2' : ''}`}>
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" /> Speed vs Accuracy
            </h3>
            <p className="text-xs text-gray-400 mt-1">Are you rushing or taking too much time?</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis type="number" dataKey="timeMin" name="Time" unit="m" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis type="number" dataKey="scorePct" name="Score" unit="%" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <ZAxis range={[100, 100]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(val: any, name: any) => [name === 'Time' ? `${val} m` : `${val}%`, name]}
                />
                <Scatter name="Exams" data={data.timeVsScore} fill="#f59e0b" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  )
}
