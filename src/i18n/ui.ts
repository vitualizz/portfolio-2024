import type { LanguagesCodes, LanguageLocale } from 'src/types/I18n.types'
import localeEn from './locale/en'
import localeEs from './locale/es'
import { DEFAULT_LANG } from './constants'

export const languages: Record<LanguagesCodes, 'English' | 'Español'> = {
  en: 'English',
  es: 'Español',
}

export const defaultLang = DEFAULT_LANG

export const ui: Record<LanguagesCodes, LanguageLocale> = {
  es: localeEs,
  en: localeEn,
} as const
