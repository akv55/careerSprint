'use client'

import { useState, useRef, useEffect } from 'react'

interface SearchableDropdownProps {
  options: string[]
  value: string
  onChange: (v: string) => void
  placeholder: string
  onSelectOption?: (option: string) => void
}

export default function SearchableDropdown({
  options, value, onChange, placeholder, onSelectOption
}: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState(value)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setSearch(value) }, [value])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredOptions = options.filter(
    o => o.toLowerCase().includes(search.toLowerCase()) && o !== search
  )

  return (
    <div className="relative" ref={wrapperRef}>
      <input
        type="text"
        value={search}
        onChange={(e) => { setSearch(e.target.value); onChange(e.target.value); setIsOpen(true) }}
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
                setSearch(opt); onChange(opt); setIsOpen(false)
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
