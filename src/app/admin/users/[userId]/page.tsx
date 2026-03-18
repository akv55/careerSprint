'use client'

import React, { useEffect, useState, use } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Mail, 
  Calendar, 
  Clock, 
  Trophy, 
  BookOpen, 
  Code2, 
  ExternalLink,
  ChevronRight,
  User as UserIcon,
  Star,
  Flame
} from 'lucide-react'
import { motion } from 'framer-motion'
import { getAdminUserDetail } from '../../actions'

export default function UserDetail({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = use(params)
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const detail = await getAdminUserDetail(userId)
        setData(detail)
      } catch (error) {
        console.error('Failed to load user detail:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [userId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!data?.profile) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-slate-900">User not found</h2>
        <Link href="/admin/users" className="text-blue-600 hover:underline mt-2 inline-block">Back to directory</Link>
      </div>
    )
  }

      const { profile, exams, domain, gamification } = data

  return (
    <div className="space-y-8 pb-12">
      <Link 
        href="/admin/users" 
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Directory
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Profile Sidebar */}
        <div className="lg:w-80 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-3xl font-bold border-4 border-white shadow-lg mx-auto mb-4 overflow-hidden">
                {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  profile.full_name?.charAt(0) || <UserIcon size={32} />
                )}
              </div>
              <h2 className="text-xl font-bold text-slate-900">{profile.full_name || 'Anonymous'}</h2>
              <p className="text-sm text-slate-500 flex items-center justify-center gap-1 mt-1">
                <Mail size={14} /> {profile.email}
              </p>
              <div className="mt-4 inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-lg border border-blue-100">
                {profile.role}
              </div>
            </div>

            <div className="mt-8 space-y-4 pt-6 border-t border-slate-50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2"><Calendar size={14} /> Joined</span>
                <span className="text-slate-900 font-medium">{new Date(profile.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2"><Trophy size={14} /> Exams Done</span>
                <span className="text-slate-900 font-medium">{exams.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2"><Star size={14} className="text-yellow-500" /> Total XP</span>
                <span className="text-slate-900 font-medium">{gamification?.experience_points || 0}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2"><Flame size={14} className="text-orange-500" /> Streak</span>
                <span className="text-slate-900 font-medium">{gamification?.current_streak || 0} days</span>
              </div>
            </div>
          </div>

          {domain && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Code2 size={18} className="text-blue-500" /> Focus Area
              </h3>
              <div className="space-y-4 text-sm text-slate-600">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Primary Domain</p>
                  <p className="font-medium text-slate-900">{domain.domain}</p>
                </div>
                {domain.secondary_domain && (
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Secondary Domain</p>
                    <p className="font-medium text-slate-900">{domain.secondary_domain}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Target Skills</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {domain.skills?.map((skill: string) => (
                      <span key={skill} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Exam History Content */}
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <BookOpen size={20} className="text-blue-500" /> Assessment History
              </h3>
              <span className="text-sm text-slate-500">Total {exams.length} sessions</span>
            </div>

            <div className="divide-y divide-slate-50">
              {exams.map((exam: any) => (
                <div key={exam.id} className="p-6 hover:bg-slate-50/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{exam.domain}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        exam.mode === 'both' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {exam.mode}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 flex items-center gap-3">
                       <span className="flex items-center gap-1"><Clock size={12} /> {Math.round(exam.time_taken_secs / 60)} mins</span>
                       <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(exam.completed_at).toLocaleDateString()}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                       <p className="text-lg font-bold text-slate-900">{exam.score}/{exam.total}</p>
                       <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              (exam.score / exam.total) > 0.7 ? 'bg-green-500' : (exam.score / exam.total) > 0.4 ? 'bg-orange-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${(exam.score / exam.total) * 100}%` }}
                          />
                       </div>
                    </div>
                    <Link href={`/admin/sessions/${exam.id}`} className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                      <ExternalLink size={18} />
                    </Link>
                  </div>
                </div>
              ))}

              {exams.length === 0 && (
                <div className="p-12 text-center text-slate-500">
                  Candidate hasn't appeared for any exams yet.
                </div>
              )}
            </div>
          </div>
          
          {/* Detailed Performance Radar Placeholder */}
          <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-500">
               <Trophy size={160} />
            </div>
            <h3 className="text-xl font-bold mb-2">Performance Analytics</h3>
            <p className="text-slate-400 max-w-md">
              Detailed skill-by-skill breakdown and growth trends for this candidate will be generated here using platform-wide benchmarks.
            </p>
            <button className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-bold transition-all disabled:opacity-50" disabled>
              Generate AI Report
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
