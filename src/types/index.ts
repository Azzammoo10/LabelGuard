export type ModuleId = 'about' | 'iban' | 'credit-card' | 'eu-debit-card' | 'swift-code' | 'aba-routing' | 'test-documents'

export type SITVariantType = 'A+' | 'B'

export interface SITRecord {
  id: string
  name: string
  purview_detection: string
}

export interface SITCategory {
  category: string
  sits: SITRecord[]
}

export type ValidationStatus = 'Pending' | 'Passed' | 'Failed'

export interface TestValidation {
  testId: string
  sitId: string
  sitName: string
  occurrences: string
  expectedLabel: 'Confidentiel' | 'Secret'
  status: ValidationStatus
}
