import type { Post } from '@/payload-types'

export type TutorialCardDoc = Pick<
  Post,
  'slug' | 'categories' | 'meta' | 'title' | 'publishedAt'
>

export type TutorialLevel = 'Inicial' | 'Intermedio' | 'Avanzado'
export type TimeBucket = 'under10' | '10to20' | 'over20'

export type CodeTone = 'plain' | 'keyword' | 'string' | 'muted'

export type CodeSnippet = {
  file: string
  glyph: string
  tint: 'lilac' | 'sage' | 'sand' | 'brand'
  lines: { text: string; tone?: CodeTone }[]
}

export type TechDefinition = {
  key: string
  label: string
  glyph: string
  aliases: string[]
}

export const TECH_CATALOG: TechDefinition[] = [
  { key: 'JavaScript', label: 'JavaScript', glyph: 'JS', aliases: ['javascript', 'js'] },
  {
    key: 'React',
    label: 'React',
    glyph: '</>',
    aliases: ['react', 'reactjs', 'react native', 'react-native', 'mobile'],
  },
  { key: 'Python', label: 'Python', glyph: 'py', aliases: ['python'] },
  {
    key: 'HTML & CSS',
    label: 'HTML & CSS',
    glyph: '#',
    aliases: ['html', 'css', 'html & css', 'html y css', 'maquetacion'],
  },
  {
    key: 'Node.js',
    label: 'Node.js',
    glyph: '{ }',
    aliases: ['node', 'node.js', 'nodejs', 'express'],
  },
  { key: 'TypeScript', label: 'TypeScript', glyph: 'TS', aliases: ['typescript', 'ts'] },
]

const LEVEL_KEYWORDS: { level: TutorialLevel; pattern: RegExp }[] = [
  {
    level: 'Avanzado',
    pattern: /(avanzad|arquitectura|performance|optimiz|deploy|seguridad|escalab|patron)/i,
  },
  {
    level: 'Intermedio',
    pattern:
      /(hook|useeffect|context|grid|api|async|promesa|typescript|estado|fetch|formulario|custom|clase)/i,
  },
]

const SNIPPETS: Record<string, CodeSnippet> = {
  react: {
    file: 'App.jsx',
    glyph: '</>',
    tint: 'lilac',
    lines: [
      { text: 'function App() {', tone: 'keyword' },
      { text: '  const [count, setCount] = useState(0);' },
      { text: '' },
      { text: '  return (', tone: 'keyword' },
      { text: '    <button onClick={incrementar}>' },
      { text: '      Clics: {count}' },
    ],
  },
  mobile: {
    file: 'App.jsx',
    glyph: '</>',
    tint: 'lilac',
    lines: [
      { text: "import { View, Text } from 'react-native';", tone: 'keyword' },
      { text: '' },
      { text: 'export default function App() {' },
      { text: '  return (' },
      { text: '    <View style={styles.container}>' },
      { text: '      <Text>Hola, mundo</Text>' },
    ],
  },
  python: {
    file: 'organizar.py',
    glyph: 'py',
    tint: 'sage',
    lines: [
      { text: 'from pathlib import Path', tone: 'keyword' },
      { text: '' },
      { text: 'for archivo in Path(".").iterdir():' },
      { text: '    if archivo.is_file():' },
      { text: '        mover_a_carpeta(archivo)' },
      { text: '' },
    ],
  },
  css: {
    file: 'styles.css',
    glyph: '#',
    tint: 'sand',
    lines: [
      { text: '.galeria {', tone: 'keyword' },
      { text: '  display: grid;' },
      { text: '  grid-template-columns:' },
      { text: '    repeat(3, minmax(0, 1fr));' },
      { text: '  gap: 1.5rem;' },
      { text: '}' },
    ],
  },
  node: {
    file: 'server.js',
    glyph: '{ }',
    tint: 'brand',
    lines: [
      { text: "import express from 'express';", tone: 'keyword' },
      { text: '' },
      { text: 'const app = express();' },
      { text: '' },
      { text: "app.get('/hola', (req, res) => {" },
      { text: "  res.json({ mensaje: '¡Hola, mundo!' });", tone: 'string' },
      { text: '});' },
      { text: '' },
      { text: 'app.listen(3000);' },
    ],
  },
  javascript: {
    file: 'app.js',
    glyph: 'JS',
    tint: 'sand',
    lines: [
      { text: 'async function cargarDatos() {', tone: 'keyword' },
      { text: "  const respuesta = await fetch('/api');" },
      { text: '  const datos = await respuesta.json();', tone: 'string' },
      { text: '' },
      { text: '  return datos;' },
      { text: '}' },
    ],
  },
  typescript: {
    file: 'types.ts',
    glyph: '<T>',
    tint: 'brand',
    lines: [
      { text: 'type Tutorial = {', tone: 'keyword' },
      { text: '  titulo: string;' },
      { text: '  nivel: "inicial" | "intermedio";' },
      { text: '};' },
      { text: '' },
      { text: 'const aprender = <T,>(dato: T) => dato;' },
    ],
  },
  default: {
    file: 'app.js',
    glyph: '{ }',
    tint: 'lilac',
    lines: [
      { text: 'const idea = empezar();', tone: 'keyword' },
      { text: '' },
      { text: 'function aprender(paso) {' },
      { text: '  return construir(paso);' },
      { text: '}' },
      { text: '' },
    ],
  },
}

export const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

export const getCategoryTitles = (doc: TutorialCardDoc): string[] =>
  (doc.categories ?? [])
    .map((category) => (typeof category === 'object' && category ? category.title : null))
    .filter((title): title is string => Boolean(title))

export const getCategoryTitle = (doc: TutorialCardDoc, fallback = 'Tutorial') =>
  getCategoryTitles(doc)[0] || fallback

export const getTechDefinition = (doc: TutorialCardDoc): TechDefinition | null => {
  const titles = getCategoryTitles(doc).map(normalizeText)

  for (const tech of TECH_CATALOG) {
    if (tech.aliases.some((alias) => titles.includes(normalizeText(alias)))) return tech
  }

  return null
}

export const getTechKey = (doc: TutorialCardDoc) => {
  const tech = getTechDefinition(doc)
  if (tech) return tech.key
  return getCategoryTitle(doc)
}

export const getSnippet = (doc: TutorialCardDoc): CodeSnippet => {
  const titles = getCategoryTitles(doc).map(normalizeText)
  const join = titles.join(' ')

  if (join.includes('mobile') || join.includes('react native')) return SNIPPETS.mobile
  if (join.includes('typescript')) return SNIPPETS.typescript
  if (join.includes('react')) return SNIPPETS.react
  if (join.includes('python')) return SNIPPETS.python
  if (join.includes('css') || join.includes('html')) return SNIPPETS.css
  if (join.includes('node') || join.includes('express')) return SNIPPETS.node
  if (join.includes('javascript') || join.includes('js')) return SNIPPETS.javascript

  return SNIPPETS.default
}

export const getTutorialLevel = (doc: TutorialCardDoc): TutorialLevel => {
  const haystack = `${doc.title} ${getCategoryTitles(doc).join(' ')}`

  for (const { level, pattern } of LEVEL_KEYWORDS) {
    if (pattern.test(haystack)) return level
  }

  return 'Inicial'
}

const hashString = (value: string) =>
  Array.from(value).reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) % 997, 7)

export const getReadingMinutes = (doc: TutorialCardDoc): number => {
  const seed = `${doc.slug || ''}${doc.title || ''}`
  return 8 + (hashString(seed) % 13)
}

export const getTimeBucket = (minutes: number): TimeBucket => {
  if (minutes < 10) return 'under10'
  if (minutes <= 20) return '10to20'
  return 'over20'
}

export const TIME_BUCKETS: { value: TimeBucket; label: string }[] = [
  { value: 'under10', label: 'Menos de 10 min' },
  { value: '10to20', label: 'Entre 10 y 20 min' },
  { value: 'over20', label: 'Más de 20 min' },
]

export const TIME_BUCKET_LABELS: Record<TimeBucket, string> = {
  under10: 'Menos de 10 min',
  '10to20': 'Entre 10 y 20 min',
  over20: 'Más de 20 min',
}

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

export const formatShortDate = (value?: string | null): string => {
  if (!value) return ''

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  const day = String(date.getUTCDate()).padStart(2, '0')
  return `${day} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`
}

export const formatFeaturedDate = (value?: string | null): string =>
  formatShortDate(value).toUpperCase()

export const getDescription = (doc: TutorialCardDoc): string => doc.meta?.description || ''

export const getTutorialSlug = (doc: TutorialCardDoc): string => doc.slug || ''
