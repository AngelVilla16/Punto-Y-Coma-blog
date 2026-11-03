import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer as FooterType } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'

type NavLink = NonNullable<FooterType['navItems']>[number]['link']

const fallbackNav = [
  { href: '/posts', label: 'Sobre el blog' },
  { href: 'https://github.com', label: 'GitHub ↗' },
  { href: 'mailto:hola@puntoycoma.dev', label: 'Contacto' },
]

const getHref = (link?: NavLink | null): string | null => {
  if (!link) return null

  if (link.type === 'reference' && typeof link.reference?.value === 'object' && link.reference.value) {
    const { relationTo, value } = link.reference
    const slug = 'slug' in value ? value.slug : undefined

    if (slug) return relationTo === 'pages' ? `/${slug}` : `/${relationTo}/${slug}`
  }

  return link.url || null
}

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const navItems = (footerData?.navItems || [])
    .map(({ link }) => {
      const href = getHref(link)
      if (!href) return null
      return { href, label: link?.label || href }
    })
    .filter((item): item is { href: string; label: string } => Boolean(item))

  const nav = navItems.length > 0 ? navItems : fallbackNav

  return (
    <footer className="mt-auto border-t border-line bg-canvas">
      <div className="shell flex flex-col gap-7 pb-7 pt-9">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <Link aria-label="Punto y coma, inicio" className="shrink-0" href="/">
            <Logo size="sm" />
          </Link>

          <p className="text-[13px] text-subtle">Menos copiar y pegar. Más entender.</p>

          <nav aria-label="Enlaces del pie de página" className="flex flex-wrap gap-6">
            {nav.map((item) => {
              const external = item.href.startsWith('http') || item.href.startsWith('mailto:')

              return (
                <Link
                  className="text-[13px] text-ink transition-colors hover:text-brand"
                  href={item.href}
                  key={`${item.href}-${item.label}`}
                  {...(external ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex flex-col gap-3 text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px]">
            © {new Date().getFullYear()} Punto y coma · Hecho con curiosidad y café.
          </p>
          <p className="text-[11px]">
            <span>Privacidad</span>
            <span aria-hidden> · </span>
            <span>Cookies</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
