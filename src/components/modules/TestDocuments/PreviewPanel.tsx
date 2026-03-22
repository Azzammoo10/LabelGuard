import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'
import { useTranslations } from '../../../i18n/translations'
import { useLanguage } from '../../../contexts/LanguageContext'
import type { DocumentFormat, VariantType } from './index'
import { generateTestDocument } from '../../../utils/documentGenerators/index'

interface PreviewPanelProps {
  selectedSITs: string[]
  variant: VariantType
  format: DocumentFormat
}

export default function PreviewPanel({ selectedSITs, variant, format }: PreviewPanelProps) {
  const t = useTranslations()
  const { language } = useLanguage()
  const [isGenerating, setIsGenerating] = useState(false)

  const occMultiplier = variant === 'A' ? 1 : 10
  const expectedLabel = variant === 'A' ? `🟡 ${t.confidentiel}` : `🔴 ${t.secret}`

  const formatMap: Record<DocumentFormat, string> = {
    docx: 'Word (.docx)',
    xlsx: 'Excel (.xlsx)',
    pptx: 'PowerPoint (.pptx)'
  }

  const handleGenerate = async () => {
    if (selectedSITs.length === 0) return
    setIsGenerating(true)
    try {
      await generateTestDocument(format, selectedSITs, variant, language)
    } catch (e) {
      console.error(e)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h2 className="font-display font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
          {t.tdStep3Title}
        </h2>
      </div>

      <div 
        className="flex flex-col rounded-xl overflow-hidden border"
        style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-surface)' }}
      >
        <div style={{ backgroundColor: 'var(--bg-elevated)' }} className="px-5 py-3 border-b border-[var(--border-subtle)]">
          <span className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
            {t.tdSummaryTitle}
          </span>
        </div>

        <div className="p-5 flex flex-col gap-4 font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
          <div className="grid grid-cols-[120px_1fr] gap-y-2">
            <span className="font-semibold">{t.tdFormatLabel}</span>
            <span style={{ color: 'var(--text-primary)' }}>{formatMap[format]}</span>
            
            <span className="font-semibold">{t.tdLanguageLabel}</span>
            <span style={{ color: 'var(--text-primary)' }}>{language === 'fr' ? 'Français' : 'English'}</span>
            
            <span className="font-semibold">{t.tdVariantLabel}</span>
            <span style={{ color: 'var(--text-primary)' }}>{variant} — {occMultiplier} occ.</span>
            
            <span className="font-semibold">{t.tdExpectedLabel}</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{expectedLabel}</span>
          </div>

          <div className="h-px bg-transparent border-t border-dashed my-2" style={{ borderColor: 'var(--border-subtle)' }} />

          <div className="flex flex-col gap-2">
            <span className="font-semibold mb-1">{t.tdDataIncluded}</span>
            <ul className="flex flex-col gap-1.5 pl-2">
              {selectedSITs.map(sit => (
                <li key={sit} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-primary)' }} />
                  <span style={{ color: 'var(--text-primary)' }}>{sit.toUpperCase()}</span>
                  <span className="opacity-60">— {occMultiplier} occ.</span>
                </li>
              ))}
              {selectedSITs.length === 0 && (
                <li className="opacity-50 italic">Aucun type sélectionné</li>
              )}
            </ul>
          </div>

          <div className="h-px bg-transparent border-t border-dashed my-2" style={{ borderColor: 'var(--border-subtle)' }} />

          <div className="flex items-center justify-between font-bold" style={{ color: 'var(--text-primary)' }}>
            <span>{t.tdTotalOccurrences}</span>
            <span>{selectedSITs.length * occMultiplier}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="font-mono text-[10px] leading-relaxed italic opacity-80" style={{ color: 'var(--text-muted)' }}>
          {t.tdNotice}
        </p>

        <button
          onClick={handleGenerate}
          disabled={selectedSITs.length === 0 || isGenerating}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-display font-bold text-sm transition-opacity focus:outline-none"
          style={{
            backgroundColor: '#CC0000',
            color: 'white',
            opacity: selectedSITs.length === 0 || isGenerating ? 0.6 : 1,
            cursor: selectedSITs.length === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          {isGenerating ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              {t.tdGenerating}
            </>
          ) : (
            <>
              <Download size={16} strokeWidth={2.5} />
              {t.tdGenerateBtn}
            </>
          )}
        </button>
      </div>
    </div>
  )
}
