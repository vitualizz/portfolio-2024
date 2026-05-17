import type { LanguageLocale, LanguagesCodes } from 'src/types/I18n.types'
import { ui, defaultLang } from './ui'
import { LANG_CODES } from './constants'

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/')
  if (LANG_CODES.includes(lang as LanguagesCodes))
    return lang as keyof typeof ui
  return defaultLang
}

export function useTranslation<T extends LanguagesCodes>(lang: T) {
  return function t<K extends keyof LanguageLocale>(key: K) {
    return ui[lang][key] || ui[defaultLang][key]
  }
}
