import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { cn } from '@/utilities/ui'
import {
  formatFeaturedDate,
  getCategoryTitle,
  getDescription,
  getReadingMinutes,
  getSnippet,
  getTutorialLevel,
  getTutorialSlug,
  type TutorialCardDoc,
} from '@/utilities/tutorials'

import { CodeIllustration } from './CodeIllustration'

type Props = {
  className?: string
  doc: TutorialCardDoc
}

export const FeaturedTutorialCard: React.FC<Props> = ({ className, doc }) => {
  const slug = getTutorialSlug(doc)
  const published = formatFeaturedDate(doc.publishedAt)
  const level = getTutorialLevel(doc)
  const minutes = getReadingMinutes(doc)

  return (
    <Link
      className={cn(
        'group grid overflow-hidden rounded-2xl border border-line bg-white transition-all duration-200 hover:border-brand/30 hover:shadow-[0_24px_60px_-32px_rgba(52,35,70,0.4)] lg:grid-cols-[minmax(0,1fr)_600px]',
        className,
      )}
      href={slug ? `/posts/${slug}` : '/posts'}
    >
      <div className="order-2 flex min-h-[340px] flex-col justify-between gap-10 p-6 sm:p-8 lg:order-1 lg:min-h-[366px] lg:p-9">
        <div className="flex items-center gap-2">
          <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-brand" />
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.7px] text-brand">
            Última publicación{published ? ` · ${published}` : ''}
          </p>
        </div>

        <div className="flex flex-col gap-3.5">
          <h2 className="text-[28px] font-normal leading-[1.16] tracking-[-1.1px] text-ink sm:text-[35px]">
            {doc.title}
          </h2>
          <p className="text-[15px] leading-[1.6] text-subtle">
            {getDescription(doc) || 'Código real, pasos claros y ningún atajo.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-[5px] bg-brand-soft px-[9px] py-[5px] font-mono text-[11px] font-medium leading-none text-brand">
              {getCategoryTitle(doc)}
            </span>
            <p className="text-[12px] text-subtle">
              {level} · {minutes} min de lectura
            </p>
          </div>

          <div className="flex items-center gap-2 text-[13px] font-semibold text-brand">
            Leer tutorial
            <ArrowRight
              aria-hidden
              className="size-[17px] transition-transform group-hover:translate-x-0.5"
              strokeWidth={1.7}
            />
          </div>
        </div>
      </div>

      <CodeIllustration
        className="order-1 min-h-[280px] lg:order-2 lg:min-h-[366px]"
        snippet={getSnippet(doc)}
        variant="featured"
      />
    </Link>
  )
}
