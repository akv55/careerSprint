'use client'

import React, { useEffect, useState } from 'react'
import { 
  Trophy, 
  Flame, 
  User as UserIcon,
  Crown,
  Star,
  Zap,
  Award,
  TrendingUp,
  Sparkles,
  Medal
} from 'lucide-react'
import { motion } from 'framer-motion'
import { getLeaderboard, getMyGamificationStatus } from './actions'

export default function LeaderboardClient() {
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [myStatus, setMyStatus] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [lb, status] = await Promise.all([
          getLeaderboard(),
          getMyGamificationStatus()
        ])
        setLeaderboard(lb)
        setMyStatus(status)
      } catch (error) {
        console.error('Failed to load leaderboard:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          <Trophy className="absolute inset-0 m-auto text-blue-600" size={28} />
        </div>
        <p className="text-slate-400 font-medium animate-pulse text-sm">Assembling Hall of Fame...</p>
      </div>
    )
  }

  const topThree = leaderboard.slice(0, 3)
  const others = leaderboard.slice(3)
  const myRank = leaderboard.findIndex(l => l.id === myStatus?.id) + 1

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-8 md:p-10 text-white shadow-2xl shadow-blue-900/20">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] font-bold uppercase tracking-widest">
              <Sparkles size={12} /> Season 1: Genesis
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Fame</span>
            </h1>
            <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
              The definitive ranking of CareerSprint's most dedicated tech talents.
            </p>
          </div>

          <div className="flex items-center gap-4 md:gap-6 p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <div className="text-center space-y-1 px-2">
              <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">Total XP</p>
              <p className="text-2xl font-black text-white">{myStatus?.experience_points?.toLocaleString() || 0}</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center space-y-1 px-2">
              <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">Rank</p>
              <p className="text-2xl font-black text-blue-400">{myRank ? `#${myRank}` : '--'}</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center space-y-1 px-2">
              <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">Streak</p>
              <p className="text-2xl font-black text-orange-400 flex items-center justify-center gap-1">
                {myStatus?.current_streak || 0} <Flame size={18} className="fill-current" />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Podium Section */}
      <div className="max-w-3xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-2 md:gap-8 items-end pt-12">
          {/* SILVER - 2nd */}
          {topThree[1] && (
            <div className="relative group">
              <div className="flex flex-col items-center gap-3 mb-4">
                <div className="relative">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-slate-300 p-1 bg-white shadow-lg overflow-hidden">
                    <img src={topThree[1].avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${topThree[1].full_name}`} alt="" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-slate-400 rounded-full border-2 border-white flex items-center justify-center text-white font-black text-xs">2</div>
                </div>
                <div className="text-center">
                  <p className="font-bold text-slate-900 text-xs truncate w-20 md:w-28">{topThree[1].full_name}</p>
                  <p className="text-blue-600 font-bold text-[10px] uppercase">{topThree[1].experience_points.toLocaleString()} XP</p>
                </div>
              </div>
              <div className="h-24 md:h-32 rounded-t-3xl bg-slate-100 border-x border-t border-slate-200/50 flex flex-col items-center justify-end pb-4">
                <span className="text-slate-300 font-black text-4xl opacity-50">2</span>
              </div>
            </div>
          )}

          {/* GOLD - 1st */}
          {topThree[0] && (
            <div className="relative group z-10 scale-110 -bottom-2">
              <div className="flex flex-col items-center gap-3 mb-4">
                <div className="relative">
                   <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-yellow-500">
                    <Crown size={36} className="fill-current" />
                  </div>
                  <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border-4 border-yellow-400 p-1 bg-white shadow-2xl shadow-yellow-500/20 overflow-hidden">
                    <img src={topThree[0].avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${topThree[0].full_name}`} alt="" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-yellow-500 rounded-full border-2 border-white flex items-center justify-center text-white font-black text-sm">1</div>
                </div>
                <div className="text-center">
                  <p className="font-black text-slate-900 text-sm truncate w-24 md:w-36">{topThree[0].full_name}</p>
                  <p className="text-yellow-600 font-black text-xs uppercase">{topThree[0].experience_points.toLocaleString()} XP</p>
                </div>
              </div>
              <div className="h-32 md:h-44 rounded-t-3xl bg-slate-900 border-x border-t border-slate-800 shadow-xl flex flex-col items-center justify-end pb-6">
                <span className="text-white/10 font-black text-6xl">1</span>
              </div>
            </div>
          )}

          {/* BRONZE - 3rd */}
          {topThree[2] && (
            <div className="relative group">
              <div className="flex flex-col items-center gap-3 mb-3">
                <div className="relative">
                  <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border-4 border-orange-400/40 p-1 bg-white shadow-md overflow-hidden">
                    <img src={topThree[2].avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${topThree[2].full_name}`} alt="" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-orange-600 rounded-full border-2 border-white flex items-center justify-center text-white font-black text-[10px]">3</div>
                </div>
                <div className="text-center">
                  <p className="font-bold text-slate-900 text-[10px] truncate w-16 md:w-24">{topThree[2].full_name}</p>
                  <p className="text-orange-600 font-bold text-[9px] uppercase">{topThree[2].experience_points.toLocaleString()} XP</p>
                </div>
              </div>
              <div className="h-20 md:h-28 rounded-t-3xl bg-orange-50 border-x border-t border-orange-200/50 flex flex-col items-center justify-end pb-3">
                <span className="text-orange-200 font-black text-3xl opacity-50">3</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Ranking List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <TrendingUp size={16} className="text-blue-600" /> Rankings
              </h2>
            </div>

            <div className="divide-y divide-slate-50">
              {others.map((member, idx) => {
                 const rank = idx + 4
                 const isMe = member.id === myStatus?.id
                 return (
                  <div 
                    key={member.id} 
                    className={`px-6 py-4 flex items-center gap-4 transition-all ${isMe ? 'bg-blue-50/50' : 'hover:bg-slate-50/80'}`}
                  >
                    <div className="w-6 text-sm font-black text-slate-300">
                      {rank}
                    </div>
                    
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-100 overflow-hidden p-0.5">
                      <img 
                        src={member.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.full_name}`} 
                        alt="" 
                        className="w-full h-full object-cover rounded-lg" 
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-sm truncate ${isMe ? 'text-blue-700' : 'text-slate-900'}`}>
                          {member.full_name || 'Anonymous'}
                        </span>
                        {isMe && <span className="px-1.5 py-0.5 rounded bg-blue-600 text-white text-[8px] font-bold">YOU</span>}
                      </div>
                      <div className="flex gap-1.5 mt-0.5">
                        {member.badges?.slice(0, 2).map((badge: string) => (
                           <span key={badge} className="px-1.5 py-0.25 rounded-md bg-slate-100 text-slate-500 text-[8px] font-bold tracking-tight">
                              {badge}
                           </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-base font-black text-slate-900 leading-none">{member.experience_points.toLocaleString()}</p>
                      <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-1">XP</p>
                    </div>
                  </div>
                 )
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Achievements */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden group">
            <Award className="text-blue-400 mb-4" size={32} />
            <h3 className="text-lg font-black mb-1">Your Legacy</h3>
            <p className="text-slate-400 text-xs mb-6">Track your milestones and growth.</p>
            
            <div className="space-y-4">
               <div className="flex justify-between items-end border-b border-white/10 pb-4">
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Lifetime XP</p>
                    <p className="text-xl font-black text-white">{myStatus?.experience_points?.toLocaleString() || 0}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Achievements</p>
                    <p className="text-xl font-black text-blue-400">{myStatus?.badges?.length || 0}</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-2">
                  {['Speedster', 'Consistent', 'Scholar', 'Expert'].map(m => {
                    const unlocked = myStatus?.badges?.includes(m)
                    return (
                      <div key={m} className={`p-3 rounded-2xl border ${unlocked ? 'bg-white/10 border-white/20' : 'bg-transparent border-white/5 opacity-50'} flex flex-col items-center gap-1`}>
                         <Medal size={16} className={unlocked ? 'text-blue-400' : 'text-slate-600'} />
                         <p className="text-[8px] font-black uppercase text-center">{m}</p>
                      </div>
                    )
                  })}
               </div>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-xl space-y-6">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Zap className="text-yellow-500 fill-yellow-500" size={18} /> Milestone
            </h3>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-slate-500">NEXT: 2,500 XP</span>
                  <span className="text-blue-600">{Math.min(100, Math.round(((myStatus?.experience_points || 0) / 2500) * 100))}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-blue-600 rounded-full"
                     style={{ width: `${Math.min(100, ((myStatus?.experience_points || 0) / 2500) * 100)}%` }}
                   />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
