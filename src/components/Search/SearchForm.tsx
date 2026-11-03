'use client'

import { ArrowRight, Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { cn } from '@/utilities/ui'

type Props = {
  className?: string
  defaultValue?: string
  variant?: 'prominent' | 'inline'
}

export const SearchForm: React.FC<Props> = ({
  className,
  defaultValue = '',
  variant = 'prominent',
}) => {
  const router = useRouter()
  const [value, setValue] = useState(defaultValue)
  const prominent = variant === 'prominent'

  return (
    <form
      action="/search"
      className={cn(
        'flex w-full items-center bg-white',
        prominent
          ? 'h-[68px] gap-4 rounded-xl border-[1.5px] border-brand pl-[22px] pr-2 focus-within:ring-4 focus-within:ring-brand/10'
          : 'h-16 gap-3 rounded-[10px] border border-line pl-5 pr-2 focus-within:border-brand/50 focus-within:ring-4 focus-within:ring-brand/10',
        className,
      )}
      role="search"
    >
      <Search
        aria-hidden
        className={cn('shrink-0 text-subtle', prominent ? 'size-[22px]' : 'size-5')}
        strokeWidth={1.6}
      />
      <label className="sr-only" htmlFor={prominent ? 'page-search' : 'explore-search'}>
        Buscar tutoriales
      </label>
      <input
        className={cn(
          'min-w-0 flex-1 bg-transparent outline-none placeholder:text-subtle',
          prominent
            ? 'text-[17px] font-medium text-ink'
            : 'text-[14px] text-ink',
        )}
        id={prominent ? 'page-search' : 'explore-search'}
        name="q"
        onChange={(event) => setValue(event.target.value)}
        placeholder={prominent ? 'Busca un tema, una tecnología o una duda' : 'Prueba con “React” o “API”'}
        type="search"
        value={value}
      />

      {prominent && value && (
        <button
          aria-label="Limpiar búsqueda"
          className="flex size-8 shrink-0 items-center justify-center rounded-full text-subtle transition-colors hover:bg-brand-soft hover:text-brand"
          onClick={() => {
            setValue('')
            router.push('/search')
          }}
          type="button"
        >
          <X aria-hidden className="size-[18px]" strokeWidth={1.7} />
        </button>
      )}

      {prominent && <span aria-hidden className="h-6 w-px shrink-0 bg-line" />}

      <button
        className={cn(
          'inline-flex shrink-0 items-center justify-center gap-3 rounded-[8px] bg-brand font-semibold text-white transition-colors hover:bg-[#5f37c4]',
          prominent ? 'h-12 px-5 text-[14px]' : 'h-12 px-5 text-[14px]',
        )}
        type="submit"
      >
        {prominent ? 'Buscar tutoriales' : 'Buscar'}
        {prominent && <ArrowRight aria-hidden className="size-[18px]" strokeWidth={1.8} />}
      </button>
    </form>
  )
}
