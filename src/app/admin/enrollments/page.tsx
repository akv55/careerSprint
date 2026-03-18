'use client'

import React, { useEffect, useState } from 'react'
import { 
  Search, Mail, Calendar, CheckCircle2, XCircle, Clock, 
  ChevronLeft, ChevronRight, ShoppingBag, TrendingUp, 
  DollarSign, AlertCircle, ShoppingCart, Phone 
} from 'lucide-react'
import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts'
import { 
  getAdminEnrollments, 
  getRevenueStats, getLeads, updateLeadStatus 
} from '../actions'

function RevenueView() {
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

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
             <DollarSign size={80} />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-green-50 text-green-600">
              <DollarSign size={24} />
            </div>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Total Expected Revenue</h3>
          <p className="text-3xl font-extrabold text-slate-900 mt-1">₹{(stats?.totalExpected || 0).toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
             <ShoppingCart size={80} />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
              <TrendingUp size={24} />
            </div>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Total Collected</h3>
          <p className="text-3xl font-extrabold text-slate-900 mt-1">₹{(stats?.totalCollected || 0).toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
             <AlertCircle size={80} />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-orange-50 text-orange-600">
              <AlertCircle size={24} />
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-50 text-orange-700">Needs Attention</span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Remaining Payments</h3>
          <p className="text-3xl font-extrabold text-orange-600 mt-1">₹{(stats?.totalRemaining || 0).toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <TrendingUp className="text-blue-500" size={20} /> Revenue Collected Over Time
        </h2>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats?.chartData || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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

function LeadsView() {
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await getLeads()
        setLeads(data)
      } catch (err) {
        console.error('Failed to load leads:', err)
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in zoom-in-95 duration-200">
       {leads.map(lead => (
         <div key={lead.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{lead.full_name || lead.name || (lead.profiles ? (Array.isArray(lead.profiles) ? lead.profiles[0]?.full_name : lead.profiles?.full_name) : null) || 'Unknown Name'}</h3>
            <p className="text-sm font-semibold text-blue-600 mt-1 truncate">{lead.course_title || lead.course_id || 'Target Course/Demo'}</p>
            
            <div className="mt-5 space-y-4 text-sm text-slate-600">
              {(lead.email || (lead.profiles ? (Array.isArray(lead.profiles) ? lead.profiles[0]?.email : lead.profiles?.email) : null)) && (() => {
                const mail = lead.email || (lead.profiles ? (Array.isArray(lead.profiles) ? lead.profiles[0]?.email : lead.profiles?.email) : '');
                return (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Mail size={14} />
                    </div>
                    <a href={`mailto:${mail}`} className="hover:text-blue-600 truncate block w-full">{mail}</a>
                  </div>
                )
              })()}
              {(lead.mobile_no || lead.phone || (lead.profiles ? (Array.isArray(lead.profiles) ? lead.profiles[0]?.mobile_no : lead.profiles?.mobile_no) : null)) && (() => {
                const phoneNum = lead.mobile_no || lead.phone || (lead.profiles ? (Array.isArray(lead.profiles) ? lead.profiles[0]?.mobile_no : lead.profiles?.mobile_no) : '');
                return (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                      <Phone size={14} />
                    </div>
                    <a href={`tel:${phoneNum}`} className="hover:text-green-600">{phoneNum}</a>
                  </div>
                )
              })()}
              <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center shrink-0">
                    <Calendar size={14} />
                  </div>
                  <span>{new Date(lead.created_at).toLocaleDateString()}</span>
              </div>
            </div>
         </div>
       ))}
       {leads.length === 0 && (
         <div className="col-span-full py-16 text-center text-slate-500 bg-white rounded-2xl border border-dashed border-slate-200">
           No leads found.
         </div>
       )}
    </div>
  )
}

function EnrollmentsList() {
  const [enrollments, setEnrollments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    async function loadEnrollments() {
      setLoading(true)
      try {
        const { enrollments, totalCount } = await getAdminEnrollments({ search, status: statusFilter, page, pageSize })
        setEnrollments(enrollments)
        setTotalCount(totalCount)
      } catch (error) {
        console.error('Failed to load enrollments:', error)
      } finally {
        setLoading(false)
      }
    }
    const timeout = setTimeout(loadEnrollments, 300)
    return () => clearTimeout(timeout)
  }, [search, statusFilter, page])

  useEffect(() => { setPage(1) }, [search, statusFilter])
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))

  return (
    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
      <div className="flex flex-col sm:flex-row items-center gap-3 justify-end">
        <div className="relative group min-w-[250px] w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search course or phone..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm appearance-none"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student & Course</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Payment Details</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Dates</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                     <td className="px-6 py-4"><div className="h-4 w-48 bg-slate-100 rounded mb-2" /><div className="h-3 w-32 bg-slate-100 rounded" /></td>
                     <td className="px-6 py-4"><div className="h-10 w-24 bg-slate-100 rounded" /></td>
                     <td className="px-6 py-4"><div className="h-6 w-24 bg-slate-100 rounded-xl" /></td>
                     <td className="px-6 py-4"><div className="h-4 w-24 bg-slate-100 rounded" /></td>
                  </tr>
                ))
              ) : enrollments.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                      <ShoppingBag size={24} className="text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">No Enrollments Found</h3>
                    <p className="text-sm text-slate-500">Wait for some purchases or change your search filters.</p>
                  </td>
                </tr>
              ) : (
                enrollments.map((en, index) => {
                  const profile = Array.isArray(en.profiles) ? en.profiles[0] : en.profiles
                  return (
                    <motion.tr 
                      key={en.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900">{profile?.full_name || 'Anonymous User'}</span>
                          <span className="text-sm font-semibold text-blue-600 mt-0.5">{en.course_title}</span>
                          <span className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                            <Mail size={12} /> {profile?.email || 'N/A'} • {en.mobile_no || 'No phone'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1 text-sm">
                          <span className="text-slate-500">Total: <span className="font-bold text-slate-900">₹{en.total_course_amount || en.amount_paid}</span></span>
                          <span className="text-slate-500">Paid: <span className="font-bold text-green-600">₹{en.amount_paid}</span></span>
                          <span className="text-slate-500">Left: <span className="font-bold text-orange-600">₹{en.remaining_amount || 0}</span></span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide border ${
                          en.payment_status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' :
                          en.payment_status === 'pending' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                          'bg-red-50 text-red-700 border-red-200'
                        }`}>
                           {en.payment_status === 'completed' && <CheckCircle2 size={14} />}
                           {en.payment_status === 'pending' && <Clock size={14} />}
                           {en.payment_status === 'failed' && <XCircle size={14} />}
                           {en.payment_status}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar size={14} className="text-slate-400" />
                          {new Date(en.purchased_at).toLocaleDateString()}
                        </span>
                      </td>
                    </motion.tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {totalCount > pageSize && !loading && (
          <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-white text-sm">
            <p className="text-slate-500">
              Showing <span className="font-bold text-slate-900">{Math.min((page - 1) * pageSize + 1, totalCount)}</span> to <span className="font-bold text-slate-900">{Math.min(page * pageSize, totalCount)}</span> of <span className="font-bold text-slate-900">{totalCount}</span>
            </p>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronLeft size={16} /></button>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronRight size={16} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function EnrollmentsHub() {
  const [activeTab, setActiveTab] = useState<'enrollments' | 'revenue' | 'leads'>('enrollments')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Sales & Enrollments Hub</h1>
        <p className="text-slate-500">Manage course purchases, track leads, and view platform revenue.</p>
      </div>

      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto custom-scrollbar pb-px">
        <button
          onClick={() => setActiveTab('enrollments')}
          className={`px-4 py-3 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'enrollments' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShoppingBag size={18} /> Enrollments
        </button>
        <button
          onClick={() => setActiveTab('leads')}
          className={`px-4 py-3 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'leads' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Phone size={18} /> Leads Management
        </button>
        <button
          onClick={() => setActiveTab('revenue')}
          className={`px-4 py-3 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'revenue' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <DollarSign size={18} /> Revenue Dashboard
        </button>
      </div>

      <div>
        {activeTab === 'enrollments' && <EnrollmentsList />}
        {activeTab === 'revenue' && <RevenueView />}
        {activeTab === 'leads' && <LeadsView />}
      </div>
    </div>
  )
}
