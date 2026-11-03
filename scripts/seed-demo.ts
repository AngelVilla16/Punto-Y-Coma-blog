/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload } from 'payload'
import config from '../src/payload.config'

type Demo = {
  body: string[]
  categories: string[]
  description: string
  publishedAt: string
  slug: string
  title: string
}

const demos: Demo[] = [
  {
    title: 'Entiende useState sin aprenderlo de memoria',
    slug: 'entiende-usestate-sin-aprenderlo-de-memoria',
    categories: ['React'],
    publishedAt: '2026-11-01T09:00:00.000Z',
    description:
      'Dale vida a tus componentes con estado, eventos y un contador muy sencillo. Sin saltarte ningún paso.',
    body: [
      'El estado es la memoria de un componente. Cuando cambia, React vuelve a renderizar la parte de la interfaz que depende de él.',
      'En este tutorial construimos un contador mínimo para entender qué hace useState, qué devuelve y por qué nunca debes mutar el valor directamente.',
    ],
  },
  {
    title: 'Automatiza tus archivos con 20 líneas de Python',
    slug: 'automatiza-tus-archivos-con-20-lineas-de-python',
    categories: ['Python'],
    publishedAt: '2026-10-29T09:00:00.000Z',
    description:
      'Un pequeño script para ordenar carpetas y ahorrarte unas cuantas tareas repetitivas.',
    body: [
      'Python brilla cuando se trata de tareas pequeñas. En este caso vamos a recorrer una carpeta y mover cada archivo según su extensión.',
      'Con pathlib y unas pocas líneas tendrás un organizador que puedes adaptar a fotos, documentos o descargas.',
    ],
  },
  {
    title: 'CSS Grid: de cero a una galería responsive',
    slug: 'css-grid-de-cero-a-una-galeria-responsive',
    categories: ['CSS'],
    publishedAt: '2026-10-27T09:00:00.000Z',
    description:
      'Construye un layout flexible y descubre por qué minmax() es tu aliado para adaptar la galería a cualquier pantalla.',
    body: [
      'CSS Grid nos permite pensar en filas y columnas al mismo tiempo. La clave está en definir un patrón que se adapte solo al ancho disponible.',
      'Vamos a construir una galería con repeat, minmax y auto-fit, sin una sola media query.',
    ],
  },
  {
    title: 'useEffect: cuándo usarlo y cuándo no',
    slug: 'useeffect-cuando-usarlo-y-cuando-no',
    categories: ['React'],
    publishedAt: '2026-10-24T09:00:00.000Z',
    description:
      'Aprende a sincronizar tus componentes sin efectos inesperados ni bucles infinitos.',
    body: [
      'useEffect no es un lugar para calcular cosas que puedes calcular durante el render. Sirve para sincronizar el componente con algo externo.',
      'Veremos ejemplos de suscripciones, limpieza de efectos y las dependencias que de verdad importan.',
    ],
  },
  {
    title: 'TypeScript: tipa tus funciones desde el primer día',
    slug: 'typescript-tipa-tus-funciones-desde-el-primer-dia',
    categories: ['TypeScript'],
    publishedAt: '2026-10-20T09:00:00.000Z',
    description:
      'Parámetros, retornos y genéricos sin dolor. Una base práctica para que el editor te ayude de verdad.',
    body: [
      'Los tipos no están para decorar el código: son una herramienta para que el editor detecte errores antes de que lleguen a producción.',
      'Empezamos por funciones pequeñas y terminamos con un genérico que reutiliza la misma lógica para varios tipos.',
    ],
  },
  {
    title: 'Consume una API en React con fetch',
    slug: 'consume-una-api-en-react-con-fetch',
    categories: ['React'],
    publishedAt: '2026-10-18T09:00:00.000Z',
    description:
      'Muestra datos reales y gestiona los estados de carga, éxito y error sin librerías extra.',
    body: [
      'El ciclo de una petición tiene tres momentos: cargando, éxito y error. Modelarlos explícitamente simplifica la interfaz.',
      'Vamos a consumir una API pública con fetch y a mostrar la lista de resultados con un estado de carga honesto.',
    ],
  },
  {
    title: 'JavaScript asíncrono: promesas sin miedo',
    slug: 'javascript-asincrono-promesas-sin-miedo',
    categories: ['JavaScript'],
    publishedAt: '2026-10-15T09:00:00.000Z',
    description:
      'Entiende async/await desde el evento loop y deja de adivinar cuándo se ejecuta cada línea.',
    body: [
      'Una promesa representa un valor que todavía no existe. async y await son azúcar sintáctico para esperar ese valor sin bloquear el navegador.',
      'Con ejemplos pequeños verás el orden real de ejecución y cómo manejar los errores con try/catch.',
    ],
  },
  {
    title: 'Formularios en React, sin complicaciones',
    slug: 'formularios-en-react-sin-complicaciones',
    categories: ['React'],
    publishedAt: '2026-10-12T09:00:00.000Z',
    description:
      'Inputs controlados, validación y mensajes de error que ayudan de verdad a quien está rellenando el formulario.',
    body: [
      'Un formulario controlado guarda el valor en el estado y deja que React sea la única fuente de verdad.',
      'Añadimos validación, mensajes accesibles y un estado de envío para que la experiencia no se sienta rota.',
    ],
  },
  {
    title: 'Tu primer custom hook con TypeScript',
    slug: 'tu-primer-custom-hook-con-typescript',
    categories: ['React', 'TypeScript'],
    publishedAt: '2026-10-06T09:00:00.000Z',
    description:
      'Extrae lógica reutilizable y añade tipos a un hook para guardar preferencias en el navegador.',
    body: [
      'Un custom hook es una función que empieza por use y reutiliza otros hooks. Sirve para compartir lógica, no estado global.',
      'Vamos a construir usePreferencia, tipado de principio a fin y con persistencia en localStorage.',
    ],
  },
  {
    title: 'Comparte estado con Context, paso a paso',
    slug: 'comparte-estado-con-context-paso-a-paso',
    categories: ['React'],
    publishedAt: '2026-09-30T09:00:00.000Z',
    description:
      'Crea un selector de tema y despídete del prop drilling con useContext.',
    body: [
      'Context resuelve un problema concreto: pasar un valor a muchos componentes sin encadenar props.',
      'Construimos un proveedor de tema, un consumidor tipado y las reglas para no convertir Context en un cajón desastre.',
    ],
  },
  {
    title: 'Tu primera API con Node.js y Express, paso a paso',
    slug: 'tu-primera-api-con-node-js-y-express',
    categories: ['Node.js'],
    publishedAt: '2026-10-31T09:00:00.000Z',
    description:
      'De una carpeta vacía a un servidor funcionando. Crea tus primeras rutas y entiende qué pasa en cada petición.',
    body: [
      'Express es una capa mínima sobre el servidor HTTP de Node. Con muy poco código podemos responder a una petición con JSON.',
      'Vamos a crear el proyecto, definir una ruta y comprobar que todo funciona en localhost antes de añadir nada más.',
    ],
  },
]

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const richText = (paragraphs: string[]) => {
  const text = (value: string) => ({
    type: 'text',
    text: value,
    format: 0,
    detail: 0,
    mode: 'normal',
    style: '',
    version: 1,
  })

  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: paragraphs.flatMap((paragraph, index) => [
        {
          type: index === 0 ? 'heading' : 'paragraph',
          tag: index === 0 ? 'h2' : undefined,
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr',
          children: [text(paragraph)],
        },
      ]),
    },
  } as any
}

const run = async () => {
  const payload = await getPayload({ config })

  const existingCategories = await payload.find({
    collection: 'categories',
    limit: 100,
    pagination: false,
  })

  const categoryMap = new Map(
    existingCategories.docs.map((category) => [category.title.toLowerCase(), category.id]),
  )

  const neededCategories = [...new Set(demos.flatMap((demo) => demo.categories))]

  for (const title of neededCategories) {
    if (categoryMap.has(title.toLowerCase())) continue

    const created = await payload.create({
      collection: 'categories',
      data: { title, slug: slugify(title) },
    })

    categoryMap.set(title.toLowerCase(), created.id)
    payload.logger.info(`Categoría creada: ${title}`)
  }

  let created = 0
  let skipped = 0

  for (const demo of demos) {
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: demo.slug } },
      limit: 1,
      pagination: false,
    })

    if (existing.docs.length > 0) {
      skipped += 1
      continue
    }

    const categoryIds = demo.categories
      .map((title) => categoryMap.get(title.toLowerCase()))
      .filter((id): id is number => typeof id === 'number')

    await payload.create({
      collection: 'posts',
      data: {
        title: demo.title,
        slug: demo.slug,
        _status: 'published',
        publishedAt: demo.publishedAt,
        categories: categoryIds,
        meta: {
          title: demo.title,
          description: demo.description,
        },
        content: richText(demo.body),
      },
      context: { disableRevalidate: true },
      overrideAccess: true,
    })

    created += 1
  }

  payload.logger.info(`Seed completado: ${created} tutoriales creados, ${skipped} ya existían.`)

  const headerGlobal = await payload.findGlobal({ slug: 'header' })
  const headerLabels = (headerGlobal.navItems || [])
    .map((item) => item.link?.label)
    .filter((label): label is string => Boolean(label))

  const headerLooksLikeTemplate =
    headerLabels.length === 2 && headerLabels.includes('Posts') && headerLabels.includes('Contact')

  if (headerLooksLikeTemplate) {
    await payload.updateGlobal({
      slug: 'header',
      context: { disableRevalidate: true },
      overrideAccess: true,
      data: {
        navItems: [
          { link: { type: 'custom', label: 'Inicio', url: '/', newTab: false } },
          { link: { type: 'custom', label: 'Tutoriales', url: '/posts', newTab: false } },
          {
            link: {
              type: 'custom',
              label: 'Rutas de aprendizaje',
              url: '/#rutas',
              newTab: false,
            },
          },
        ],
      },
    })

    payload.logger.info('Navegación del header actualizada al diseño de Punto y coma.')
  }

  const footerGlobal = await payload.findGlobal({ slug: 'footer' })
  const footerLabels = (footerGlobal.navItems || [])
    .map((item) => item.link?.label)
    .filter((label): label is string => Boolean(label))

  const footerLooksLikeTemplate =
    footerLabels.length === 3 &&
    footerLabels.includes('Admin') &&
    footerLabels.includes('Source Code') &&
    footerLabels.includes('Payload')

  if (footerLooksLikeTemplate) {
    await payload.updateGlobal({
      slug: 'footer',
      context: { disableRevalidate: true },
      overrideAccess: true,
      data: {
        navItems: [
          { link: { type: 'custom', label: 'Sobre el blog', url: '/posts', newTab: false } },
          {
            link: {
              type: 'custom',
              label: 'GitHub ↗',
              url: 'https://github.com',
              newTab: true,
            },
          },
          { link: { type: 'custom', label: 'Contacto', url: '/contact', newTab: false } },
        ],
      },
    })

    payload.logger.info('Navegación del footer actualizada al diseño de Punto y coma.')
  }

  process.exit(0)
}

try {
  await run()
} catch (error) {
  console.error(error)
  process.exit(1)
}
