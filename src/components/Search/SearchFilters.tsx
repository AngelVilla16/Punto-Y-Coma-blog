'use client'

import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

import { cn } from '@/utilities/ui'

export type FilterOption = {
  active: boolean
  count?: number
  label: string
  value: string
}

type Props = {
  levels: FilterOption[]
  times: FilterOption[]
  techs: FilterOption[]
}

export const SearchFilters: React.FC<Props> = ({ levels, times, techs }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const replace = (next: URLSearchParams) => {
    const query = next.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  const toggleTech = (value: string) => {
    const next = new URLSearchParams(searchParams.toString())
    const current = next.getAll('tech')
    next.delete('tech')

    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value]

    updated.forEach((item) => next.append('tech', item))
    next.delete('page')
    replace(next)
  }

  const setSingle = (name: 'level' | 'time', value: string) => {
    const next = new URLSearchParams(searchParams.toString())
    const current = next.get(name)

    next.delete(name)
    if (value && current !== value) next.set(name, value)
    next.delete('page')
    replace(next)
  }

  const clearFilters = () => {
    const next = new URLSearchParams(searchParams.toString())
    next.delete('tech')
    next.delete('level')
    next.delete('time')
    next.delete('page')
    replace(next)
  }

  const hasFilters = searchParams.has('tech') || searchParams.has('level') || searchParams.has('time')

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full flex-col gap-[26px] rounded-2xl border border-line bg-white p-[22px]">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[16px] text-ink">Filtrar por</p>
          <button
            className={cn(
              'text-[11px] transition-colors',
              hasFilters ? 'text-brand hover:text-ink' : 'cursor-default text-subtle/50',
            )}
            disabled={!hasFilters}
            onClick={clearFilters}
            type="button"
          >
            Limpiar
          </button>
        </div>

        <fieldset className="flex flex-col gap-4">
          <legend className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.7px] text-subtle">
            Tecnología
          </legend>
          {techs.map((option) => (
            <button
              className="group flex w-full items-center gap-[10px] text-left"
              key={option.value}
              onClick={() => toggleTech(option.value)}
              type="button"
            >
              <span
                className={cn(
                  'flex size-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors',
                  option.active
                    ? 'border-brand bg-brand text-white'
                    : 'border-line-strong bg-white group-hover:border-brand/60',
                )}
              >
                {option.active && <Check aria-hidden className="size-[11px]" strokeWidth={2.5} />}
              </span>
              <span
                className={cn(
                  'min-w-0 flex-1 text-[13px]',
                  option.active ? 'font-semibold text-brand' : 'text-ink',
                )}
              >
                {option.label}
              </span>
              {typeof option.count === 'number' && (
                <span className="shrink-0 font-mono text-[10px] text-subtle">{option.count}</span>
              )}
            </button>
          ))}
        </fieldset>

        <div aria-hidden className="h-px w-full bg-line" />

        <fieldset className="flex flex-col gap-4">
          <legend className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.7px] text-subtle">
            Nivel
          </legend>
          {levels.map((option) => (
            <button
              className="group flex w-full items-center gap-[10px] text-left"
              key={option.value}
              onClick={() => setSingle('level', option.value)}
              type="button"
            >
              <span
                className={cn(
                  'flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors',
                  option.active
                    ? 'border-brand bg-brand'
                    : 'border-line-strong bg-white group-hover:border-brand/60',
                )}
              >
                {option.active && <span className="size-1.5 rounded-full bg-white" />}
              </span>
              <span
                className={cn(
                  'min-w-0 flex-1 text-[13px]',
                  option.active ? 'font-semibold text-brand' : 'text-ink',
                )}
              >
                {option.label}
              </span>
            </button>
          ))}
        </fieldset>

        <div aria-hidden className="h-px w-full bg-line" />

        <fieldset className="flex flex-col gap-4">
          <legend className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.7px] text-subtle">
            Tiempo de lectura
          </legend>
          {times.map((option) => (
            <button
              className="group flex w-full items-center gap-[10px] text-left"
              key={option.value}
              onClick={() => setSingle('time', option.value)}
              type="button"
            >
              <span
                className={cn(
                  'flex size-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors',
                  option.active
                    ? 'border-brand bg-brand text-white'
                    : 'border-line-strong bg-white group-hover:border-brand/60',
                )}
              >
                {option.active && <Check aria-hidden className="size-[11px]" strokeWidth={2.5} />}
              </span>
              <span
                className={cn(
                  'min-w-0 flex-1 text-[13px]',
                  option.active ? 'font-semibold text-brand' : 'text-ink',
                )}
              >
                {option.label}
              </span>
            </button>
          ))}
        </fieldset>
      </div>

      <div className="flex w-full flex-col gap-3.5 rounded-xl bg-brand-tint p-[22px]">
        <p className="font-mono text-[23px] leading-none text-brand">{'{ ... }'}</p>
        <p className="text-[17px] tracking-[-0.4px] text-ink">¿Por dónde empiezo?</p>
        <p className="text-[12px] leading-[1.6] text-subtle">
          Te guiamos del primer concepto a tu primer proyecto.
        </p>
        <Link
          className="inline-flex items-center gap-1 text-[12px] font-semibold text-brand transition-opacity hover:opacity-70"
          href="/#rutas"
        >
          Explorar las rutas
          <ArrowRight aria-hidden className="size-3.5" strokeWidth={1.8} />
        </Link>
      </div>
    </div>
  )
}
