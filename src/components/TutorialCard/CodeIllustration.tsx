import { cn } from '@/utilities/ui'
import React from 'react'

import type { CodeSnippet } from '@/utilities/tutorials'

const TINT_CLASS: Record<CodeSnippet['tint'], string> = {
  lilac: 'bg-tint-lilac',
  sage: 'bg-tint-sage',
  sand: 'bg-tint-sand',
  brand: 'bg-brand-tint',
}

const TONE_CLASS: Record<NonNullable<CodeSnippet['lines'][number]['tone']> | 'plain', string> = {
  plain: 'text-code-text',
  keyword: 'text-code-keyword',
  string: 'text-code-string',
  muted: 'text-code-muted',
}

type Props = {
  className?: string
  snippet: CodeSnippet
  variant?: 'default' | 'compact' | 'featured'
}

export const CodeIllustration: React.FC<Props> = ({ className, snippet, variant = 'default' }) => {
  const featured = variant === 'featured'
  const compact = variant === 'compact'

  return (
    <div
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden',
        TINT_CLASS[snippet.tint],
        compact ? 'h-[152px] p-[22px]' : featured ? 'h-full p-10' : 'h-[190px] p-[22px]',
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 select-none overflow-hidden whitespace-nowrap font-mono font-medium leading-none text-white/45',
          featured ? 'text-[168px]' : 'text-[106px]',
        )}
      >
        {snippet.glyph}
      </span>

      <div
        className={cn(
          'relative z-10 flex w-full flex-col overflow-hidden rounded-[10px] bg-code shadow-[0px_12px_24px_0px_rgba(52,35,70,0.13)]',
          compact ? 'h-[132px]' : featured ? 'h-[276px] w-[442px] max-w-full' : 'h-[156px]',
        )}
      >
        <div
          className={cn(
            'flex shrink-0 items-center gap-2 border-b border-white/[0.07] px-[14px]',
            featured ? 'h-10' : 'h-[30px]',
          )}
        >
          <span aria-hidden className="flex items-center gap-[4px]">
            <span className="size-[5px] rounded-full bg-[#5d5572]" />
            <span className="size-[5px] rounded-full bg-[#6d6484]" />
            <span className="size-[5px] rounded-full bg-[#807696]" />
          </span>
          <span
            className={cn(
              'truncate font-mono text-code-muted',
              featured ? 'text-[11px]' : 'text-[10px]',
            )}
          >
            {snippet.file}
          </span>
        </div>

        <div
          className={cn(
            'flex min-h-0 flex-1 flex-col overflow-hidden px-2 py-[7px] font-mono leading-[1.5] text-code-text',
            featured ? 'text-[12px]' : 'text-[10px]',
          )}
        >
          {snippet.lines.map((line, index) => (
            <div className="flex min-w-0" key={`${line.text}-${index}`}>
              <span
                aria-hidden
                className={cn(
                  'shrink-0 select-none pr-2 text-right text-code-muted/50',
                  featured ? 'w-6' : 'w-5',
                )}
              >
                {index + 1}
              </span>
              <span
                className={cn('min-w-0 truncate whitespace-pre', TONE_CLASS[line.tone || 'plain'])}
              >
                {line.text || ' '}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
