import { Check } from 'lucide-react'
import { useTranslations } from '../../../i18n/translations'

interface SITCard {
  id: string
  label: string
  descKey: keyof ReturnType<typeof useTranslations>
}

const AVAILABLE_SITS: SITCard[] = [
  { id: 'iban', label: 'IBAN', descKey: 'tdCardIBANDesc' },
  { id: 'credit-card', label: 'Credit Card', descKey: 'tdCardCCDesc' },
  { id: 'eu-debit-card', label: 'EU Debit Card', descKey: 'tdCardDebitDesc' },
  { id: 'swift-code', label: 'SWIFT Code', descKey: 'tdCardSWIFTDesc' },
  { id: 'aba-routing', label: 'ABA Routing', descKey: 'tdCardABADesc' },
]

interface SITSelectorProps {
  selectedSITs: string[]
  onToggleSIT: (id: string) => void
}

export default function SITSelector({ selectedSITs, onToggleSIT }: SITSelectorProps) {
  const t = useTranslations()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <h2 className="font-display font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
          {t.tdStep1Title}
        </h2>
        <div className="flex items-center justify-between">
          <p className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
            {t.tdStep1Subtitle}
          </p>
          <span 
            className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded"
            style={{ 
              backgroundColor: 'var(--bg-elevated)', 
              color: selectedSITs.length > 0 ? 'var(--accent-primary)' : 'var(--text-muted)' 
            }}
          >
            {t.tdSelectedCount(selectedSITs.length)} / 5
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {AVAILABLE_SITS.map(sit => {
          const isSelected = selectedSITs.includes(sit.id)
          const desc = t[sit.descKey] as string

          return (
            <button
              key={sit.id}
              onClick={() => onToggleSIT(sit.id)}
              className="flex items-start gap-3 p-4 rounded-xl border-2 transition-all text-left relative focus:outline-none"
              style={{
                borderColor: isSelected ? '#CC0000' : 'var(--border-subtle)',
                backgroundColor: isSelected ? '#FFF5F5' : 'var(--bg-surface)',
              }}
            >
              {/* Custom checkbox */}
              <div 
                className="w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 transition-colors"
                style={{
                  border: isSelected ? 'none' : '2px solid var(--border-default)',
                  backgroundColor: isSelected ? '#CC0000' : 'transparent'
                }}
              >
                {isSelected && <Check size={12} color="white" strokeWidth={3} />}
              </div>

              <div className="flex flex-col min-w-0">
                <span 
                  className="font-display font-bold text-sm truncate"
                  style={{ color: isSelected ? '#CC0000' : 'var(--text-primary)' }}
                >
                  {sit.label}
                </span>
                <span className="font-mono text-[10px] mt-1 line-clamp-2" style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {desc}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
