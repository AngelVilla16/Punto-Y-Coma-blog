/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--color-ink)',
              '--tw-prose-headings': 'var(--color-ink)',
              '--tw-prose-lead': 'var(--color-subtle)',
              '--tw-prose-links': 'var(--color-brand)',
              '--tw-prose-bold': 'var(--color-ink)',
              '--tw-prose-counters': 'var(--color-brand)',
              '--tw-prose-bullets': 'var(--color-brand)',
              '--tw-prose-hr': 'var(--color-line)',
              '--tw-prose-quotes': 'var(--color-ink)',
              '--tw-prose-quote-borders': 'var(--color-brand)',
              '--tw-prose-captions': 'var(--color-subtle)',
              '--tw-prose-code': 'var(--color-brand)',
              '--tw-prose-pre-code': 'var(--color-code-text)',
              '--tw-prose-pre-bg': 'var(--color-code)',
              '--tw-prose-th-borders': 'var(--color-line)',
              '--tw-prose-td-borders': 'var(--color-line)',
              h1: {
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: '2.5rem',
              },
              h2: {
                fontSize: '1.25rem',
                fontWeight: 600,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: '3.5rem',
              },
              h2: {
                fontSize: '1.5rem',
              },
            },
          ],
        },
      },
    },
  },
}

export default config
