import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'glyph', 'order', 'slug'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'glyph',
      type: 'text',
      admin: {
        description:
          'Símbolo corto que se muestra en la tarjeta de la portada (por ejemplo: JS, </>, #).',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Controla el orden en el que aparece la categoría en la portada y los filtros.',
        position: 'sidebar',
      },
      defaultValue: 0,
    },
    slugField({
      position: undefined,
    }),
  ],
}
