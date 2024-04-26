import localeEn from './locale/en'
import localeEs from './locale/es'

export type LanguagesCodes = 'en' | 'es'

export const languages: Record<LanguagesCodes, 'English' | 'Español'> = {
  en: 'English',
  es: 'Español',
}

export const defaultLang = 'en'

export type LanguageLocale = {
  nav: {
    presentation: string
    about_me: string
    projects: string
    contact_me: string
  },
  presentation: {
    description: string
  }
}
export const ui: Record<LanguagesCodes, LanguageLocale> = {
  es: localeEs,
  en: localeEn,
} as const
