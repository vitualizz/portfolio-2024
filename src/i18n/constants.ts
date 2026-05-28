import type { LanguagesCodes } from 'src/types/I18n.types'

export const LANG_CODES = ['es', 'en'] as const
export const DEFAULT_LANG: LanguagesCodes = 'es'

export const LANG_ROUTE: Record<LanguagesCodes, `/${LanguagesCodes}`> = {
  es: '/es',
  en: '/en'
}

export const SECTION_IDS = {
  top: 'top',
  about: 'about',
  ai: 'ai',
  projects: 'projects',
  xp: 'xp',
  blog: 'blog',
  contact: 'contact'
} as const

export const CV_PATH_BY_LANG: Record<LanguagesCodes, string> = {
  // es: '/cv/es.pdf',
  // en: '/cv/en.pdf',
  es: '/cv/cv_text.pdf',
  en: '/cv/cv_text.pdf'
}

export const BLOG_DATE_LOCALE: Record<LanguagesCodes, string> = {
  es: 'es-PE',
  en: 'en-US'
}

export function withLangPath(lang: LanguagesCodes, hashOrPath = ''): string {
  const base = LANG_ROUTE[lang]
  if (!hashOrPath) return base
  if (hashOrPath.startsWith('/')) return `${base}${hashOrPath}`
  if (hashOrPath.startsWith('#')) return `${base}/${hashOrPath}`
  return `${base}/${hashOrPath}`
}
