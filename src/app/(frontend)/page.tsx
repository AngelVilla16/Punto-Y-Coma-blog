import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { NewsletterForm } from '@/components/NewsletterForm'
import { SearchForm } from '@/components/Search/SearchForm'
import { FeaturedTutorialCard } from '@/components/TutorialCard/FeaturedTutorialCard'
import { TutorialCard } from '@/components/TutorialCard'
import {
  TECH_CATALOG,
  getTechDefinition,
  type TutorialCardDoc,
} from '@/utilities/tutorials'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Aprende algo nuevo. Construye algo tuyo.',
  description:
    'Tutoriales de programación en español, explicados con calma. Del primer «hola, mundo» a tu próximo proyecto.',
}

const learningPath = ['HTML', 'CSS', 'JavaScript']

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 100,
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

  const docs = posts.docs as TutorialCardDoc[]
  const featured = docs[0]
  const recent = docs.slice(1, 4)

  const techCounts = new Map<string, number>()
  for (const doc of docs) {
    const tech = getTechDefinition(doc)
    if (tech) techCounts.set(tech.key, (techCounts.get(tech.key) || 0) + 1)
  }

  return (
    <main className="bg-canvas">
      <section className="shell flex flex-col gap-9 pb-16 pt-10 lg:pt-[52px]">
        <div className="flex flex-col gap-8 pb-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-[850px] flex-col gap-5">
            <div className="flex items-center gap-2">
              <span aria-hidden className="size-1.5 rounded-full bg-brand" />
              <p className="font-mono text-[11px] uppercase tracking-[1.5px] text-brand">
                Un blog para aprender haciendo
              </p>
            </div>
            <h1 className="text-[42px] font-normal leading-[1.08] tracking-[-1.8px] text-ink sm:text-[52px] lg:text-[60px] lg:tracking-[-2.8px]">
              Aprende algo nuevo.
              <br />
              Construye algo <span className="text-brand">tuyo.</span>
            </h1>
          </div>

          <div className="flex max-w-[338px] flex-col gap-5 pb-1">
            <p className="text-[16px] leading-[1.65] text-subtle">
              Tutoriales de programación en español, explicados con calma. Del primer «hola, mundo»
              a tu próximo proyecto.
            </p>
            <p className="font-mono text-[11px] text-brand">
              código real. pasos claros. sin atajos.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[1.3px] text-brand">
              01 / Lo más nuevo
            </p>
            <h2 className="text-[28px] font-normal tracking-[-1.2px] text-ink sm:text-[34px]">
              Recién salidos del editor
            </h2>
          </div>
          <Link
            className="group inline-flex items-center gap-[10px] pb-1 text-[14px] font-semibold text-brand transition-opacity hover:opacity-70"
            href="/posts"
          >
            Todos los tutoriales
            <ArrowRight
              aria-hidden
              className="size-[18px] transition-transform group-hover:translate-x-0.5"
              strokeWidth={1.7}
            />
          </Link>
        </div>

        {featured ? (
          <FeaturedTutorialCard doc={featured} />
        ) : (
          <div className="flex min-h-[240px] flex-col items-start justify-center gap-4 rounded-2xl border border-line bg-white p-9">
            <p className="font-mono text-[11px] uppercase tracking-[1.3px] text-brand">
              El editor está calentando
            </p>
            <h2 className="text-[30px] tracking-[-1px] text-ink">
              El primer tutorial está a punto de salir.
            </h2>
            <Link
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-brand"
              href="/posts"
            >
              Ver los tutoriales
              <ArrowRight aria-hidden className="size-[17px]" strokeWidth={1.7} />
            </Link>
          </div>
        )}

        {recent.length > 0 && (
          <div className="grid gap-6 md:grid-cols-3">
            {recent.map((doc, index) => (
              <TutorialCard doc={doc} key={`${doc.slug}-${index}`} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-brand-soft" id="rutas">
        <div className="shell flex flex-col gap-8 py-14">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex max-w-[600px] flex-col gap-3">
              <p className="font-mono text-[11px] uppercase tracking-[1.3px] text-brand">
                02 / Sigue tu curiosidad
              </p>
              <h2 className="text-[28px] font-normal tracking-[-1.3px] text-ink sm:text-[34px]">
                ¿Qué quieres aprender hoy?
              </h2>
              <p className="text-[14px] text-subtle">
                Elige una tecnología o encuentra ese concepto que se te resiste.
              </p>
            </div>
            <SearchForm className="lg:w-[566px]" variant="inline" />
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
            {TECH_CATALOG.map((tech) => {
              const count = techCounts.get(tech.key) || 0

              return (
                <Link
                  className="group flex h-[144px] flex-col justify-between rounded-xl border border-line bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_16px_32px_-24px_rgba(52,35,70,0.35)]"
                  href={`/search?tech=${encodeURIComponent(tech.key)}`}
                  key={tech.key}
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <span className="font-mono text-[24px] font-medium leading-none tracking-[-1px] text-brand">
                      {tech.glyph}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-[15px] text-subtle transition-colors group-hover:text-brand"
                      strokeWidth={1.6}
                    />
                  </div>
                  <div className="flex flex-col gap-[5px]">
                    <p className="text-[15px] font-semibold text-ink">{tech.label}</p>
                    <p className="font-mono text-[10px] text-subtle">
                      {count} tutorial{count === 1 ? '' : 'es'}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="flex flex-col gap-6 rounded-2xl bg-white px-7 py-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex max-w-[390px] flex-col gap-[9px]">
              <p className="font-mono text-[10px] uppercase tracking-[0.8px] text-brand">
                ¿Tu primera línea de código?
              </p>
              <p className="text-[23px] tracking-[-0.6px] text-ink">
                Hay un buen lugar para empezar.
              </p>
              <p className="text-[13px] text-subtle">
                Una ruta de 6 tutoriales, desde cero y a tu ritmo.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-[18px]">
              {learningPath.map((step, index) => (
                <div className="flex items-center gap-[9px]" key={step}>
                  <span className="font-mono text-[11px] text-brand">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[13px] font-medium text-ink">{step}</span>
                  {index < learningPath.length - 1 && (
                    <span aria-hidden className="text-[12px] text-subtle">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>

            <Link
              className="inline-flex h-12 shrink-0 items-center justify-center gap-3 rounded-[8px] border border-line bg-white px-5 text-[14px] font-semibold text-ink transition-colors hover:border-brand/40 hover:text-brand"
              href="/posts"
            >
              Ver la ruta
              <ArrowRight aria-hidden className="size-[18px]" strokeWidth={1.7} />
            </Link>
          </div>
        </div>
      </section>

      <section className="shell flex flex-col gap-8 py-14 lg:flex-row lg:items-center lg:justify-between lg:py-16" id="newsletter">
        <div className="flex max-w-[580px] flex-col gap-3.5">
          <p className="font-mono text-[11px] uppercase tracking-[1.3px] text-brand">
            Un commit a la semana
          </p>
          <h2 className="text-[28px] font-normal tracking-[-1.2px] text-ink sm:text-[34px]">
            Que no se te escape lo nuevo.
          </h2>
          <p className="text-[14px] leading-[1.6] text-subtle">
            Un correo los viernes con nuevos tutoriales y recursos que sí merecen una pestaña
            abierta.
          </p>
        </div>

        <div className="w-full lg:max-w-[550px]">
          <NewsletterForm />
        </div>
      </section>
    </main>
  )
}
