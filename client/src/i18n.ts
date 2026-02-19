import { createI18n } from 'vue-i18n'
import en from './locales/en'
import zh from './locales/zh'

const savedLocale = typeof localStorage !== 'undefined'
  ? localStorage.getItem('agentforge-locale') || 'en'
  : 'en'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: { en, zh },
})

export function setLocale(locale: 'en' | 'zh') {
  ;(i18n.global.locale as any).value = locale
  localStorage.setItem('agentforge-locale', locale)
}

export function getLocale(): string {
  return (i18n.global.locale as any).value
}

export default i18n
