'use client'

import { useState, useRef, useEffect } from 'react'
import CvUploadForm from './cv-upload-form'
import { extractDomainAndSkills, SKILLS_DB, ALL_KNOWN_SKILLS } from '@/utils/skillsDB'
import { saveUserDomain } from './actions'
import { Loader2, Plus, X, Search } from 'lucide-react'

// Custom Searchable Dropdown for Brutalist Aesthetic
function SearchableDropdown({ 
  options, value, onChange, placeholder, onSelectOption
}: { 
  options: string[], value: string, onChange: (v: string) => void, placeholder: string, onSelectOption?: (option: string) => void 
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState(value)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSearch(value)
  }, [value])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter(o => o.toLowerCase().includes(search.toLowerCase()) && o !== search)

  return (
    <div className="relative" ref={wrapperRef}>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          onChange(e.target.value)
          setIsOpen(true)
        }}
        onFocus={() => setIsOpen(true)}
        className="block w-full appearance-none rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm font-medium shadow-sm transition-all"
        placeholder={placeholder}
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-20 w-full bg-white border border-gray-200 rounded-xl mt-1 max-h-48 overflow-auto shadow-lg">
          {filteredOptions.map((opt, i) => (
            <li 
              key={i} 
              onClick={() => {
                setSearch(opt)
                onChange(opt)
                setIsOpen(false)
                if (onSelectOption) onSelectOption(opt)
              }}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm font-medium text-gray-800 border-b border-gray-100 last:border-0"
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function SetupWizard() {
  const [step, setStep] = useState<'upload' | 'manual' | 'confirm'>('upload')
  const [domain, setDomain] = useState('')
  const [secondaryDomain, setSecondaryDomain] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  
  // Handlers for confirmation page
  const [newSkill, setNewSkill] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Popup state for importing domains
  const [importPopupDomain, setImportPopupDomain] = useState<string | null>(null)

  const DOMAINS = Object.keys(SKILLS_DB)

  const handleUploadSuccess = (data: any) => {
    const extracted = extractDomainAndSkills(data.text);
    setDomain(extracted.domain);
    if (extracted.secondaryDomain) setSecondaryDomain(extracted.secondaryDomain);
    setSkills(extracted.skills);
    setStep('confirm');
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove))
  }

  const handleAddSkill = (skillToAdd: string) => {
    if (!skillToAdd.trim()) return
    const splitSkills = skillToAdd.split(',').map(s => s.trim().toLowerCase()).filter(s => s.length > 0)
    const updatedSkills = new Set([...skills, ...splitSkills])
    setSkills(Array.from(updatedSkills))
    setNewSkill('')
  }

  const handleDomainSelect = (selectedDomain: string) => {
    setDomain(selectedDomain);
    if (SKILLS_DB[selectedDomain] && SKILLS_DB[selectedDomain].length > 0) {
      setImportPopupDomain(selectedDomain);
    }
  }

  const handleSecondaryDomainSelect = (selectedDomain: string) => {
    setSecondaryDomain(selectedDomain);
    if (SKILLS_DB[selectedDomain] && SKILLS_DB[selectedDomain].length > 0) {
      setImportPopupDomain(selectedDomain);
    }
  }

  const confirmImport = () => {
    if (importPopupDomain && SKILLS_DB[importPopupDomain]) {
      const updatedSkills = new Set([...skills, ...SKILLS_DB[importPopupDomain]]);
      setSkills(Array.from(updatedSkills));
    }
    setImportPopupDomain(null);
  }

  const handleSave = async () => {
    if (!domain.trim() || skills.length === 0) {
      setError("Please provide a primary domain and at least one skill.")
      return
    }

    setSaving(true)
    setError(null)
    
    const result = await saveUserDomain(domain, skills, secondaryDomain || undefined)
    
    if (result.error) {
      setError(result.error)
      setSaving(false)
    }
  }

  if (step === 'upload') {
    return (
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm max-w-2xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-2 tracking-tight text-gray-900 uppercase">Extract Skills from CV</h2>
        <p className="text-gray-600 font-medium mb-6">
          Upload your resume and we will automatically parse your domain and technical skills using fast local tech.
        </p>
        
        <CvUploadForm onSuccess={handleUploadSuccess} />
        
        <div className="mt-8 pt-6 border-t border-dashed border-gray-200 text-center">
          <p className="text-gray-500 font-medium mb-3">Don't have a resume handy?</p>
          <button 
            onClick={() => {
              setDomain('')
              setSecondaryDomain('')
              setSkills([])
              setStep('manual')
            }}
            className="text-sm font-semibold text-primary hover:opacity-80 underline decoration-1 underline-offset-4 transition-all"
          >
            Enter skills manually instead
          </button>
        </div>
      </div>
    )
  }

  if (step === 'manual' || step === 'confirm') {
    return (
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative max-w-2xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-2 tracking-tight text-gray-900 uppercase">
          {step === 'confirm' ? 'Confirm Your Skills' : 'Define Your Skills'}
        </h2>
        <p className="text-gray-600 font-medium mb-6">
          {step === 'confirm' 
            ? "We extracted these from your resume. Review, add, or remove items before proceeding." 
            : "Manually define your technical profile. This will power your generated practice exams."}
        </p>

        {error && (
          <div className="mb-6 bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200 font-medium">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">Primary Domain</label>
              <SearchableDropdown 
                options={DOMAINS} 
                value={domain} 
                onChange={setDomain} 
                onSelectOption={handleDomainSelect}
                placeholder="e.g. Frontend Engineering..." 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Secondary Domain <span className="text-gray-400 text-xs align-top font-medium tracking-normal">(Optional)</span></label>
              <SearchableDropdown 
                options={DOMAINS} 
                value={secondaryDomain} 
                onChange={setSecondaryDomain} 
                onSelectOption={handleSecondaryDomainSelect}
                placeholder="e.g. Backend Engineering..." 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Your Skills</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map(skill => (
                <div key={skill} className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-700 shadow-sm">
                  {skill}
                  <button 
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-1 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {skills.length === 0 && (
                <span className="text-sm text-gray-400 font-medium italic mt-2">No skills added yet.</span>
              )}
            </div>

            <div className="flex gap-2 relative">
              <div className="flex-1">
                <SearchableDropdown 
                  options={ALL_KNOWN_SKILLS} 
                  value={newSkill} 
                  onChange={setNewSkill} 
                  onSelectOption={(val) => handleAddSkill(val)}
                  placeholder="Seach and add skills (or type custom comma-separated)..." 
                />
              </div>
              <button 
                onClick={(e) => { e.preventDefault(); handleAddSkill(newSkill); }}
                className="bg-primary text-white rounded-xl px-4 font-semibold hover:opacity-90 transition-colors shadow-sm"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
          <button 
            onClick={() => setStep('upload')}
            className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
          >
            ← Back to Upload
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex justify-center items-center gap-2 rounded-xl bg-accent px-8 py-3 text-sm font-bold text-white shadow-sm hover:opacity-90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Save & Continue'}
          </button>
        </div>

        {/* DOMAIN IMPORT POPUP */}
        {importPopupDomain && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-30 rounded-2xl flex items-center justify-center p-6 animate-in fade-in duration-200">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xl max-w-sm w-full text-center">
              <h3 className="text-lg font-bold mb-2 uppercase tracking-tight text-gray-900">Import Skills?</h3>
              <p className="text-sm font-medium text-gray-600 mb-6">
                You selected <strong className="text-gray-900">{importPopupDomain}</strong>. Would you like to automatically import all common skills related to this domain?
              </p>
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={() => setImportPopupDomain(null)}
                  className="px-4 py-2 bg-gray-50 text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm"
                >
                  No, Skip
                </button>
                <button 
                  onClick={confirmImport}
                  className="px-4 py-2 bg-accent text-white font-semibold rounded-xl hover:opacity-90 transition-colors shadow-sm"
                >
                  Yes, Import All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return null
}
