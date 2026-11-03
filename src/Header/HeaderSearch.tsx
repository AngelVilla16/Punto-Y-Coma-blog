'use client'

import { Search } from 'lucide-react'
import React, { useEffect, useRef } from 'react'

export const HeaderSearch: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <form
      action="/search"
      className="hidden h-[42px] w-[226px] items-center gap-[10px] rounded-[8px] border border-line bg-white px-[13px] focus-within:border-brand/60 focus-within:ring-2 focus-within:ring-brand/10 md:flex"
      role="search"
    >
      <Search aria-hidden className="size-[17px] shrink-0 text-subtle" strokeWidth={1.6} />
      <label className="sr-only" htmlFor="header-search">
        Buscar tutoriales
      </label>
      <input
        className="min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-subtle"
        id="header-search"
        name="q"
        placeholder="Buscar tutoriales"
        ref={inputRef}
        type="search"
      />
      <kbd className="shrink-0 font-mono text-[11px] text-subtle">⌘ K</kbd>
    </form>
  )
}
