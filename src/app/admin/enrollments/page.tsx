'use client'

import React, { useEffect, useState } from 'react'
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Mail, 
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  CreditCard
} from 'lucide-react'
import { motion } from 'framer-motion'
import { getAdminEnrollments } from '../actions'

export default function EnrollmentsDirectory() {
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

  useEffect(() => {
    setPage(1)
  }, [search, statusFilter])

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Enrollments Tracker</h1>
          <p className="text-slate-500">Manage course purchases and leads.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative group min-w-[250px]">
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
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student & Course</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Dates</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                     <td className="px-6 py-4">
                        <div className="h-4 w-48 bg-slate-100 rounded mb-2" />
                        <div className="h-3 w-32 bg-slate-100 rounded" />
                     </td>
                     <td className="px-6 py-4"><div className="h-4 w-16 bg-slate-100 rounded" /></td>
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
                      className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
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
                        <span className="font-bold text-slate-700">₹{en.amount_paid}</span>
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
              Showing <span className="font-bold text-slate-900">{Math.min((page - 1) * pageSize + 1, totalCount)}</span> to <span className="font-bold text-slate-900">{Math.min(page * pageSize, totalCount)}</span> of <span className="font-bold text-slate-900">{totalCount}</span> enrollments
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Previous Page"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Next Page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
