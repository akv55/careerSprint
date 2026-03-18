'use client'

import React, { useEffect, useState } from 'react'
import { getRevenueStats } from '../actions'
import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, AlertCircle, ShoppingCart } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts'

export default function SalesDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await getRevenueStats()
        setStats(data)
      } catch (err) {
        console.error('Failed to load revenue stats:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const mrrValues = stats?.mrrData?.map((m: any) => m.revenue) || [0]
  const currentMRR = mrrValues[mrrValues.length - 1] || 0
  const previousMRR = mrrValues[mrrValues.length - 2] || 0
  const mrrGrowth = previousMRR > 0 ? ((currentMRR - previousMRR) / previousMRR) * 100 : 0

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Sales Dashboard</h1>
        <p className="text-slate-500">Track MRR, course revenue, and pending transactions.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
             <DollarSign size={80} />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-green-50 text-green-600">
              <DollarSign size={24} />
            </div>
            {mrrGrowth !== 0 && (
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${mrrGrowth > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {mrrGrowth > 0 ? '+' : ''}{mrrGrowth.toFixed(1)}% Month
              </span>
            )}
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Monthly Recurring Revenue (MRR)</h3>
          <p className="text-3xl font-extrabold text-slate-900 mt-1">₹{currentMRR.toLocaleString()}</p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
             <ShoppingCart size={80} />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
              <TrendingUp size={24} />
            </div>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Total Lifetime Sales</h3>
          <p className="text-3xl font-extrabold text-slate-900 mt-1">₹{(stats?.totalRevenue || 0).toLocaleString()}</p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="bg-white p-6 rounded-2xl shadow-sm border border-orange-200 hover:shadow-md transition-shadow relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
             <AlertCircle size={80} />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-orange-50 text-orange-600">
              <AlertCircle size={24} />
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-50 text-orange-700">Needs Attention</span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Pending/Partial Payments</h3>
          <p className="text-3xl font-extrabold text-orange-600 mt-1">₹{(stats?.pendingRevenue || 0).toLocaleString()}</p>
        </motion.div>
      </div>

      {/* MRR Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <TrendingUp className="text-blue-500" size={20} />
          Revenue Growth
        </h2>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats?.mrrData || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} tickFormatter={(value) => `₹${value}`} />
              <RechartsTooltip 
                formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, 'Revenue']}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: '#0f172a', fontWeight: 600 }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
