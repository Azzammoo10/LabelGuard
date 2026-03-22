import type { SITCategory } from '../types'

export const FINANCIAL_SITS: SITCategory[] = [
  {
    category: 'Financial',
    sits: [
      {
        id: 'iban',
        name: 'International Banking Account Number (IBAN)',
        purview_detection: 'Primary: IBAN regex + checksum'
      },
      {
        id: 'credit-card',
        name: 'Credit Card Number',
        purview_detection: 'Primary: Major card networks (Luhn check)'
      },
      {
        id: 'eu-debit-card',
        name: 'EU Debit Card Number',
        purview_detection: 'Primary: European debit networks (Luhn check)'
      },
      {
        id: 'swift-code',
        name: 'SWIFT Code',
        purview_detection: 'Primary: 8 or 11 characters, bank/country/loc rules'
      },
      {
        id: 'aba-routing',
        name: 'ABA Routing Number',
        purview_detection: 'Primary: 9 digits, specific prefix ranges + checksum'
      }
    ]
  }
]
