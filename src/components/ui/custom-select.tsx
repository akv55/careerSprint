'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Search, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Option {
  label: string
  value: string
  icon?: React.ReactNode
}

interface CustomSelectProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  className?: string
  searchable?: boolean
}

export default function CustomSelect({ 
  options, 
  value, 
  onChange, 
  placeholder = 'Select option...', 
  label,
  className = '',
  searchable = false
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find(opt => opt.value === value)
  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">{label}</label>}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-2.5 bg-white border rounded-xl text-sm transition-all duration-200 ${
          isOpen ? 'border-blue-500 ring-4 ring-blue-500/10 shadow-sm' : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <span className={`block truncate ${!selectedOption ? 'text-slate-400' : 'text-slate-900 font-medium'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          size={18} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-200/50 overflow-hidden"
          >
            {searchable && (
              <div className="p-2 border-b border-slate-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-1 focus:ring-blue-500/20"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            )}

            <div className="max-h-60 overflow-y-auto p-1.5 custom-scrollbar">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(opt.value)
                      setIsOpen(false)
                      setSearch('')
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      value === opt.value 
                        ? 'bg-blue-50 text-blue-700 font-bold' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                       {opt.icon && <span className="opacity-50">{opt.icon}</span>}
                       {opt.label}
                    </span>
                    {value === opt.value && <Check size={14} />}
                  </button>
                ))
              ) : (
                <div className="py-8 text-center text-slate-400 text-xs">No options found</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
