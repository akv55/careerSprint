'use client'

import { useState } from 'react'
import { Plus, Trash2, Pencil, Check, X } from 'lucide-react'
import type { EducationEntry, ExperienceEntry, ProjectEntry } from '@/utils/skillsDB'

// ─── Education Editor ─────────────────────────────────────────────────────────

function EduForm({ value, onSave, onCancel }: { value: EducationEntry; onSave: (v: EducationEntry) => void; onCancel: () => void }) {
  const [form, setForm] = useState<EducationEntry>({ ...value })
  const update = (k: keyof EducationEntry, v: string) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 space-y-2 text-sm">
      <input className="w-full border border-blue-200 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400/30" placeholder="Degree / Qualification *" value={form.degree} onChange={e => update('degree', e.target.value)} />
      <input className="w-full border border-blue-200 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400/30" placeholder="Institution / University" value={form.institution} onChange={e => update('institution', e.target.value)} />
      <div className="grid grid-cols-2 gap-2">
        <input className="border border-blue-200 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400/30" placeholder="Year (e.g. 2024)" value={form.year || ''} onChange={e => update('year', e.target.value)} />
        <input className="border border-blue-200 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400/30" placeholder="Grade / CGPA (e.g. 8.5/10)" value={form.grade || ''} onChange={e => update('grade', e.target.value)} />
      </div>
      <div className="flex gap-2 pt-1">
        <button onClick={() => { if (form.degree.trim()) onSave(form) }} className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"><Check size={12} /> Save</button>
        <button onClick={onCancel} className="flex items-center gap-1 px-3 py-1.5 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"><X size={12} /> Cancel</button>
      </div>
    </div>
  )
}

export function EducationEditor({ items, onChange }: { items: EducationEntry[]; onChange: (v: EducationEntry[]) => void }) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [adding, setAdding] = useState(false)
  const blank: EducationEntry = { degree: '', institution: '', year: '', grade: '' }

  const save = (index: number, val: EducationEntry) => {
    const next = [...items]
    next[index] = val
    onChange(next)
    setEditingIndex(null)
  }
  const add = (val: EducationEntry) => {
    onChange([...items, val])
    setAdding(false)
  }
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i))

  return (
    <div className="space-y-2">
      {items.map((edu, i) =>
        editingIndex === i ? (
          <EduForm key={i} value={edu} onSave={v => save(i, v)} onCancel={() => setEditingIndex(null)} />
        ) : (
          <div key={i} className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-sm group relative">
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => setEditingIndex(i)} className="p-1 bg-white rounded-lg border border-blue-200 text-blue-500 hover:bg-blue-100 transition-colors" title="Edit"><Pencil size={12} /></button>
              <button onClick={() => remove(i)} className="p-1 bg-white rounded-lg border border-red-200 text-red-500 hover:bg-red-100 transition-colors" title="Remove"><Trash2 size={12} /></button>
            </div>
            {edu.degree && <p className="font-bold text-blue-900 leading-tight pr-12">{edu.degree}</p>}
            {edu.institution && <p className="text-blue-700 mt-0.5 text-xs">{edu.institution}</p>}
            <div className="flex flex-wrap gap-2 mt-1 text-xs text-blue-600">
              {edu.year && <span>📅 {edu.year}</span>}
              {edu.grade && <span>🏅 {edu.grade}</span>}
            </div>
          </div>
        )
      )}
      {adding ? (
        <EduForm value={blank} onSave={add} onCancel={() => setAdding(false)} />
      ) : (
        <button onClick={() => setAdding(true)} className="w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-blue-300 text-blue-500 text-xs font-semibold rounded-xl hover:bg-blue-50 transition-colors">
          <Plus size={13} /> Add Education
        </button>
      )}
    </div>
  )
}


// ─── Experience Editor ────────────────────────────────────────────────────────

function ExpForm({ value, onSave, onCancel }: { value: ExperienceEntry; onSave: (v: ExperienceEntry) => void; onCancel: () => void }) {
  const [form, setForm] = useState<ExperienceEntry>({ ...value, description: [...value.description] })
  const [bulletInput, setBulletInput] = useState('')
  const update = (k: keyof ExperienceEntry, v: any) => setForm(p => ({ ...p, [k]: v }))

  const addBullet = () => {
    const t = bulletInput.trim()
    if (t) { setForm(p => ({ ...p, description: [...p.description, t] })); setBulletInput('') }
  }
  const removeBullet = (i: number) => setForm(p => ({ ...p, description: p.description.filter((_, idx) => idx !== i) }))

  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-3 space-y-2 text-sm">
      <input className="w-full border border-green-200 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400/30" placeholder="Job Title / Role *" value={form.role} onChange={e => update('role', e.target.value)} />
      <input className="w-full border border-green-200 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400/30" placeholder="Company / Organisation" value={form.company} onChange={e => update('company', e.target.value)} />
      <input className="w-full border border-green-200 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400/30" placeholder="Duration (e.g. Jan 2023 – Present)" value={form.duration || ''} onChange={e => update('duration', e.target.value)} />
      <div>
        <p className="text-xs font-semibold text-green-700 mb-1">Responsibilities / Bullets</p>
        {form.description.map((d, i) => (
          <div key={i} className="flex items-start gap-1.5 mb-1">
            <span className="text-green-500 mt-1">•</span>
            <span className="flex-1 text-xs text-green-900">{d}</span>
            <button onClick={() => removeBullet(i)} className="text-red-400 hover:text-red-600 mt-0.5"><Trash2 size={11} /></button>
          </div>
        ))}
        <div className="flex gap-1.5 mt-1">
          <input className="flex-1 border border-green-200 rounded-lg px-2 py-1 text-xs bg-white focus:outline-none" placeholder="Add a bullet point..." value={bulletInput} onChange={e => setBulletInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addBullet()} />
          <button onClick={addBullet} className="px-2 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700"><Plus size={12} /></button>
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <button onClick={() => { if (form.role.trim()) onSave(form) }} className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 transition-colors"><Check size={12} /> Save</button>
        <button onClick={onCancel} className="flex items-center gap-1 px-3 py-1.5 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"><X size={12} /> Cancel</button>
      </div>
    </div>
  )
}

export function ExperienceEditor({ items, onChange }: { items: ExperienceEntry[]; onChange: (v: ExperienceEntry[]) => void }) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [adding, setAdding] = useState(false)
  const blank: ExperienceEntry = { role: '', company: '', duration: '', description: [] }

  const save = (index: number, val: ExperienceEntry) => { const next = [...items]; next[index] = val; onChange(next); setEditingIndex(null) }
  const add = (val: ExperienceEntry) => { onChange([...items, val]); setAdding(false) }
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i))

  return (
    <div className="space-y-2">
      {items.map((exp, i) =>
        editingIndex === i ? (
          <ExpForm key={i} value={exp} onSave={v => save(i, v)} onCancel={() => setEditingIndex(null)} />
        ) : (
          <div key={i} className="bg-green-50 border border-green-100 rounded-xl p-3 text-sm group relative">
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => setEditingIndex(i)} className="p-1 bg-white rounded-lg border border-green-200 text-green-500 hover:bg-green-100 transition-colors" title="Edit"><Pencil size={12} /></button>
              <button onClick={() => remove(i)} className="p-1 bg-white rounded-lg border border-red-200 text-red-500 hover:bg-red-100 transition-colors" title="Remove"><Trash2 size={12} /></button>
            </div>
            {exp.role && <p className="font-bold text-green-900 leading-tight pr-12">{exp.role}</p>}
            {exp.company && <p className="text-green-700 font-medium text-xs mt-0.5">{exp.company}</p>}
            {exp.duration && <p className="text-green-600 text-xs mt-1">📅 {exp.duration}</p>}
            {exp.description.length > 0 && (
              <ul className="mt-2 space-y-1 list-disc list-inside text-green-800 text-xs">
                {exp.description.map((d, j) => <li key={j}>{d}</li>)}
              </ul>
            )}
          </div>
        )
      )}
      {adding ? (
        <ExpForm value={blank} onSave={add} onCancel={() => setAdding(false)} />
      ) : (
        <button onClick={() => setAdding(true)} className="w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-green-300 text-green-500 text-xs font-semibold rounded-xl hover:bg-green-50 transition-colors">
          <Plus size={13} /> Add Experience
        </button>
      )}
    </div>
  )
}


// ─── Project Editor ───────────────────────────────────────────────────────────

function ProjForm({ value, onSave, onCancel }: { value: ProjectEntry; onSave: (v: ProjectEntry) => void; onCancel: () => void }) {
  const [form, setForm] = useState<ProjectEntry>({ ...value, description: [...value.description], techStack: [...value.techStack] })
  const [bulletInput, setBulletInput] = useState('')
  const [techInput, setTechInput] = useState('')
  const update = (k: keyof ProjectEntry, v: any) => setForm(p => ({ ...p, [k]: v }))

  const addBullet = () => { const t = bulletInput.trim(); if (t) { setForm(p => ({ ...p, description: [...p.description, t] })); setBulletInput('') } }
  const removeBullet = (i: number) => setForm(p => ({ ...p, description: p.description.filter((_, idx) => idx !== i) }))
  const addTech = () => { const t = techInput.trim(); if (t) { setForm(p => ({ ...p, techStack: [...p.techStack, t] })); setTechInput('') } }
  const removeTech = (i: number) => setForm(p => ({ ...p, techStack: p.techStack.filter((_, idx) => idx !== i) }))

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 space-y-2 text-sm">
      <input className="w-full border border-purple-200 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-400/30" placeholder="Project Name *" value={form.name} onChange={e => update('name', e.target.value)} />
      <div>
        <p className="text-xs font-semibold text-purple-700 mb-1">Tech Stack</p>
        <div className="flex flex-wrap gap-1 mb-1.5">
          {form.techStack.map((t, i) => (
            <span key={i} className="flex items-center gap-1 px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">
              {t} <button onClick={() => removeTech(i)} className="text-purple-400 hover:text-red-500"><X size={10} /></button>
            </span>
          ))}
        </div>
        <div className="flex gap-1.5">
          <input className="flex-1 border border-purple-200 rounded-lg px-2 py-1 text-xs bg-white focus:outline-none" placeholder="Add tech (e.g. React)..." value={techInput} onChange={e => setTechInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTech()} />
          <button onClick={addTech} className="px-2 py-1 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700"><Plus size={12} /></button>
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-purple-700 mb-1">Description Bullets</p>
        {form.description.map((d, i) => (
          <div key={i} className="flex items-start gap-1.5 mb-1">
            <span className="text-purple-400 mt-1">•</span>
            <span className="flex-1 text-xs text-purple-900">{d}</span>
            <button onClick={() => removeBullet(i)} className="text-red-400 hover:text-red-600 mt-0.5"><Trash2 size={11} /></button>
          </div>
        ))}
        <div className="flex gap-1.5 mt-1">
          <input className="flex-1 border border-purple-200 rounded-lg px-2 py-1 text-xs bg-white focus:outline-none" placeholder="Add a bullet point..." value={bulletInput} onChange={e => setBulletInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addBullet()} />
          <button onClick={addBullet} className="px-2 py-1 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700"><Plus size={12} /></button>
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <button onClick={() => { if (form.name.trim()) onSave(form) }} className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white text-xs font-bold rounded-lg hover:bg-purple-700 transition-colors"><Check size={12} /> Save</button>
        <button onClick={onCancel} className="flex items-center gap-1 px-3 py-1.5 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"><X size={12} /> Cancel</button>
      </div>
    </div>
  )
}

export function ProjectEditor({ items, onChange }: { items: ProjectEntry[]; onChange: (v: ProjectEntry[]) => void }) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [adding, setAdding] = useState(false)
  const blank: ProjectEntry = { name: '', techStack: [], description: [] }

  const save = (index: number, val: ProjectEntry) => { const next = [...items]; next[index] = val; onChange(next); setEditingIndex(null) }
  const add = (val: ProjectEntry) => { onChange([...items, val]); setAdding(false) }
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i))

  return (
    <div className="space-y-2">
      {items.map((proj, i) =>
        editingIndex === i ? (
          <ProjForm key={i} value={proj} onSave={v => save(i, v)} onCancel={() => setEditingIndex(null)} />
        ) : (
          <div key={i} className="bg-purple-50 border border-purple-100 rounded-xl p-3 text-sm group relative">
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => setEditingIndex(i)} className="p-1 bg-white rounded-lg border border-purple-200 text-purple-500 hover:bg-purple-100 transition-colors" title="Edit"><Pencil size={12} /></button>
              <button onClick={() => remove(i)} className="p-1 bg-white rounded-lg border border-red-200 text-red-500 hover:bg-red-100 transition-colors" title="Remove"><Trash2 size={12} /></button>
            </div>
            {proj.name && <p className="font-bold text-purple-900 leading-tight pr-12">{proj.name}</p>}
            {proj.techStack.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {proj.techStack.map((t, k) => <span key={k} className="px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">{t}</span>)}
              </div>
            )}
            {proj.description.length > 0 && (
              <ul className="mt-2 space-y-1 list-disc list-inside text-purple-800 text-xs">
                {proj.description.map((d, j) => <li key={j}>{d}</li>)}
              </ul>
            )}
          </div>
        )
      )}
      {adding ? (
        <ProjForm value={blank} onSave={add} onCancel={() => setAdding(false)} />
      ) : (
        <button onClick={() => setAdding(true)} className="w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-purple-300 text-purple-500 text-xs font-semibold rounded-xl hover:bg-purple-50 transition-colors">
          <Plus size={13} /> Add Project
        </button>
      )}
    </div>
  )
}
