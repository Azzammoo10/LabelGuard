import { FileText, Table2, Presentation, Globe2, type LucideIcon } from 'lucide-react'
import { useTranslations } from '../../../i18n/translations'
import { useLanguage } from '../../../hooks/useLanguage'
import type { DocumentFormat, VariantType } from './index'

interface DocumentConfigProps {
  variant: VariantType
  onVariantChange: (v: VariantType) => void
  format: DocumentFormat
  onFormatChange: (f: DocumentFormat) => void
}

export default function DocumentConfig({ variant, onVariantChange, format, onFormatChange }: DocumentConfigProps) {
  const t = useTranslations()
  const { language } = useLanguage()

  const formatOptions: { id: DocumentFormat; icon: LucideIcon; title: string; subtitle: string }[] = [
    { id: 'docx', icon: FileText,   title: 'DOCX', subtitle: 'Word' },
    { id: 'xlsx', icon: Table2,     title: 'XLSX', subtitle: 'Excel' },
    { id: 'pptx', icon: Presentation, title: 'PPTX', subtitle: 'PowerPoint' },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h2 className="font-display font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
          {t.tdStep2Title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Variant Column */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
            {t.tdOccurrences}
          </span>
          <div className="flex flex-col gap-2">
            {(['A', 'B'] as VariantType[]).map(v => {
              const isSelected = variant === v
              const label = v === 'A' ? t.tdVariantA : t.tdVariantB
              return (
                <button
                  key={v}
                  onClick={() => onVariantChange(v)}
                  className="flex items-center gap-3 p-3 rounded-lg border-2 transition-all focus:outline-none text-left"
                  style={{
                    borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-subtle)',
                    backgroundColor: isSelected ? 'color-mix(in srgb, var(--accent-primary) 5%, transparent)' : 'var(--bg-surface)'
                  }}
                >
                  <div 
                    className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors"
                    style={{
                      border: isSelected ? '4px solid var(--accent-primary)' : '2px solid var(--border-default)',
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-sm" style={{ color: isSelected ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                      Variant {v}
                    </span>
                    <span className="font-mono text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                      {label}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Format & Language Column */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
              {t.tdFormat}
            </span>
            <div className="grid grid-cols-3 gap-2">
              {formatOptions.map(opt => {
                const isSelected = format === opt.id
                const Icon = opt.icon
                return (
                  <button
                    key={opt.id}
                    onClick={() => onFormatChange(opt.id)}
                    className="flex flex-col items-center justify-center gap-2 py-4 rounded-lg border-2 transition-all focus:outline-none"
                    style={{
                      borderColor: isSelected ? '#CC0000' : 'var(--border-subtle)',
                      backgroundColor: isSelected ? '#FFF5F5' : 'var(--bg-surface)',
                      color: isSelected ? '#CC0000' : 'var(--text-secondary)'
                    }}
                  >
                    <Icon size={24} strokeWidth={1.5} />
                    <div className="flex flex-col items-center text-center">
                      <span className="font-display font-bold text-sm leading-tight inline-block">
                        {opt.title}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-wide opacity-80 mt-1 inline-block">
                        {opt.subtitle}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
              {t.tdLanguage}
            </span>
            <div 
              className="flex items-center gap-3 p-3 rounded-lg border border-dashed"
              style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-elevated)' }}
            >
              <Globe2 size={16} style={{ color: 'var(--text-muted)' }} />
              <div className="flex justify-between w-full items-center">
                <span className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                  {language === 'fr' ? 'FR — Français' : 'EN — English'}
                </span>
                <span className="font-mono text-[10px]" style={{ color: 'var(--text-muted)' }}>
                  {t.tdLanguageSynced}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
