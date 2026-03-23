import { createContext } from 'react'
 
export type Language = 'fr' | 'en'
 
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}
 
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)
