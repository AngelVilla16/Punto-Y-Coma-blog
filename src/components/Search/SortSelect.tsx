'use client'

import { ChevronDown } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {
  value: string
}

export const SortSelect: React.FC<Props> = ({ value }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (
    <div className="relative flex shrink-0 items-center rounded-[8px] border border-line bg-white">
      <label className="sr-only" htmlFor="sort-results">
        Ordenar resultados
      </label>
      <select
        className="h-[42px] appearance-none bg-transparent pl-3.5 pr-9 text-[12px] text-ink outline-none"
        id="sort-results"
        onChange={(event) => {
          const next = new URLSearchParams(searchParams.toString())
          if (event.target.value === 'recent') next.delete('sort')
          else next.set('sort', event.target.value)
          next.delete('page')
          const query = next.toString()
          router.push(query ? `${pathname}?${query}` : pathname)
        }}
        value={value}
      >
        <option value="recent">Más recientes</option>
        <option value="oldest">Más antiguos</option>
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-3 size-[15px] text-subtle"
        strokeWidth={1.7}
      />
    </div>
  )
}
