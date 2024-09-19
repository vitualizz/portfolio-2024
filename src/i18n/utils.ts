import type { LanguageLocale, LanguagesCodes } from 'src/types/I18n.types';
import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslation<T extends LanguagesCodes>(lang: T) {
  return function t<K extends keyof LanguageLocale>(key: K) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}