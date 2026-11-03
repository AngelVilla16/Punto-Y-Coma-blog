import type { Metadata } from 'next/types'

import { TutorialArchive } from '@/components/TutorialArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { notFound } from 'next/navigation'

import type { TutorialCardDoc } from '@/utilities/tutorials'

export const revalidate = 600

const PER_PAGE = 9

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber) || sanitizedPageNumber < 1) notFound()

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: PER_PAGE,
    page: sanitizedPageNumber,
    overrideAccess: false,
    sort: '-publishedAt',
    select: {
      title: true,
      slug: true,
      categories: true,
      level: true,
      meta: true,
      publishedAt: true,
    },
  })

  if (sanitizedPageNumber > 1 && posts.docs.length === 0) notFound()

  return (
    <TutorialArchive
      buildHref={(page) => (page === 1 ? '/posts' : `/posts/page/${page}`)}
      page={posts.page || sanitizedPageNumber}
      perPage={PER_PAGE}
      posts={posts.docs as TutorialCardDoc[]}
      title={`Todos los tutoriales · Página ${sanitizedPageNumber}`}
      totalDocs={posts.totalDocs}
      totalPages={posts.totalPages}
    />
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Todos los tutoriales · Página ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / PER_PAGE)

  const pages: { pageNumber: string }[] = []

  for (let i = 2; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
