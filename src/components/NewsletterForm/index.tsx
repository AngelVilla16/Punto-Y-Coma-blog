'use client'

import { ArrowRight } from 'lucide-react'
import React, { useState } from 'react'

export const NewsletterForm: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false)

  return (
    <div className="flex w-full flex-col gap-3">
      <form
        className="flex w-full flex-col gap-[10px] sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault()
          setSubscribed(true)
        }}
      >
        <label className="sr-only" htmlFor="newsletter-email">
          Tu correo electrónico
        </label>
        <input
          className="h-12 min-w-0 flex-1 rounded-[8px] border border-line bg-white px-4 text-[14px] text-ink outline-none transition-colors placeholder:text-subtle focus:border-brand/60 focus:ring-4 focus:ring-brand/10"
          id="newsletter-email"
          name="email"
          placeholder="Tu correo electrónico"
          required
          type="email"
        />
        <button
          className="inline-flex h-12 shrink-0 items-center justify-center gap-3 rounded-[8px] border border-brand bg-brand px-5 text-[14px] font-semibold text-white transition-colors hover:bg-[#5f37c4]"
          type="submit"
        >
          Me apunto
          <ArrowRight aria-hidden className="size-[18px]" strokeWidth={1.8} />
        </button>
      </form>
      <p
        aria-live="polite"
        className={subscribed ? 'text-[11px] text-positive' : 'text-[11px] text-subtle'}
      >
        {subscribed
          ? '¡Listo! Nos vemos en tu bandeja de entrada el viernes.'
          : 'Sin spam, sin ruido. Date de baja cuando quieras.'}
      </p>
    </div>
  )
}
