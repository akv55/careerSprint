'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Save, AlertCircle, Plus, Trash2 } from 'lucide-react'
import { addQuestion } from '../actions'
import CustomSelect from '@/components/ui/custom-select'

interface AddSingleModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function AddSingleModal({ isOpen, onClose, onSuccess }: AddSingleModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    domain: '',
    skill: '',
    difficulty: 'medium',
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correct: 'a',
    explanation: ''
  })

  if (!isOpen) return null

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // Validation
    if (!formData.domain || !formData.skill || !formData.question) {
      setError('Domain, Skill, and Question are required.')
      setLoading(false)
      return
    }

    if (!formData.optionA || !formData.optionB) {
      setError('At least Options A and B are required.')
      setLoading(false)
      return
    }

    const options: Record<string, string> = {
      a: formData.optionA,
      b: formData.optionB,
    }
    if (formData.optionC) options.c = formData.optionC
    if (formData.optionD) options.d = formData.optionD

    if (!Object.keys(options).includes(formData.correct)) {
      setError('Correct option selected must have a provided value.')
      setLoading(false)
      return
    }

    try {
      await addQuestion({
        domain: formData.domain,
        skill: formData.skill,
        question: formData.question,
        difficulty: formData.difficulty,
        correct: formData.correct,
        explanation: formData.explanation,
        options
      })
      onSuccess()
      onClose()
      setFormData({
        domain: '',
        skill: '',
        difficulty: 'medium',
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correct: 'a',
        explanation: ''
      })
    } catch (err: any) {
      setError(err.message || 'Failed to add question')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Add Question</h2>
              <p className="text-sm text-slate-500">Create a single question entry manually.</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {error && (
              <div className="mb-6 flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                <AlertCircle size={16} className="shrink-0" />
                {error}
              </div>
            )}

            <form id="add-question-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Domain *</label>
                  <input 
                    type="text" 
                    value={formData.domain}
                    onChange={handleChange('domain')}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm placeholder-slate-400"
                    placeholder="e.g. Frontend Engineering"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Skill *</label>
                  <input 
                    type="text" 
                    value={formData.skill}
                    onChange={handleChange('skill')}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm placeholder-slate-400"
                    placeholder="e.g. React"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Difficulty</label>
                  <select 
                    value={formData.difficulty}
                    onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-700"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Question Text *</label>
                <textarea 
                  value={formData.question}
                  onChange={handleChange('question')}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm resize-none"
                  placeholder="Enter the question here..."
                />
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Options</label>
                
                {['A', 'B', 'C', 'D'].map((letter) => {
                  const key = `option${letter}` as keyof typeof formData
                  const lowerLabel = letter.toLowerCase()
                  return (
                    <div key={letter} className="flex items-center gap-3">
                      <div className="flex items-center gap-2 w-24 shrink-0">
                        <input 
                          type="radio" 
                          id={`correct-${lowerLabel}`}
                          name="correct-option" 
                          value={lowerLabel}
                          checked={formData.correct === lowerLabel}
                          onChange={(e) => setFormData(prev => ({ ...prev, correct: e.target.value }))}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                        />
                        <label htmlFor={`correct-${lowerLabel}`} className="text-sm font-bold text-slate-700">Opt {letter}</label>
                      </div>
                      <input 
                        type="text" 
                        value={formData[key] as string}
                        onChange={handleChange(key)}
                        className={`w-full px-3 py-2 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm ${formData.correct === lowerLabel ? 'border-blue-300 bg-blue-50/50' : 'border-slate-200'}`}
                        placeholder={`Option ${letter} text`}
                      />
                    </div>
                  )
                })}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Explanation (Optional)</label>
                <textarea 
                  value={formData.explanation}
                  onChange={handleChange('explanation')}
                  rows={2}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm resize-none"
                  placeholder="Explain why the correct answer is correct..."
                />
              </div>

            </form>
          </div>

          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50 shrink-0">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-slate-600 font-semibold hover:bg-slate-200 rounded-xl transition-colors text-sm"
            >
              Cancel
            </button>
            <button 
              type="submit"
              form="add-question-form"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {loading ? (
                <>Loading...</>
              ) : (
                <><Save size={16} /> Save Question</>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
