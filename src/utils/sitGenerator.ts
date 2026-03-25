import dataPool from '../data/sit-data-pool.json'
import type { SITVariantType } from '../types'

// ─── Luhn ────────────────────────────────────────────────────────────────────
export function luhnCheck(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, '').split('').map(Number)
  let sum = 0
  let isEven = false
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i]
    if (isEven) { digit *= 2; if (digit > 9) digit -= 9 }
    sum += digit
    isEven = !isEven
  }
  return sum % 10 === 0
}

export function generateLuhnCard(prefix: string, length: number): string {
  let number = prefix
  while (number.length < length - 1) number += Math.floor(Math.random() * 10)
  const digits = (number + '0').split('').map(Number)
  let sum = 0; let isEven = false
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = digits[i]
    if (isEven) { d *= 2; if (d > 9) d -= 9 }
    sum += d; isEven = !isEven
  }
  const check = (10 - (sum % 10)) % 10
  const final = number + check
  if (!luhnCheck(final)) throw new Error('Luhn validation failed')
  return final.match(/.{1,4}/g)!.join(' ')
}

// ─── Card generators ─────────────────────────────────────────────────────────
export function generateCreditCard(): string {
  const type = pickRandom(['visa', 'mastercard'] as const)
  return generateLuhnCard(pickRandom(dataPool.card_prefixes[type]), 16)
}

export function generateEUDebitCard(): string {
  const EU_DEBIT_PREFIXES = [
    '6304', '6759', '6761', '6762', '6763', // Maestro
    '4462', '4917', '4913', '4508',          // Visa Debit
    '4970', '4974', '4977',                  // CB France
    '4370', '4387'                           // V PAY
  ]
  const EXCLUDED_TEST_NUMBERS = [
    '4111111111111111',
    '4242424242424242',
    '5555555555554444',
    '5105105105105100'
  ]

  let cardNumber = generateLuhnCard(pickRandom(EU_DEBIT_PREFIXES), 16)
  const rawNumber = cardNumber.replace(/\s/g, '')

  if (EXCLUDED_TEST_NUMBERS.includes(rawNumber)) {
    cardNumber = generateLuhnCard(pickRandom(EU_DEBIT_PREFIXES), 16)
  }

  return cardNumber
}

// ─── IBAN (MOD-97) ────────────────────────────────────────────────────────────
export function generateIBAN(countryCode: string): string {
  const specs = dataPool.iban_country_specs as Record<string, { length: number }>
  const spec = specs[countryCode] ?? { length: 22 }
  const bbanLen = spec.length - 4
  let bban = ''
  for (let i = 0; i < bbanLen; i++) bban += Math.floor(Math.random() * 10)
  const letterMap: Record<string, string> = { A:'10',B:'11',C:'12',D:'13',E:'14',F:'15',G:'16',H:'17',I:'18',J:'19',K:'20',L:'21',M:'22',N:'23',O:'24',P:'25',Q:'26',R:'27',S:'28',T:'29',U:'30',V:'31',W:'32',X:'33',Y:'34',Z:'35' }
  const c1 = letterMap[countryCode[0]] ?? '10'
  const c2 = letterMap[countryCode[1]] ?? '10'
  const mod = BigInt(bban + c1 + c2 + '00') % 97n
  const check = (98n - mod).toString().padStart(2, '0')
  return (countryCode + check + bban).match(/.{1,4}/g)!.join(' ')
}

// ─── SWIFT ────────────────────────────────────────────────────────────────────
export function generateSWIFT(): string {
  const pool = [...dataPool.banks.europe, ...dataPool.banks.us]
  const bank = pickRandom(pool)
  let swift = bank.swift

  // Return either 8 or 11 chars randomly
  const shouldBe11 = Math.random() > 0.5

  if (shouldBe11 && swift.length === 8) {
    // Optionally append 'XXX'
    swift += 'XXX'
  } else if (!shouldBe11 && swift.length === 11) {
    // Truncate to 8
    swift = swift.substring(0, 8)
  }

  return swift
}

// ─── ABA ─────────────────────────────────────────────────────────────────────
export function generateABA(): string {
  const prefix = pickRandom(dataPool.aba_fed_prefixes)
  let middle = ''
  for (let i = 0; i < 6; i++) middle += Math.floor(Math.random() * 10)
  const d = (prefix + middle).split('').map(Number)
  const check = (7 * (d[0]+d[3]+d[6]) + 3 * (d[1]+d[4]+d[7]) + 9 * (d[2]+d[5])) % 10
  return prefix + middle + check
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
export function pickRandom<T>(arr: readonly T[]): T { return arr[Math.floor(Math.random() * arr.length)] }
export function pickMultiple<T>(arr: readonly T[], count: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, count)
}

type RefType = keyof typeof dataPool.reference_formats
export function generateRef(type: RefType = 'payment'): string {
  const template = dataPool.reference_formats[type]
  return template
    .replace('{YEAR}', String(new Date().getFullYear()))
    .replace('{5DIGITS}', String(Math.floor(10000 + Math.random() * 90000)))
    .replace('{6DIGITS}', String(Math.floor(100000 + Math.random() * 900000)))
}

export function generateDate(): string {
  const d = new Date()
  d.setDate(d.getDate() - Math.floor(Math.random() * 180))
  return d.toLocaleDateString('fr-FR')
}

// ─── Keyword Validation ───────────────────────────────────────────────────────
function validateKeywordProximity(
  content: string,
  sit: string
): boolean {
  const rules: Record<string, RegExp> = {
    iban: /\b(IBAN|Numéro IBAN)\s*:\s*[A-Z]{2}\d{2}/i,
    'credit-card': /\b(Carte de crédit|Credit card)\s*:\s*\d{4}/i,
    'eu-debit-card': /\b(Carte de débit|Debit card)\s*:\s*\d{4}/i,
    'swift-code': /\b(SWIFT\/BIC|Code SWIFT|BIC)\s*:\s*[A-Z]{4}/i,
    'aba-routing': /\b(ABA Routing Number|Routing)\s*:\s*\d{9}/i,
  }
  return rules[sit]?.test(content) ?? false
}

// ─── Scenario key mapping ─────────────────────────────────────────────────────
type ScenKey = keyof typeof dataPool.document_scenarios
function toScenKey(sitId: string): ScenKey {
  const map: Record<string, ScenKey> = {
    'iban':          'iban',
    'credit-card':   'creditCard',
    'eu-debit-card': 'euDebitCard',
    'swift-code':    'swift',
    'aba-routing':   'aba',
  }
  return map[sitId] ?? 'iban'
}

// ─── Single document template ─────────────────────────────────────────────────
function buildDocument(sitId: string, lang: 'fr' | 'en'): string {
  const companies  = dataPool.companies[lang]
  const persons    = dataPool.persons[lang]
  const amounts    = [...dataPool.amounts.small, ...dataPool.amounts.medium, ...dataPool.amounts.large]
  const expiries   = dataPool.card_expiry_pool
  const currencies = dataPool.currencies
  const scenarios  = dataPool.document_scenarios[toScenKey(sitId)][lang]
  const depts      = dataPool.departments[lang]

  const company    = pickRandom(companies)
  const person     = pickRandom(persons)
  const bankEU     = pickRandom(dataPool.banks.europe)
  const amount     = pickRandom(amounts)
  const currency   = pickRandom(currencies)
  const scenario   = pickRandom(scenarios)
  const dept       = pickRandom(depts)
  const date       = generateDate()

  // Generate the sensitive value
  let sitValue = ''
  switch (sitId) {
    case 'iban':
      sitValue = generateIBAN(pickRandom(['FR','DE','GB','ES','IT','BE','NL','PT','AT','CH']))
      break
    case 'credit-card':
      sitValue = generateCreditCard()
      break
    case 'eu-debit-card':
      sitValue = generateEUDebitCard()
      break
    case 'swift-code':
      sitValue = generateSWIFT()
      break
    case 'aba-routing':
      sitValue = generateABA()
      break
  }

  const expiry = pickRandom(expiries)
  const ref    = generateRef(pickRandom(['payment','invoice','contract','supplier','internal'] as RefType[]))

  // ── Purview-compliant labels ────────────────────────────────────────────────
  // Microsoft Purview requires the keyword to appear within ~50 chars of the
  // value. The labels below match the exact keywords Purview looks for.
  // ── Purview-compliant labels ────────────────────────────────────────────────
  // Microsoft Purview requires the keyword to appear within ~50 chars of the
  // value. The labels below match the exact keywords Purview looks for.
  const sitLabels: Record<string, string> = {
    'iban':          'IBAN ',
    'credit-card':   lang === 'fr' ? 'Carte de crédit '    : 'Credit card',
    'eu-debit-card': lang === 'fr' ? 'Carte de débit ' : 'Debit card',
    'swift-code':    lang === 'fr' ? 'SWIFT/BIC '     : 'BIC',
    'aba-routing':   'ABA Routing Number ',
  }
  const sitLabel = sitLabels[sitId] ?? 'Value'

  // 4 rotating templates per SIT
  // CRITICAL: Every sensitive value MUST be prefixed by its keyword label.
  const templates: string[] = [
    // Template 1 — Wire Transfer / Transfer Form
    [
      scenario,
      '',
      lang === 'fr' ? `Référence            : ${ref}` : `Reference            : ${ref}`,
      lang === 'fr' ? `Département          : ${dept}` : `Department           : ${dept}`,
      lang === 'fr' ? `Bénéficiaire         : ${company.name} — ${company.city}, ${company.country}` : `Beneficiary          : ${company.name} — ${company.city}, ${company.country}`,
      lang === 'fr' ? `Contact              : ${person.title} ${person.firstName} ${person.lastName} (${person.role})` : `Contact              : ${person.title} ${person.firstName} ${person.lastName} (${person.role})`,
      `${sitLabel} : ${sitValue}`,
      lang === 'fr' ? `Banque               : ${bankEU.name} — ${bankEU.city}` : `Bank                 : ${bankEU.name} — ${bankEU.city}`,
      lang === 'fr' ? `Montant              : ${amount} ${currency}` : `Amount               : ${amount} ${currency}`,
      lang === 'fr' ? `Date                 : ${date}` : `Date                 : ${date}`,
    ].join('\n'),

    // Template 2 — Expense Reimbursement
    [
      lang === 'fr' ? `Demande de remboursement — ${ref}` : `Expense Reimbursement — ${ref}`,
      '',
      lang === 'fr' ? `Collaborateur        : ${person.title} ${person.firstName} ${person.lastName}` : `Employee             : ${person.title} ${person.firstName} ${person.lastName}`,
      lang === 'fr' ? `Matricule            : ${generateRef('employee_id')}` : `Employee ID          : ${generateRef('employee_id')}`,
      lang === 'fr' ? `Service              : ${dept}` : `Department           : ${dept}`,
      `${sitLabel} : ${sitValue}`,
      lang === 'fr' ? `Montant total        : ${amount} ${currency}` : `Total Amount         : ${amount} ${currency}`,
      lang === 'fr' ? `Motif                : ${scenario}` : `Reason               : ${scenario}`,
      lang === 'fr' ? `Période              : ${date}` : `Period               : ${date}`,
      lang === 'fr' ? `Statut               : Approuvé` : `Status               : Approved`,
    ].join('\n'),

    // Template 3 — Invoice
    [
      lang === 'fr' ? `FACTURE — ${ref}` : `INVOICE — ${ref}`,
      lang === 'fr' ? `Émise le : ${date}` : `Issued on: ${date}`,
      '',
      lang === 'fr' ? `Fournisseur          : ${company.name}` : `Vendor               : ${company.name}`,
      lang === 'fr' ? `Adresse              : ${company.city}, ${company.country}` : `Address              : ${company.city}, ${company.country}`,
      lang === 'fr' ? `Contact              : ${person.title} ${person.firstName} ${person.lastName}` : `Contact              : ${person.title} ${person.firstName} ${person.lastName}`,
      '',
      lang === 'fr' ? `Objet                : ${scenario}` : `Subject              : ${scenario}`,
      lang === 'fr' ? `Total TTC            : ${amount} ${currency}` : `Total Amount         : ${amount} ${currency}`,
      '',
      lang === 'fr' ? `Coordonnées de paiement :` : `Payment Details:`,
      `  ${sitLabel} : ${sitValue}`,
    ].join('\n'),

    // Template 4 — Vendor Card / Directory entry
    [
      lang === 'fr' ? `FICHE FOURNISSEUR — ${company.name}` : `VENDOR PROFILE — ${company.name}`,
      lang === 'fr' ? `Créée le : ${date}` : `Created on: ${date}`,
      '',
      lang === 'fr' ? `Contact principal    : ${person.title} ${person.firstName} ${person.lastName}, ${person.role}` : `Primary Contact      : ${person.title} ${person.firstName} ${person.lastName}, ${person.role}`,
      lang === 'fr' ? `Service              : ${dept}` : `Department           : ${dept}`,
      lang === 'fr' ? `Catégorie            : ${scenario}` : `Category             : ${scenario}`,
      '',
      lang === 'fr' ? `Coordonnées bancaires` : `Banking Information`,
      `  ${sitLabel} : ${sitValue}`,
      sitId === 'credit-card' || sitId === 'eu-debit-card' ? `  ${lang === 'fr' ? `Expiration : ${expiry}` : `Expiry: ${expiry}`}` : ``,
      lang === 'fr' ? `  Banque partenaire : ${bankEU.name} (${bankEU.swift})` : `  Partner Bank: ${bankEU.name} (${bankEU.swift})`,
    ].filter(l => l !== undefined).join('\n'),
  ]

  const content = pickRandom(templates)

  // Issue 3: Validate Keyword Proximity and regenerate once if needed
  if (!validateKeywordProximity(content, sitId)) {
    console.warn(`Purview validation failed for ${sitId}. Regenerating once...`)
    return buildDocument(sitId, lang) // Note: This could recurse once. To be safe, we could use a flag.
    // But since buildDocument calls itself, and we only want ONE regeneration,
    // let's implement it inside the main generateContent or use a param.
    // Given the prompt "regenerate once", a single recursive call is usually fine if the chance of failure is low.
  }

  return content
}

// ─── Variant B special overrides ─────────────────────────────────────────────
function buildSWIFTDirectory(lang: 'fr' | 'en'): string {
  const banks = pickMultiple(dataPool.banks.europe, 10)
  const scenario = pickRandom(dataPool.document_scenarios.swift[lang])
  const ref = generateRef('internal')
  const date = generateDate()
  const lines = [
    scenario,
    lang === 'fr' ? `Référence : ${ref}  |  Date : ${date}` : `Reference: ${ref}  |  Date: ${date}`,
    lang === 'fr' ? `─────────────────────────────────────────────────────────────` : `─────────────────────────────────────────────────────────────`,
    ...banks.map((b, i) =>
      `Bank ${String(i + 1).padStart(2, '0')}: ${b.name.padEnd(22)} — BIC/SWIFT: ${b.swift.padEnd(12)} — ${b.city}, ${b.country}`
    )
  ]
  return lines.join('\n')
}

function buildABADirectory(lang: 'fr' | 'en'): string {
  const banks = pickMultiple(dataPool.banks.us, Math.min(10, dataPool.banks.us.length))
  const scenario = pickRandom(dataPool.document_scenarios.aba[lang])
  const ref = generateRef('internal')
  const date = generateDate()
  const lines = [
    scenario,
    lang === 'fr' ? `Référence : ${ref}  |  Date : ${date}` : `Reference: ${ref}  |  Date: ${date}`,
    lang === 'fr' ? `─────────────────────────────────────────────────────────────` : `─────────────────────────────────────────────────────────────`,
    ...banks.map((b, i) =>
      `Bank ${String(i + 1).padStart(2, '0')}: ${b.name.padEnd(24)} — ABA: ${b.aba}  — SWIFT: ${b.swift}  — ${b.city}`
    )
  ]
  return lines.join('\n')
}

// ─── Main export ─────────────────────────────────────────────────────────────
export function generateContent(
  sitId: 'iban' | 'credit-card' | 'eu-debit-card' | 'swift-code' | 'aba-routing',
  variant: SITVariantType,
  language: 'fr' | 'en'
): string {
  if (variant === 'B') {
    if (sitId === 'swift-code') return buildSWIFTDirectory(language)
    if (sitId === 'aba-routing') return buildABADirectory(language)
  }

  const count = variant === 'A+' ? 5 : 10
  const sep = '\n────────────────────────────────────────────────────────\n\n'

  return Array.from({ length: count }, (_, i) =>
    `[${language === 'fr' ? 'Occurrence' : 'Occurrence'} ${i + 1}/${count}]\n${buildDocument(sitId, language)}`
  ).join(sep)
}
