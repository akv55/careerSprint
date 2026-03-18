'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Mail, 
  Calendar,
  ShieldCheck,
  User as UserIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { motion } from 'framer-motion'
import { getAdminUsers } from '../actions'

export default function UserDirectory() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    async function loadUsers() {
      setLoading(true)
      try {
        const { users, totalCount } = await getAdminUsers({ search, page, pageSize })
        setUsers(users)
        setTotalCount(totalCount)
      } catch (error) {
        console.error('Failed to load users:', error)
      } finally {
        setLoading(false)
      }
    }
    const timeout = setTimeout(loadUsers, 300)
    return () => clearTimeout(timeout)
  }, [search, page])

  // Reset page when search changes
  useEffect(() => {
    setPage(1)
  }, [search])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Directory</h1>
          <p className="text-slate-500">Manage and monitor all platform candidates.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100" />
                        <div className="space-y-2">
                          <div className="h-4 w-32 bg-slate-100 rounded" />
                          <div className="h-3 w-48 bg-slate-100 rounded" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><div className="h-4 w-16 bg-slate-100 rounded" /></td>
                    <td className="px-6 py-4"><div className="h-4 w-24 bg-slate-100 rounded" /></td>
                    <td className="px-6 py-4 text-right"><div className="h-8 w-8 bg-slate-100 rounded ml-auto" /></td>
                  </tr>
                ))
              ) : users.map((user) => {
                const displayName = user.full_name || user.email || 'Anonymous'
                const initials = displayName.split(' ').map((w: string) => w[0]).slice(0,2).join('').toUpperCase()
                return (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold border border-blue-100 flex-shrink-0 overflow-hidden">
                        {user.avatar_url ? (
                          <img src={user.avatar_url} alt={displayName} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-sm font-bold text-blue-600">{initials}</span>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{displayName}</p>
                        <p className="text-sm text-slate-500 flex items-center gap-1">
                          <Mail size={12} /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' 
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' 
                        : 'bg-green-50 text-green-700 border border-green-100'
                    }`}>
                      {user.role === 'admin' && <ShieldCheck size={12} />}
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Calendar size={14} />
                      {new Date(user.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <Link 
                        href={`/admin/users/${user.id}`}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="View Details"
                       >
                        <Eye size={18} />
                       </Link>
                       <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                        <MoreHorizontal size={18} />
                       </button>
                    </div>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
        
        {!loading && users.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <Users size={32} />
            </div>
            <h3 className="text-slate-900 font-semibold mb-1">No users found</h3>
            <p className="text-slate-500">Try adjusting your search terms.</p>
          </div>
        )}

        <div className="p-4 border-t border-slate-50 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium text-slate-900">{(page - 1) * pageSize + 1} - {Math.min(page * pageSize, totalCount)}</span> of <span className="font-medium text-slate-900">{totalCount}</span> candidates
          </p>
          <div className="flex items-center gap-2">
             <button 
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="p-2 text-slate-400 hover:text-slate-600 border border-transparent hover:border-slate-200 rounded-lg disabled:opacity-30 transition-all"
             >
              <ChevronLeft size={20} />
             </button>
             <button 
              disabled={page === Math.ceil(totalCount / pageSize)}
              onClick={() => setPage(page + 1)}
              className="p-2 text-slate-400 hover:text-slate-600 border border-transparent hover:border-slate-200 rounded-lg disabled:opacity-30 transition-all"
             >
              <ChevronRight size={20} />
             </button>
          </div>
        </div>
      </div>
    </div>
  )
}
