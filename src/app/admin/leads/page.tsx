'use client'

import React, { useEffect, useState } from 'react'
import { getLeads, updateLeadStatus } from '../actions'
import { motion } from 'framer-motion'
import { Phone, Mail, Calendar, CheckCircle2, Circle, ArrowRight } from 'lucide-react'

const kanbanColumns = [
  { id: 'new', label: 'New Leads', color: 'blue' },
  { id: 'contacted', label: 'Contacted', color: 'orange' },
  { id: 'converted', label: 'Converted', color: 'green' }
]

export default function LeadsManagement() {
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

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      // Optimistic update
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l))
      await updateLeadStatus(id, newStatus)
    } catch (err) {
      console.error('Failed to update lead status:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Lead Management</h1>
        <p className="text-slate-500">Track and convert potential course students via phone or email.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {kanbanColumns.map(col => {
          const colLeads = leads.filter(l => (l.status || 'new') === col.id)
          return (
            <div key={col.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col h-[calc(100vh-200px)]">
               <div className="flex items-center justify-between mb-4 px-2">
                 <h2 className="font-bold text-slate-800 flex items-center gap-2">
                   <div className={`w-3 h-3 rounded-full bg-${col.color}-500`} />
                   {col.label}
                 </h2>
                 <span className={`text-xs font-bold text-${col.color}-700 bg-${col.color}-100 px-2.5 py-1 rounded-full`}>
                   {colLeads.length}
                 </span>
               </div>

               <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
                 {colLeads.map(lead => (
                   <motion.div 
                     layoutId={lead.id}
                     key={lead.id} 
                     className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative group cursor-grab active:cursor-grabbing"
                   >
                      <h3 className="font-bold text-slate-900 line-clamp-1">{lead.name || 'Unknown Name'}</h3>
                      <p className="text-sm font-medium text-blue-600 truncate mt-0.5">{lead.course_id || 'AI Exam Series'}</p>
                      
                      <div className="mt-3 space-y-2 text-xs text-slate-500">
                        {lead.email && (
                          <div className="flex items-center gap-2">
                            <Mail size={13} className="text-slate-400" />
                            <a href={`mailto:${lead.email}`} className="hover:text-blue-600 truncate">{lead.email}</a>
                          </div>
                        )}
                        {lead.phone && (
                          <div className="flex items-center gap-2">
                            <Phone size={13} className="text-slate-400" />
                            <a href={`tel:${lead.phone}`} className="hover:text-blue-600">{lead.phone}</a>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-xs">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(lead.created_at).toLocaleDateString()}
                        </span>
                        
                        {/* Quick action block */}
                        <div className="flex items-center gap-1">
                           {col.id === 'new' && (
                             <button onClick={() => handleStatusChange(lead.id, 'contacted')} className="px-2 py-1 bg-orange-50 text-orange-600 hover:bg-orange-100 rounded font-semibold transition-colors">
                               Contact
                             </button>
                           )}
                           {col.id === 'contacted' && (
                             <button onClick={() => handleStatusChange(lead.id, 'converted')} className="px-2 py-1 bg-green-50 text-green-600 hover:bg-green-100 rounded font-semibold transition-colors flex items-center gap-1">
                               <CheckCircle2 size={12} /> Convert
                             </button>
                           )}
                           {col.id === 'converted' && lead.converted_at && (
                             <span className="text-green-600 font-medium">Done</span>
                           )}
                        </div>
                      </div>
                   </motion.div>
                 ))}
                 
                 {colLeads.length === 0 && (
                   <div className="h-24 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                     <p className="text-sm font-medium text-slate-400">No leads here</p>
                   </div>
                 )}
               </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
