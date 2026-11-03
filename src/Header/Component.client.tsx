'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search } from 'lucide-react'
import React from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderSearch } from './HeaderSearch'

interface HeaderClientProps {
  data: Header
}

type NavLink = NonNullable<Header['navItems']>[number]['link']

const fallbackNav: { href: string; label: string }[] = [
  { href: '/', label: 'Inicio' },
  { href: '/posts', label: 'Tutoriales' },
  { href: '/#rutas', label: 'Rutas de aprendizaje' },
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

const isActive = (href: string, pathname: string) => {
  if (href === '/') return pathname === '/'
  if (href.startsWith('/#')) return false
  return pathname === href || pathname.startsWith(`${href}/`)
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const pathname = usePathname()

  const navItems = (data?.navItems || [])
    .map(({ link }) => {
      const href = getHref(link)
      if (!href) return null

      return {
        href,
        label: link?.label || href,
        newTab: Boolean(link?.newTab),
      }
    })
    .filter((item): item is { href: string; label: string; newTab: boolean } => Boolean(item))

  const nav = navItems.length > 0 ? navItems : fallbackNav.map((item) => ({ ...item, newTab: false }))

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-canvas/95 backdrop-blur">
      <div className="shell flex h-[72px] items-center justify-between gap-6 lg:h-[100px]">
        <Link aria-label="Punto y coma, inicio" className="shrink-0" href="/">
          <Logo />
        </Link>

        <nav aria-label="Navegación principal" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => {
            const active = isActive(item.href, pathname)

            return (
              <Link
                className={
                  active
                    ? 'text-[14px] font-normal text-brand'
                    : 'text-[14px] font-medium text-subtle transition-colors hover:text-ink'
                }
                href={item.href}
                key={`${item.href}-${item.label}`}
                {...(item.newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-4 lg:gap-6">
          <HeaderSearch />
          <Link
            aria-label="Buscar tutoriales"
            className="flex size-[42px] items-center justify-center rounded-[8px] border border-line bg-white text-subtle md:hidden"
            href="/search"
          >
            <Search className="size-[18px]" strokeWidth={1.6} />
          </Link>
          <Link
            className="hidden whitespace-nowrap text-[14px] font-semibold text-brand transition-opacity hover:opacity-70 xl:inline"
            href="/#newsletter"
          >
            La newsletter ↗
          </Link>
        </div>
      </div>
    </header>
  )
}
