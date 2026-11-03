import Link from 'next/link'
import React from 'react'

import type { Post } from '@/payload-types'

import { formatAuthors } from '@/utilities/formatAuthors'
import {
  formatShortDate,
  getCategoryTitle,
  getDescription,
  getReadingMinutes,
  getTutorialLevel,
} from '@/utilities/tutorials'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''
  const category = getCategoryTitle(post)
  const level = getTutorialLevel(post)
  const minutes = getReadingMinutes(post)
  const description = getDescription(post)

  return (
    <header className="border-b border-line bg-canvas">
      <div className="shell flex flex-col gap-8 pb-12 pt-8">
        <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-[10px] text-[12px]">
          <Link className="text-subtle transition-colors hover:text-ink" href="/">
            Inicio
          </Link>
          <span aria-hidden className="text-subtle">
            /
          </span>
          <Link className="text-subtle transition-colors hover:text-ink" href="/posts">
            Tutoriales
          </Link>
          <span aria-hidden className="text-subtle">
            /
          </span>
          <span className="text-brand">{category}</span>
        </nav>

        <div className="flex max-w-4xl flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-[5px] bg-brand-soft px-[9px] py-[5px] font-mono text-[11px] font-medium leading-none text-brand">
              {category}
            </span>
            <span className="text-[12px] text-subtle">
              {level} · {minutes} min de lectura
            </span>
            {publishedAt && (
              <>
                <span aria-hidden className="text-subtle">
                  ·
                </span>
                <time className="font-mono text-[11px] text-subtle" dateTime={publishedAt}>
                  {formatShortDate(publishedAt)}
                </time>
              </>
            )}
          </div>

          <h1 className="text-[36px] font-normal leading-[1.1] tracking-[-1.6px] text-ink sm:text-[48px] sm:tracking-[-2.2px] lg:text-[56px]">
            {title}
          </h1>

          {description && (
            <p className="max-w-2xl text-[16px] leading-[1.65] text-subtle">{description}</p>
          )}

          {hasAuthors && (
            <p className="font-mono text-[11px] text-subtle">Por {formatAuthors(populatedAuthors)}</p>
          )}
        </div>
      </div>
    </header>
  )
}
