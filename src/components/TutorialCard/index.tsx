import { ArrowUpRight, ChartNoAxesColumnIncreasing } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { cn } from '@/utilities/ui'
import {
  formatShortDate,
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
  variant?: 'default' | 'compact'
}

export const TutorialCard: React.FC<Props> = ({ className, doc, variant = 'default' }) => {
  const compact = variant === 'compact'
  const slug = getTutorialSlug(doc)
  const description = getDescription(doc)
  const level = getTutorialLevel(doc)
  const minutes = getReadingMinutes(doc)

  return (
    <Link
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_18px_40px_-24px_rgba(52,35,70,0.35)]',
        className,
      )}
      href={slug ? `/posts/${slug}` : '/posts'}
    >
      <CodeIllustration snippet={getSnippet(doc)} variant={compact ? 'compact' : 'default'} />

      <div
        className={cn(
          'flex flex-1 flex-col gap-[14px]',
          compact ? 'p-5' : 'p-6',
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex shrink-0 items-center rounded-[5px] bg-brand-soft px-[9px] py-[5px] font-mono text-[11px] font-medium leading-none text-brand">
            {getCategoryTitle(doc)}
          </span>
          {doc.publishedAt && (
            <time
              className="shrink-0 font-mono text-[10px] text-subtle"
              dateTime={doc.publishedAt}
            >
              {formatShortDate(doc.publishedAt)}
            </time>
          )}
        </div>

        <h3
          className={cn(
            'line-clamp-2 min-h-[58px] font-normal leading-[1.27] tracking-[-0.55px] text-ink',
            compact ? 'text-[22px]' : 'text-[23px]',
          )}
        >
          {doc.title}
        </h3>

        <p className="line-clamp-2 min-h-[44px] text-[14px] leading-[1.55] text-subtle">
          {description || 'Código real, pasos claros y ningún atajo.'}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-[5px]">
          <div className="flex items-center gap-2 text-[11px] text-subtle">
            <ChartNoAxesColumnIncreasing aria-hidden className="size-3.5" strokeWidth={1.7} />
            <span>{level}</span>
            <span aria-hidden className="text-[10px]">
              ·
            </span>
            <span>{minutes} min</span>
          </div>
          <ArrowUpRight
            aria-hidden
            className="size-[18px] text-subtle transition-colors group-hover:text-brand"
            strokeWidth={1.6}
          />
        </div>
      </div>
    </Link>
  )
}
