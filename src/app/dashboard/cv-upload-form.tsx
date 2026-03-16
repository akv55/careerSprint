'use client'

import { useState, useRef } from 'react'
import { Loader2, UploadCloud, FileText, CheckCircle2, AlertCircle } from 'lucide-react'

interface CvUploadFormProps {
  onSuccess?: (data: any) => void
}

export default function CvUploadForm({ onSuccess }: CvUploadFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File | null) => {
    if (!file) return
    if (file.type !== 'application/pdf') { setError('Only PDF files are accepted.'); return }
    if (file.size > 10 * 1024 * 1024) { setError('File must be under 10MB.'); return }
    setError(null)
    setFileName(file.name)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false)
    handleFile(e.dataTransfer.files[0] ?? null)
    if (inputRef.current && e.dataTransfer.files[0]) {
      const dt = new DataTransfer()
      dt.items.add(e.dataTransfer.files[0])
      inputRef.current.files = dt.files
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputRef.current?.files?.[0]) { setError('Please select a file to upload'); return }
    setLoading(true); setError(null)
    const formData = new FormData()
    formData.append('file', inputRef.current.files[0])
    try {
      const res = await fetch('/api/cv/upload', { method: 'POST', body: formData })
      
      const contentType = res.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json()
        if (!res.ok) {
          const detailMsg = data.details ? `: ${data.details}` : ''
          throw new Error(`${data.error || 'Failed to analyze CV'}${detailMsg}`)
        }
        onSuccess?.(data)
      } else {
        // If it's not JSON, it's likely an HTML error page from Vercel/Next.js
        throw new Error(`Server error (${res.status}): The server returned an invalid response format. Please check the deployment logs.`)
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Drop zone */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
          dragging ? 'border-primary bg-primary/5' : fileName ? 'border-green-400 bg-green-50' : 'border-gray-200 bg-gray-50 hover:border-primary/50 hover:bg-primary/5'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input ref={inputRef} type="file" name="file" accept="application/pdf" className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)} disabled={loading} />

        {fileName ? (
          <>
            <CheckCircle2 className="w-10 h-10 text-green-500" />
            <p className="text-sm font-bold text-green-700 text-center">{fileName}</p>
            <p className="text-xs text-gray-500">Click to change file</p>
          </>
        ) : (
          <>
            <UploadCloud className={`w-10 h-10 transition-colors ${dragging ? 'text-primary' : 'text-gray-400'}`} />
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700">Drop your PDF here, or <span className="text-primary">browse</span></p>
              <p className="text-xs text-gray-400 mt-1">PDF only · Max 10MB</p>
            </div>
          </>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-200">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <button type="submit" disabled={loading || !fileName}
        className="w-full flex justify-center items-center gap-2 rounded-xl bg-accent px-4 py-3.5 text-sm font-bold text-white shadow-sm hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? <><Loader2 className="animate-spin h-4 w-4" /> Analysing CV...</> : <><FileText className="h-4 w-4" /> Extract Skills from CV</>}
      </button>
    </form>
  )
}
