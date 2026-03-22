import { useState } from 'react'
import { FolderDown } from 'lucide-react'
import { useTranslations } from '../../../i18n/translations'
import SITSelector from './SITSelector'
import DocumentConfig from './DocumentConfig'
import PreviewPanel from './PreviewPanel'

export type DocumentFormat = 'docx' | 'xlsx' | 'pptx'
export type VariantType = 'A' | 'B'

export default function TestDocuments() {
  const t = useTranslations()

  const [selectedSITs, setSelectedSITs] = useState<string[]>([])
  const [variant, setVariant] = useState<VariantType>('A')
  const [format, setFormat] = useState<DocumentFormat>('docx')

  const toggleSIT = (id: string) => {
    setSelectedSITs(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      if (prev.length >= 5) return prev // Max 5
      return [...prev, id]
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-8 animate-in fade-in">
      
      {/* ── Disclaimer Banner ──────────────────────────────────────────────── */}
      <div 
        className="flex items-start gap-4 px-5 py-4 rounded-xl shadow-sm"
        style={{ 
          backgroundColor: '#eff6ff', // Light blue bg
          borderLeft: '4px solid #3b82f6', // Blue border
        }}
      >
        <p className="font-mono text-sm leading-relaxed" style={{ color: '#1e3a8a' }}>
          {t.tdDisclaimer}
        </p>
      </div>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-2">
          <div 
            className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
            style={{ backgroundColor: 'color-mix(in srgb, var(--accent-primary) 10%, transparent)' }}
          >
            <FolderDown size={20} style={{ color: 'var(--accent-primary)' }} />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
              {t.tdTitle}
            </h1>
            <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
              {t.tdSubtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="h-px bg-transparent border-t border-dashed" style={{ borderColor: 'var(--border-subtle)' }} />

      {/* ── Steps ──────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-12">
        
        {/* Step 1 */}
        <section>
          <SITSelector 
            selectedSITs={selectedSITs} 
            onToggleSIT={toggleSIT} 
          />
        </section>

        {/* Step 2 */}
        <section className={selectedSITs.length === 0 ? 'opacity-50 pointer-events-none transition-opacity' : 'transition-opacity'}>
          <DocumentConfig 
            variant={variant} 
            onVariantChange={setVariant}
            format={format}
            onFormatChange={setFormat}
          />
        </section>

        {/* Step 3 */}
        <section className={selectedSITs.length === 0 ? 'opacity-50 pointer-events-none transition-opacity' : 'transition-opacity'}>
          <PreviewPanel 
            selectedSITs={selectedSITs}
            variant={variant}
            format={format}
          />
        </section>

      </div>
    </div>
  )
}
