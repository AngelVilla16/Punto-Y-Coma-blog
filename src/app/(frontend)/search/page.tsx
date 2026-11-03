import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Pagination } from '@/components/Pagination'
import { SearchFilters } from '@/components/Search/SearchFilters'
import { SearchForm } from '@/components/Search/SearchForm'
import { SortSelect } from '@/components/Search/SortSelect'
import { TutorialCard } from '@/components/TutorialCard'
import {
  TIME_BUCKETS,
  TIME_BUCKET_LABELS,
  TUTORIAL_LEVELS,
  getCategorySlug,
  getCategoryTitles,
  getDescription,
  getReadingMinutes,
  getTimeBucket,
  getTutorialLevel,
  normalizeText,
  type TutorialCardDoc,
  type TimeBucket,
} from '@/utilities/tutorials'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Buscar tutoriales',
  description:
    'Encuentra el tutorial que necesitas, estés donde estés en tu aprendizaje. Filtra por tecnología, nivel y tiempo de lectura.',
}

type SearchParamValue = string | string[] | undefined

type Args = {
  searchParams: Promise<Record<string, SearchParamValue>>
}

const PER_PAGE = 6

const asString = (value: SearchParamValue): string => {
  if (Array.isArray(value)) return value[0] || ''
  return value || ''
}

const asArray = (value: SearchParamValue): string[] => {
  if (!value) return []
  return (Array.isArray(value) ? value : value.split(',')).map((item) => item.trim()).filter(Boolean)
}

export default async function SearchPage({ searchParams: searchParamsPromise }: Args) {
  const searchParams = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const q = asString(searchParams.q).trim()
  const requestedTechs = [...new Set(asArray(searchParams.tech))]
  const requestedLevel = asString(searchParams.level)
  const requestedTime = asString(searchParams.time)
  const sort = asString(searchParams.sort) === 'oldest' ? 'oldest' : 'recent'

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 1000,
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

  const categoriesResult = await payload.find({
    collection: 'categories',
    depth: 0,
    limit: 200,
    overrideAccess: false,
    sort: 'order',
  })

  const categories = [...categoriesResult.docs].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0) || a.title.localeCompare(b.title),
  )

  const enriched = (posts.docs as TutorialCardDoc[]).map((doc) => {
    const minutes = getReadingMinutes(doc)
    const level = getTutorialLevel(doc)
    const tech = getCategorySlug(doc)

    return {
      doc,
      minutes,
      level,
      tech,
      time: getTimeBucket(minutes),
      haystack: normalizeText(
        [doc.title, getDescription(doc), ...getCategoryTitles(doc)].join(' '),
      ),
    }
  })

  const normalizedQuery = normalizeText(q)
  const queryFiltered = normalizedQuery
    ? enriched.filter((item) => item.haystack.includes(normalizedQuery))
    : enriched

  const techCounts = new Map<string, number>()
  const levelCounts = new Map<string, number>()
  const timeCounts = new Map<TimeBucket, number>()

  for (const item of queryFiltered) {
    techCounts.set(item.tech, (techCounts.get(item.tech) || 0) + 1)
    levelCounts.set(item.level, (levelCounts.get(item.level) || 0) + 1)
    timeCounts.set(item.time, (timeCounts.get(item.time) || 0) + 1)
  }

  const techLabels = new Map(categories.map((category) => [category.slug, category.title]))
  const catalogKeys = new Set(techLabels.keys())
  const extraTechKeys = [...techCounts.keys()].filter((key) => key && !catalogKeys.has(key))

  const categoryKeyByAlias = new Map<string, string>()
  for (const category of categories) {
    categoryKeyByAlias.set(normalizeText(category.slug), category.slug)
    categoryKeyByAlias.set(normalizeText(category.title), category.slug)
  }

  const techs = requestedTechs
    .map((tech) => categoryKeyByAlias.get(normalizeText(tech)) || tech)
    .filter((tech) => techLabels.has(tech) || techCounts.has(tech))
  const activeTechs = new Set(techs)

  const techOptions = [
    ...categories.map((category) => ({
      active: activeTechs.has(category.slug),
      count: techCounts.get(category.slug) || 0,
      label: category.title,
      value: category.slug,
    })),
    ...extraTechKeys.map((key) => ({
      active: activeTechs.has(key),
      count: techCounts.get(key) || 0,
      label: key,
      value: key,
    })),
  ]

  const levelOptions = [
    {
      active: !requestedLevel,
      label: 'Todos los niveles',
      value: '',
    },
    ...TUTORIAL_LEVELS.map((level) => ({
      active: requestedLevel === level,
      count: levelCounts.get(level) || 0,
      label: level,
      value: level,
    })),
  ]

  const timeOptions = TIME_BUCKETS.map((bucket) => ({
    active: requestedTime === bucket.value,
    count: timeCounts.get(bucket.value) || 0,
    label: bucket.label,
    value: bucket.value,
  }))

  const level = TUTORIAL_LEVELS.find((item) => item === requestedLevel) || ''
  const time = TIME_BUCKETS.find((item) => item.value === requestedTime)?.value || ''

  let results = queryFiltered.filter(
    (item) =>
      (techs.length === 0 || techs.includes(item.tech)) &&
      (!level || item.level === level) &&
      (!time || item.time === time),
  )

  results = results.sort((a, b) => {
    const dateA = a.doc.publishedAt ? new Date(a.doc.publishedAt).getTime() : 0
    const dateB = b.doc.publishedAt ? new Date(b.doc.publishedAt).getTime() : 0
    return sort === 'oldest' ? dateA - dateB : dateB - dateA
  })

  const total = results.length
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE))
  const requestedPage = Number.parseInt(asString(searchParams.page), 10)
  const page = Math.min(
    Math.max(1, Number.isNaN(requestedPage) ? 1 : requestedPage),
    totalPages,
  )

  const pageResults = results.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const rangeStart = total === 0 ? 0 : (page - 1) * PER_PAGE + 1
  const rangeEnd = Math.min(total, page * PER_PAGE)

  const buildHref = (overrides: {
    level?: string
    page?: number
    q?: string
    sort?: string
    tech?: string[]
    time?: string
  } = {}) => {
    const params = new URLSearchParams()
    const nextQuery = overrides.q !== undefined ? overrides.q : q
    const nextTechs = overrides.tech !== undefined ? overrides.tech : techs
    const nextLevel = overrides.level !== undefined ? overrides.level : level
    const nextTime = overrides.time !== undefined ? overrides.time : time
    const nextSort = overrides.sort !== undefined ? overrides.sort : sort
    const nextPage = overrides.page || 1

    if (nextQuery) params.set('q', nextQuery)
    nextTechs.forEach((tech) => params.append('tech', tech))
    if (nextLevel) params.set('level', nextLevel)
    if (nextTime) params.set('time', nextTime)
    if (nextSort !== 'recent') params.set('sort', nextSort)
    if (nextPage > 1) params.set('page', String(nextPage))

    const query = params.toString()
    return `/search${query ? `?${query}` : ''}`
  }

  const tutorialCount = `${total} tutorial${total === 1 ? '' : 'es'}`

  const techNames = techs.map((tech) => techLabels.get(tech) || tech)
  const heading = q
    ? `${tutorialCount} sobre “${q}”`
    : techs.length === 1
      ? `${tutorialCount} sobre ${techNames[0]}`
      : techs.length > 1
        ? `${tutorialCount} de ${techNames.join(' + ')}`
        : `${tutorialCount} para aprender haciendo`

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

        <div className="flex flex-col gap-6 pb-1">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[1.3px] text-brand">
              Explora. Entiende. Construye.
            </p>
            <h1 className="text-[36px] font-normal leading-[1.12] tracking-[-1.5px] text-ink sm:text-[48px] sm:tracking-[-2px]">
              Tu próxima idea empieza aquí.
            </h1>
            <p className="text-[15px] text-subtle">
              Encuentra el tutorial que necesitas, estés donde estés en tu aprendizaje.
            </p>
          </div>

          <SearchForm defaultValue={q} />
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          <aside className="order-2 w-full shrink-0 lg:order-1 lg:w-[240px]">
            <SearchFilters levels={levelOptions} techs={techOptions} times={timeOptions} />
          </aside>

          <section className="order-1 flex min-w-0 flex-1 flex-col gap-6 lg:order-2">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <h2 className="text-[24px] tracking-[-0.65px] text-ink">{heading}</h2>
                <p className="text-[12px] text-subtle">Un concepto nuevo, un proyecto más cerca.</p>
              </div>
              <SortSelect value={sort} />
            </div>

            <div className="flex flex-wrap items-center gap-[10px]">
              {techs.map((tech) => (
                <Link
                  className="inline-flex items-center gap-[10px] rounded-[6px] bg-brand-tint px-3 py-2 text-[11px] font-semibold text-brand transition-opacity hover:opacity-75"
                  href={buildHref({ tech: techs.filter((item) => item !== tech) })}
                  key={tech}
                >
                  {techLabels.get(tech) || tech}
                  <X aria-hidden className="size-3" strokeWidth={2} />
                </Link>
              ))}

              {level && (
                <Link
                  className="inline-flex items-center gap-[10px] rounded-[6px] bg-brand-tint px-3 py-2 text-[11px] font-semibold text-brand transition-opacity hover:opacity-75"
                  href={buildHref({ level: '' })}
                >
                  {level}
                  <X aria-hidden className="size-3" strokeWidth={2} />
                </Link>
              )}

              {time && (
                <Link
                  className="inline-flex items-center gap-[10px] rounded-[6px] bg-brand-tint px-3 py-2 text-[11px] font-semibold text-brand transition-opacity hover:opacity-75"
                  href={buildHref({ time: '' })}
                >
                  {TIME_BUCKET_LABELS[time as TimeBucket]}
                  <X aria-hidden className="size-3" strokeWidth={2} />
                </Link>
              )}

              {(techs.length > 0 || level || time) && (
                <Link
                  className="text-[11px] text-subtle underline-offset-4 transition-colors hover:text-brand hover:underline"
                  href={buildHref({ level: '', tech: [], time: '' })}
                >
                  Limpiar filtros
                </Link>
              )}

              <p className="font-mono text-[10px] text-subtle">
                {total === 0 ? 'Sin resultados' : `Mostrando ${rangeStart}–${rangeEnd} de ${total}`}
              </p>
            </div>

            {pageResults.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {pageResults.map(({ doc }) => (
                  <TutorialCard doc={doc} key={doc.slug} variant="compact" />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[240px] flex-col items-start justify-center gap-3 rounded-2xl border border-line bg-white p-8">
                <p className="font-mono text-[11px] uppercase tracking-[1.3px] text-brand">
                  Nada por aquí
                </p>
                <h3 className="text-[24px] tracking-[-0.6px] text-ink">
                  No encontramos tutoriales con esos filtros.
                </h3>
                <p className="max-w-md text-[14px] leading-[1.6] text-subtle">
                  Prueba con otra tecnología, quita algún filtro o busca una palabra distinta.
                </p>
                <Link
                  className="mt-1 text-[13px] font-semibold text-brand hover:opacity-70"
                  href={buildHref({ level: '', tech: [], time: '' })}
                >
                  Limpiar todos los filtros →
                </Link>
              </div>
            )}

            {totalPages > 1 && (
              <Pagination
                buildHref={(pageNumber) => buildHref({ page: pageNumber })}
                page={page}
                totalPages={totalPages}
              />
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
