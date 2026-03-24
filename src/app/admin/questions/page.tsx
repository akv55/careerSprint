'use client'

import React, { useEffect, useState } from 'react'
import { 
  Plus, 
  Search, 
  Database, 
  Trash2, 
  Filter, 
  Upload,
  BookOpen,
  HelpCircle,
  Tag,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAdminQuestions, deleteQuestion, getAdminFilterOptions } from '../actions'
import BulkUploadModal from './bulk-upload'
import AddSingleModal from './add-single'
import CustomSelect from '@/components/ui/custom-select'

export default function QuestionBank() {
  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [domain, setDomain] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [availableDomains, setAvailableDomains] = useState<string[]>([])
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const loadFilterOptions = async () => {
    try {
      const { domains } = await getAdminFilterOptions()
      setAvailableDomains(domains)
    } catch (error) {
      console.error('Failed to load filter options:', error)
    }
  }

  const loadQuestions = async () => {
    setLoading(true)
    try {
      const { questions, totalCount } = await getAdminQuestions({ 
        search, 
        domain, 
        page, 
        pageSize 
      })
      setQuestions(questions)
      setTotalCount(totalCount)
    } catch (error) {
      console.error('Failed to load questions:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFilterOptions()
  }, [])

  useEffect(() => {
    const timeout = setTimeout(loadQuestions, 300)
    return () => clearTimeout(timeout)
  }, [search, domain, page])

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [search, domain])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return
    try {
      const res = await deleteQuestion(id)
      if (res.success) {
        setQuestions(prev => prev.filter(q => q.id !== id))
      }
    } catch (error: any) {
      console.error('Delete error:', error)
      alert(error.message || 'Failed to delete question')
    }
  }

  const domains = Array.from(new Set(questions.map(q => q.domain))).sort()

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Question Bank</h1>
          <p className="text-slate-500">Manage standard technical questions and skill tags.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-bold text-sm shadow-lg shadow-slate-900/10"
          >
            <Upload size={18} /> Bulk Upload
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold text-sm shadow-lg shadow-blue-500/10"
          >
            <Plus size={18} /> New Question
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative group flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search question pool..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <CustomSelect
            options={[
              { label: 'All Domains', value: '' },
              ...availableDomains.map(d => ({ label: d, value: d }))
            ]}
            value={domain}
            onChange={setDomain}
            className="w-48"
          />
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-slate-50 rounded-2xl animate-pulse" />
          ))
        ) : (
          questions.map((q) => (
            <motion.div 
              layout
              key={q.id} 
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold uppercase tracking-wider border border-blue-100 italic">
                      <Tag size={12} /> {q.domain}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-wider border border-slate-100">
                      <Database size={12} /> {q.skill}
                    </span>
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                      q.difficulty === 'hard' ? 'bg-red-50 text-red-600' : q.difficulty === 'easy' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {q.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-slate-900 font-medium leading-relaxed">
                    {q.question}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                    {Object.entries(q.options).map(([key, val]) => (
                      <div key={key} className={`p-2 rounded-lg text-sm flex items-center gap-2 ${key === q.correct ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-slate-50 text-slate-500'}`}>
                        <span className="font-bold uppercase w-5 h-5 rounded flex items-center justify-center bg-white/50 text-[10px]">
                          {key}
                        </span>
                        <span className="truncate">{val as string}</span>
                        {key === q.correct && <CheckCircle2 size={14} className="ml-auto" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => handleDelete(q.id)}
                    className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                    title="Delete Question"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}

        {!loading && questions.length === 0 && (
          <div className="py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-slate-100 text-slate-300">
              <HelpCircle size={32} />
            </div>
            <h3 className="text-slate-900 font-bold text-lg">Empty Question Pool</h3>
            <p className="text-slate-500 max-w-xs mx-auto mt-1">
              No questions match your current criteria. Start by adding a single question or performing a bulk import.
            </p>
          </div>
        )}

        {/* Pagination UI */}
        {totalCount > pageSize && (
          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
            <p className="text-xs font-bold text-slate-400 tracking-widest uppercase">
              Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, totalCount)} of {totalCount} items
            </p>
            
            <div className="flex items-center gap-1">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              
              <div className="flex items-center px-4">
                <span className="text-sm font-black text-slate-900">{page}</span>
                <span className="mx-2 text-slate-300 text-xs">/</span>
                <span className="text-xs font-bold text-slate-400">{Math.ceil(totalCount / pageSize)}</span>
              </div>

              <button
                disabled={page === Math.ceil(totalCount / pageSize)}
                onClick={() => setPage(page + 1)}
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      <BulkUploadModal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={loadQuestions}
      />

      <AddSingleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={loadQuestions}
      />
    </div>
  )
}

function CheckCircle2({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  )
}

