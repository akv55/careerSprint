'use client'

import React, { useState } from 'react'
import { Upload, X, CheckCircle2, AlertCircle, FileJson, Type } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { bulkUploadQuestions } from '../actions'

export default function BulkUploadModal({
  isOpen,
  onClose,
  onSuccess
}: {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}) {
  const [activeTab, setActiveTab] = useState<'file' | 'paste'>('file')
  const [file, setFile] = useState<File | null>(null)
  const [jsonText, setJsonText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<number | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected && selected.type === 'application/json') {
      setFile(selected)
      setError(null)
    } else {
      setError('Please select a valid JSON file')
    }
  }

  const handleUpload = async () => {
    setLoading(true)
    setError(null)

    try {
      let json = null
      
      if (activeTab === 'file') {
        if (!file) throw new Error('No file selected')
        const text = await file.text()
        json = JSON.parse(text)
      } else {
        if (!jsonText.trim()) throw new Error('JSON content cannot be empty')
        json = JSON.parse(jsonText)
      }

      if (!Array.isArray(json)) {
        throw new Error('JSON must be an array of questions')
      }

      const { count } = await bulkUploadQuestions(json)
      setResult(count)
      onSuccess()
    } catch (err: any) {
      setError(err.message || 'Failed to upload questions (Invalid JSON?)')
    } finally {
      setLoading(false)
    }
  }

  const resetState = () => {
    setFile(null)
    setJsonText('')
    setError(null)
    setResult(null)
    setActiveTab('file')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={resetState}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
          <h3 className="text-xl font-bold text-slate-900">Bulk Ingest Questions</h3>
          <button onClick={resetState} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <div className="p-8 space-y-6 overflow-y-auto">
          {!result ? (
            <>
              {/* Tabs */}
              <div className="flex bg-slate-100 p-1 rounded-xl">
                 <button 
                  onClick={() => setActiveTab('file')}
                  className={`flex-1 py-2 font-semibold text-sm rounded-lg flex items-center justify-center gap-2 transition-all ${activeTab === 'file' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                 >
                   <FileJson size={16} /> Upload File
                 </button>
                 <button 
                  onClick={() => setActiveTab('paste')}
                  className={`flex-1 py-2 font-semibold text-sm rounded-lg flex items-center justify-center gap-2 transition-all ${activeTab === 'paste' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                 >
                   <Type size={16} /> Paste JSON
                 </button>
              </div>

              {activeTab === 'file' ? (
                <div
                  className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all ${
                    file ? 'border-blue-500 bg-blue-50/30' : 'border-slate-200 hover:border-blue-400 bg-slate-50/50'
                  }`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault()
                    const dropped = e.dataTransfer.files[0]
                    if (dropped?.type === 'application/json') setFile(dropped)
                  }}
                >
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-slate-100">
                    <FileJson size={32} className={file ? 'text-blue-600' : 'text-slate-400'} />
                  </div>
                  {file ? (
                    <div>
                      <p className="font-bold text-slate-900">{file.name}</p>
                      <p className="text-sm text-slate-500 mt-1">{(file.size / 1024).toFixed(2)} KB  Ready to upload</p>
                    </div>
                  ) : (
                    <div>
                      <label className="cursor-pointer">
                        <span className="text-blue-600 font-bold hover:underline">Click to upload</span> or drag and drop
                        <input type="file" className="hidden" accept=".json" onChange={handleFileChange} />
                      </label>
                      <p className="text-xs text-slate-400 mt-2">Maximum file size: 5MB (JSON format only)</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                   <p className="text-sm font-bold text-slate-700">Paste your raw JSON array here:</p>
                   <textarea
                     value={jsonText}
                     onChange={(e) => setJsonText(e.target.value)}
                     className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-mono text-slate-700 resize-none transition-all"
                     placeholder="[
  {
    &quot;domain&quot;: &quot;...&quot;,
    &quot;skill&quot;: &quot;...&quot;,
    ...
  }
]"
                   />
                </div>
              )}

              {error && (
                <div className="flex items-start gap-3 p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              <div className="p-4 bg-slate-50 rounded-xl">
                 <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Expected JSON Schema</h4>
                 <pre className="text-[10px] text-slate-400 font-mono whitespace-pre-wrap">
                  {`[`}
                  {`  {`}
                  {`    "domain": "React",`}
                  {`    "skill": "Hooks",`}
                  {`    "question": "What is...",`}
                  {`    "options": { "a": "...", "b": "...", ... },`}
                  {`    "correct": "a",`}
                  {`    "difficulty": "medium",`}
                  {`    "explanation": "..."`}
                  {`  }, ...`}
                  {`]`}
                 </pre>
              </div>

              <button
                onClick={handleUpload}
                disabled={(activeTab === 'file' ? !file : !jsonText.trim()) || loading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Upload size={20} />
                )}
                {loading ? 'Processing...' : 'Start Bulk Import'}
              </button>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Upload Complete!</h3>
              <p className="text-slate-500 mt-2">
                Successfully ingested <span className="font-bold text-slate-900">{result}</span> new questions into the platform database.
              </p>
              <button
                onClick={resetState}
                className="mt-8 px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all"
              >
                Close Modal
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
