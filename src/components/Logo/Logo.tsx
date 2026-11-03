import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  size?: 'sm' | 'md'
}

export const Logo = (props: Props) => {
  const { className, size = 'md' } = props

  return (
    <span className={clsx('inline-flex items-center gap-[10px]', className)}>
      <span
        aria-hidden
        className={clsx(
          'flex shrink-0 items-center justify-center rounded-[8px] bg-brand text-white',
          size === 'sm' ? 'size-[30px]' : 'size-[36px]',
        )}
      >
        <span
          className={clsx(
            'font-mono font-medium leading-none',
            size === 'sm' ? 'text-[25px]' : 'text-[30px]',
          )}
        >
          ;
        </span>
      </span>
      <span
        className={clsx(
          'font-normal tracking-[-0.9px] text-ink',
          size === 'sm' ? 'text-[20px]' : 'text-[23px]',
        )}
      >
        punto y coma
      </span>
    </span>
  )
}
