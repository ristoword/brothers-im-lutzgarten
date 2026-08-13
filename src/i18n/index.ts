import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import de from './locales/de.json'
import it from './locales/it.json'
import en from './locales/en.json'

const saved = typeof window !== 'undefined' ? localStorage.getItem('brothers-lang') : null

i18n.use(initReactI18next).init({
  resources: {
    de: { translation: de },
    it: { translation: it },
    en: { translation: en },
  },
  lng: saved || 'de',
  fallbackLng: 'de',
  interpolation: { escapeValue: false },
})

export default i18n
