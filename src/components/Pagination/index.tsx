import { cn } from '@/utilities/ui'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const Pagination: React.FC<{
  buildHref: (page: number) => string
  className?: string
  page: number
  totalPages: number
}> = (props) => {
  const { buildHref, className } = props
  const totalPages = Math.max(1, props.totalPages)
  const page = Math.min(Math.max(1, props.page), totalPages)

  const hasPrevPage = page > 1
  const hasNextPage = page < totalPages

  const firstPage = Math.max(1, Math.min(page - 2, totalPages - 4))
  const lastPage = Math.min(totalPages, firstPage + 4)
  const pages = Array.from({ length: lastPage - firstPage + 1 }, (_, index) => firstPage + index)

  return (
    <nav
      aria-label="Paginación"
      className={cn(
        'flex flex-col gap-4 pt-3 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <p className="font-mono text-[11px] text-subtle">
        Página {page} de {totalPages}
      </p>

      <div className="flex items-center gap-2">
        {hasPrevPage ? (
          <Link
            aria-label="Página anterior"
            className="flex size-[38px] items-center justify-center rounded-[8px] text-subtle transition-colors hover:bg-brand-soft hover:text-brand"
            href={buildHref(page - 1)}
          >
            <ChevronLeft aria-hidden className="size-4" strokeWidth={1.7} />
          </Link>
        ) : (
          <span
            aria-disabled
            className="flex size-[38px] items-center justify-center rounded-[8px] text-subtle/35"
          >
            <ChevronLeft aria-hidden className="size-4" strokeWidth={1.7} />
          </span>
        )}

        {pages.map((pageNumber) =>
          pageNumber === page ? (
            <span
              aria-current="page"
              className="flex size-[38px] items-center justify-center rounded-[8px] border border-brand bg-brand text-[13px] font-semibold text-white"
              key={pageNumber}
            >
              {pageNumber}
            </span>
          ) : (
            <Link
              className="flex size-[38px] items-center justify-center rounded-[8px] border border-line bg-white text-[13px] font-semibold text-ink transition-colors hover:border-brand/40 hover:text-brand"
              href={buildHref(pageNumber)}
              key={pageNumber}
            >
              {pageNumber}
            </Link>
          ),
        )}

        {hasNextPage ? (
          <Link
            className="flex h-[38px] items-center gap-2 rounded-[8px] px-3 text-[12px] font-medium text-brand transition-colors hover:bg-brand-soft"
            href={buildHref(page + 1)}
          >
            Siguiente
            <ChevronRight aria-hidden className="size-4" strokeWidth={1.7} />
          </Link>
        ) : (
          <span className="flex h-[38px] items-center gap-2 rounded-[8px] px-3 text-[12px] font-medium text-subtle/35">
            Siguiente
            <ChevronRight aria-hidden className="size-4" strokeWidth={1.7} />
          </span>
        )}
      </div>
    </nav>
  )
}
