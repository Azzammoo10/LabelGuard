import { Info, CreditCard, Landmark, Globe, Building, FolderDown } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ModuleId } from '../types/index'

export interface NavItem {
  id: ModuleId
  label: string
  description: string
  icon: LucideIcon
  locked: boolean
  preview?: boolean
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'iban',
    label: 'IBAN',
    description: 'International Banking',
    icon: Landmark,
    locked: false,
  },
  {
    id: 'credit-card',
    label: 'Credit Card',
    description: 'Worldwide detection',
    icon: CreditCard,
    locked: false,
  },
  {
    id: 'eu-debit-card',
    label: 'EU Debit Card',
    description: 'European debit',
    icon: CreditCard,
    locked: false,
  },
  {
    id: 'swift-code',
    label: 'SWIFT Code',
    description: 'Bank communication',
    icon: Globe,
    locked: false,
  },
  {
    id: 'aba-routing',
    label: 'ABA Routing Number',
    description: 'US bank routing',
    icon: Building,
    locked: false,
  },
  {
    id: 'test-documents',
    label: 'Test Documents',
    description: 'File generator',
    icon: FolderDown,
    locked: false,
  },
  {
    id: 'about',
    label: 'About',
    description: 'Platform info & owner',
    icon: Info,
    locked: false,
  },
]
