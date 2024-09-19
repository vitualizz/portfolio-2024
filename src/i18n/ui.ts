import type { LanguagesCodes, LanguageLocale } from 'src/types/I18n.types'
import localeEn from './locale/en'
import localeEs from './locale/es'

export const languages: Record<LanguagesCodes, 'English' | 'Español'> = {
  en: 'English',
  es: 'Español',
}

export const defaultLang = 'en'

export const ui: Record<LanguagesCodes, LanguageLocale> = {
  es: localeEs,
  en: localeEn,
} as const
