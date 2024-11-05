/* eslint-disable indent */
// src/plugins/i18n.ts
import arLocale from './arLocale'
import enLocale from './enLocale'
import frLocale from './frLocale'
import { createI18n } from 'vue-i18n'
import { getCookie, setCookie } from '@/utils/cookies'

// Define the messages
const messages: any = {
    en: enLocale,
    ar: arLocale,
    fr: frLocale,
}

const getUserLanguage = () => {
    const supportedLanguages = ['ar', 'en', 'fr'] // Your supported languages
    const userLanguages = navigator.languages || [navigator.language] // Get all preferred languages
    // Try to find an exact match or match the language part (e.g. 'en' from 'en-US')
    const matchedLanguage = userLanguages.find(lang =>
        supportedLanguages.includes(lang.split('-')[0])
    )
    // Return matched language, or fallback to 'en' if no match is found
    return matchedLanguage ? matchedLanguage.split('-')[0] : 'ar'
}

// Create the i18n instance
export const i18n = createI18n({
    locale: getCookie('currentLang') || getUserLanguage(), // set local language if user changed it before will be displayed from the cookie else will be defaulted Arabic
    fallbackLocale: 'en',
    messages,
})

// eslint-disable-next-line space-before-function-paren
export function setLanguage(lang: string) {
    i18n.global.locale = lang || 'en' // Set the locale language to the browser
    setCookie('currentLang', lang, 365) // Save the current language into cookie
}
