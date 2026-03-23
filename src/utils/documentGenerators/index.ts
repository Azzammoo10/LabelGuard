import dataPool from '../../data/sit-data-pool.json'
import {
  generateIBAN,
  generateCreditCard,
  generateEUDebitCard,
  generateSWIFT,
  generateABA,
  pickRandom,
  generateRef,
  generateDate
} from '../sitGenerator'
import type { DocumentFormat, VariantType } from '../../components/modules/TestDocuments/index'
import { generateWordDoc } from './generateWordDoc'
import { generateExcelDoc } from './generateExcelDoc'
import { generatePPTDoc } from './generatePPTDoc'

export interface BankInfo {
  name: string
  country?: string
  swift?: string
  city?: string
  aba?: string
}

export interface CompanyInfo { name: string; city: string; country: string }
export interface PersonInfo { firstName: string; lastName: string; title: string; role: string }

export interface IbanData { index: number; beneficiary: string; bank: BankInfo; iban: string; swift: string; amount: string; currency: string; reference: string }
export interface CreditCardData { index: number; cardholder: string; cardNumber: string; type: string; expiry: string; amount: string; date: string }
export interface DebitCardData { index: number; holder: string; department: string; cardNumber: string; expiry: string; limit: string }
export interface SwiftData { index: number; bank: BankInfo; swift: string; country: string; city: string }
export interface AbaData { index: number; bank: BankInfo; aba: string; swift: string; city: string }

export interface GeneratedData {
  iban?: IbanData[]
  'credit-card'?: CreditCardData[]
  'eu-debit-card'?: DebitCardData[]
  'swift-code'?: SwiftData[]
  'aba-routing'?: AbaData[]
}

const DEPARTMENTS = {
  fr: ['Ressources Humaines', 'Direction Financière', 'Achats & Moyens Généraux', 'IT & Systèmes', 'Marketing et Communication'],
  en: ['Human Resources', 'Finance Department', 'Procurement & General Affairs', 'IT & Systems', 'Marketing and Communication']
}

function buildDataArrays(selectedSITs: string[], occurrences: number, language: 'fr' | 'en'): GeneratedData {
  const result: GeneratedData = {}
  
  const companies = (dataPool.companies[language as keyof typeof dataPool.companies] || dataPool.companies.en) as CompanyInfo[]
  const persons = (dataPool.persons[language as keyof typeof dataPool.persons] || dataPool.persons.fr) as PersonInfo[]
  const bEurope = dataPool.banks.europe as BankInfo[]
  const bUs = dataPool.banks.us as BankInfo[]
  const amountsMed: string[] = dataPool.amounts.medium || ['12 500,00']
  const amountsSmall: string[] = dataPool.amounts.small || ['1 200,00']
  const depts: string[] = DEPARTMENTS[language]

  // IBAN
  if (selectedSITs.includes('iban')) {
    result['iban'] = Array.from({ length: occurrences }, (_, i) => {
      const b = pickRandom(bEurope) as BankInfo
      const c = pickRandom(companies) as CompanyInfo
      return {
        index: i + 1,
        beneficiary: c.name,
        bank: b,
        iban: generateIBAN(pickRandom(['FR', 'DE', 'GB', 'ES', 'IT'])),
        swift: b.swift || 'N/A',
        amount: pickRandom(amountsMed),
        currency: 'EUR',
        reference: generateRef('payment')
      }
    })
  }

  // Credit Card
  if (selectedSITs.includes('credit-card')) {
    result['credit-card'] = Array.from({ length: occurrences }, (_, i) => {
      const p = pickRandom(persons) as PersonInfo
      return {
        index: i + 1,
        cardholder: `${p.firstName} ${p.lastName}`,
        cardNumber: generateCreditCard(),
        type: 'Visa/Mastercard',
        expiry: `12/${(new Date().getFullYear() + 2).toString().slice(-2)}`,
        amount: pickRandom(amountsSmall),
        date: generateDate()
      }
    })
  }

  // EU Debit Card
  if (selectedSITs.includes('eu-debit-card')) {
    result['eu-debit-card'] = Array.from({ length: occurrences }, (_, i) => {
      const p = pickRandom(persons) as PersonInfo
      return {
        index: i + 1,
        holder: `${p.firstName} ${p.lastName}`,
        department: pickRandom(depts),
        cardNumber: generateEUDebitCard(),
        expiry: `08/${(new Date().getFullYear() + 1).toString().slice(-2)}`,
        limit: pickRandom(amountsSmall)
      }
    })
  }

  // SWIFT
  if (selectedSITs.includes('swift-code')) {
    result['swift-code'] = Array.from({ length: occurrences }, (_, i) => {
      const b = pickRandom(bEurope) as BankInfo
      return {
        index: i + 1,
        bank: b,
        swift: generateSWIFT(),
        country: b.country || 'N/A',
        city: b.city || 'N/A'
      }
    })
  }

  // ABA
  if (selectedSITs.includes('aba-routing')) {
    result['aba-routing'] = Array.from({ length: occurrences }, (_, i) => {
      const b = pickRandom(bUs) as BankInfo
      return {
        index: i + 1,
        bank: b,
        aba: generateABA(),
        swift: b.swift || 'N/A',
        city: b.city || 'N/A'
      }
    })
  }

  return result
}

export async function generateTestDocument(
  format: DocumentFormat,
  selectedSITs: string[],
  variant: VariantType,
  language: 'fr' | 'en'
): Promise<void> {
  const occurrences = variant === 'A' ? 1 : 10
  
  // Generate ALL data first
  const dataArrays = buildDataArrays(selectedSITs, occurrences, language)
  
  // Pass to correct generator
  switch(format) {
    case 'docx': 
      return generateWordDoc(selectedSITs, dataArrays, language, variant)
    case 'xlsx': 
      return generateExcelDoc(selectedSITs, dataArrays, language, variant)
    case 'pptx': 
      return generatePPTDoc(selectedSITs, dataArrays, language, variant)
  }
}
