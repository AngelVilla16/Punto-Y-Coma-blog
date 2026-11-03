import type { Metadata } from 'next'

import { TutorialArchive } from '@/components/TutorialArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import type { TutorialCardDoc } from '@/utilities/tutorials'

export const dynamic = 'force-static'
export const revalidate = 600

export const metadata: Metadata = {
  title: 'Todos los tutoriales',
  description:
    'El archivo completo de tutoriales de Punto y coma: programación en español, paso a paso y con código real.',
}

const PER_PAGE = 9

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: PER_PAGE,
    page: 1,
    overrideAccess: false,
    sort: '-publishedAt',
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      publishedAt: true,
    },
  })

  return (
    <TutorialArchive
      buildHref={(pageNumber) => (pageNumber === 1 ? '/posts' : `/posts/page/${pageNumber}`)}
      page={posts.page || 1}
      perPage={PER_PAGE}
      posts={posts.docs as TutorialCardDoc[]}
      totalDocs={posts.totalDocs}
      totalPages={posts.totalPages}
    />
  )
}
