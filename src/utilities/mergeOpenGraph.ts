import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Tutoriales de programación en español, explicados con calma. Del primer «hola, mundo» a tu próximo proyecto.',
  images: [
    {
      url: `${getServerSideURL()}/og-punto-y-coma.png`,
    },
  ],
  siteName: 'Punto y coma',
  title: 'Punto y coma',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
