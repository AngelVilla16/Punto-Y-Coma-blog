import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Pagination } from '@/components/Pagination'
import { SearchForm } from '@/components/Search/SearchForm'
import { TutorialCard } from '@/components/TutorialCard'
import type { TutorialCardDoc } from '@/utilities/tutorials'

type Props = {
  buildHref: (page: number) => string
  description?: string
  page: number
  perPage: number
  posts: TutorialCardDoc[]
  title?: string
  totalDocs: number
  totalPages: number
}

export const TutorialArchive: React.FC<Props> = ({
  buildHref,
  description = 'Tutoriales de programación en español, explicados con calma y con código que puedes ejecutar hoy mismo.',
  page,
  perPage,
  posts,
  title = 'Todos los tutoriales',
  totalDocs,
  totalPages,
}) => {
  const rangeStart = totalDocs === 0 ? 0 : (page - 1) * perPage + 1
  const rangeEnd = Math.min(totalDocs, page * perPage)

  return (
    <main className="bg-canvas">
      <div className="shell flex flex-col gap-9 pb-16 pt-8">
        <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-[10px] text-[12px]">
          <Link className="text-subtle transition-colors hover:text-ink" href="/">
            Inicio
          </Link>
          <span aria-hidden className="text-subtle">
            /
          </span>
          <span className="text-brand">Tutoriales</span>
        </nav>

        <div className="flex flex-col gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[1.3px] text-brand">
            Todo el archivo
          </p>
          <h1 className="text-[36px] font-normal leading-[1.12] tracking-[-1.5px] text-ink sm:text-[48px] sm:tracking-[-2px]">
            {title}
          </h1>
          <p className="max-w-2xl text-[15px] leading-[1.6] text-subtle">{description}</p>
        </div>

        <SearchForm className="max-w-3xl" variant="prominent" />

        <div className="flex flex-wrap items-end justify-between gap-4 border-t border-line pt-6">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-[24px] tracking-[-0.65px] text-ink">
              {totalDocs} tutorial{totalDocs === 1 ? '' : 'es'} en total
            </h2>
            <p className="font-mono text-[10px] text-subtle">
              {totalDocs === 0 ? 'Sin resultados' : `Mostrando ${rangeStart}–${rangeEnd} de ${totalDocs}`}
            </p>
          </div>
          <Link
            className="group inline-flex items-center gap-2 text-[13px] font-semibold text-brand transition-opacity hover:opacity-70"
            href="/search"
          >
            Buscar con filtros
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform group-hover:translate-x-0.5"
              strokeWidth={1.7}
            />
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((doc, index) => (
              <TutorialCard doc={doc} key={`${doc.slug}-${index}`} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[220px] flex-col items-start justify-center gap-3 rounded-2xl border border-line bg-white p-8">
            <p className="font-mono text-[11px] uppercase tracking-[1.3px] text-brand">
              El editor está calentando
            </p>
            <h2 className="text-[26px] tracking-[-0.7px] text-ink">
              Todavía no hay tutoriales publicados.
            </h2>
            <p className="text-[14px] text-subtle">Vuelve pronto: estamos preparando el primero.</p>
          </div>
        )}

        {totalPages > 1 && (
          <Pagination buildHref={buildHref} page={page} totalPages={totalPages} />
        )}
      </div>
    </main>
  )
}
