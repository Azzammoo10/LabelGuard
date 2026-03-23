import { useState, type FC, type ReactNode } from 'react'
import { LanguageContext, type Language } from './LanguageContext'

export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('axa-dlp-lang')
    return (saved === 'fr' || saved === 'en') ? saved : 'fr'
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('axa-dlp-lang', lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
