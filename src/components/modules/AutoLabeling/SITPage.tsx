import { useState, useEffect, useCallback } from 'react'
import { Copy, CheckCircle2, Loader2, ShieldAlert, Info, RefreshCw, FileDown } from 'lucide-react'
import { FINANCIAL_SITS } from '../../../data/financial-sits'
import { generateContent } from '../../../utils/sitGenerator'
import { exportSITReport } from '../../../utils/exportReport'
import { useLanguage } from '../../../hooks/useLanguage'
import { useTranslations } from '../../../i18n/translations'
import type { SITVariantType, ValidationStatus } from '../../../types'

interface SITPageProps {
  sitId: string
}

// Purview detection metadata per SIT
const PURVIEW_META: Record<string, { detection: { fr: string; en: string }; confidence: 'Élevé' | 'Moyen' }> = {
  'iban':          { detection: { fr: 'IBAN pour 68 pays', en: 'IBAN for 68 countries' },           confidence: 'Élevé' },
  'credit-card':   { detection: { fr: 'Cartes — réseau mondial', en: 'Cards — worldwide networks' }, confidence: 'Élevé' },
  'eu-debit-card': { detection: { fr: 'Cartes débit européennes', en: 'European debit cards' },      confidence: 'Élevé' },
  'swift-code':    { detection: { fr: 'Codes BIC bancaires', en: 'Banking BIC codes' },              confidence: 'Moyen' },
  'aba-routing':   { detection: { fr: 'Routing bancaire US', en: 'US bank routing numbers' },        confidence: 'Moyen' },
}

const TEST_ID_MAP: Record<string, Record<string, string>> = {
  'iban':          { A: 'F-IBAN-A', B: 'F-IBAN-B'  },
  'credit-card':   { A: 'F-CC-A',   B: 'F-CC-B'    },
  'eu-debit-card': { A: 'F-DC-A',   B: 'F-DC-B'    },
  'swift-code':    { A: 'F-SW-A',   B: 'F-SW-B'    },
  'aba-routing':   { A: 'F-ABA-A',  B: 'F-ABA-B'   },
}

export default function SITPage({ sitId }: SITPageProps) {
  const t = useTranslations()
  const { language } = useLanguage()
  const sit = FINANCIAL_SITS[0].sits.find(s => s.id === sitId)
  const meta = PURVIEW_META[sitId]

  const [variantType, setVariantType] = useState<SITVariantType>('A')
  const [content, setContent] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [saved, setSaved] = useState(false)

  const testId = TEST_ID_MAP[sitId]?.[variantType] ?? `sit-${sitId}-${variantType}`
  const storageKey = `sit-result-${testId}`

  // React-idiomatic "store previous value" pattern — reset when key changes during render
  const readStoredStatus = (): ValidationStatus => {
    const raw = localStorage.getItem(storageKey)
    const parsed = raw ? JSON.parse(raw) : null
    return parsed?.status && ['Pending', 'Passed', 'Failed'].includes(parsed.status)
      ? (parsed.status as ValidationStatus)
      : 'Pending'
  }

  const [status, setStatus] = useState<ValidationStatus>(readStoredStatus)
  const [activeKey, setActiveKey] = useState(storageKey)

  if (activeKey !== storageKey) {
    setActiveKey(storageKey)
    setStatus(readStoredStatus())
    setContent(null)
  }

  const isA = variantType === 'A'
  const detectionText = language === 'fr' ? meta?.detection.fr : meta?.detection.en
  const confidenceText = language === 'fr'
    ? (meta?.confidence ?? 'Élevé')
    : (meta?.confidence === 'Élevé' ? 'High' : 'Medium')

  // ── Auto-generate ─────────────────────────────────────────────────────────────
  const handleGenerate = useCallback(() => {
    setIsGenerating(true)
    setTimeout(() => {
      const result = generateContent(sitId as Parameters<typeof generateContent>[0], variantType, language)
      setContent(result)
      setIsGenerating(false)
    }, 400)
  }, [sitId, variantType, language])

  // Auto-load on mount and whenever sitId / variant / language changes
  useEffect(() => {
    setContent(null)
    handleGenerate()
  }, [sitId, variantType, language]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Handlers ──────────────────────────────────────────────────────────────────
  const handleStatusChange = (newStatus: ValidationStatus) => {
    setStatus(newStatus)
    const today = new Date().toLocaleDateString('fr-FR')
    localStorage.setItem(storageKey, JSON.stringify({
      status: newStatus,
      date: newStatus === 'Pending' ? null : today,
      variant: variantType,
      sitId,
    }))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleCopy = async () => {
    if (!content) return
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadReport = async () => {
    setIsDownloading(true)
    try {
      await exportSITReport(sitId, sit?.name ?? sitId, detectionText ?? '', confidenceText, language)
    } finally {
      setIsDownloading(false)
    }
  }

  if (!sit) return <div className="p-6">SIT not found</div>

  const isConfidentiel = isA

  // ── Segmented status config (no emojis) ───────────────────────────────────────
  type StatusDef = {
    label: string
    defaultBg: string
    defaultText: string
    defaultBorder: string
    activeBg: string
    activeText: string
    activeBorder: string
    accentBar: string
  }
  const statusDefs: Record<ValidationStatus, StatusDef> = {
    Pending: {
      label: t.pending.toUpperCase(),
      defaultBg:     '#F5F5F5', defaultText:     '#666666', defaultBorder: '1px solid #E0E0E0',
      activeBg:      '#F5F5F5', activeText:      '#374151', activeBorder:  '2px solid #374151',
      accentBar:     '#374151',
    },
    Passed: {
      label: t.passed.toUpperCase(),
      defaultBg:     '#F5F5F5', defaultText:     '#666666', defaultBorder: '1px solid #E0E0E0',
      activeBg:      '#F0FDF4', activeText:      '#166534', activeBorder:  '2px solid #166534',
      accentBar:     '#166534',
    },
    Failed: {
      label: t.failed.toUpperCase(),
      defaultBg:     '#F5F5F5', defaultText:     '#666666', defaultBorder: '1px solid #E0E0E0',
      activeBg:      '#FEF2F2', activeText:      '#991B1B', activeBorder:  '2px solid #991B1B',
      accentBar:     '#991B1B',
    },
  }

  const variantTabs: { id: SITVariantType; label: string; occ: string; expectedLabel: string }[] = [
    { id: 'A', label: t.variantA, occ: t.variantAOcc, expectedLabel: t.variantALabel },
    { id: 'B', label: t.variantB, occ: t.variantBOcc, expectedLabel: t.variantBLabel },
  ]

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col gap-6">

      {/* ── Page Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 mb-3">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
            style={{ backgroundColor: 'color-mix(in srgb, var(--accent-primary) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--accent-primary) 20%, transparent)' }}
          >
            <ShieldAlert size={15} style={{ color: 'var(--accent-primary)' }} />
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>
            {t.autoLabelingTest}
          </span>
        </div>

        <h1 className="font-display font-bold text-2xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
          {sit.name}
        </h1>

        <div className="h-px my-2" style={{ backgroundColor: 'var(--border-subtle)' }} />

        {/* Purview detection line */}
        {meta && (
          <p className="font-mono text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{t.purviewDetection} :</span>{' '}
            {detectionText}
            {'  ·  '}
            <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{t.confidence} :</span>{' '}
            {confidenceText}
          </p>
        )}
      </div>

      {/* ── Variant Tabs ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3">
        {variantTabs.map(({ id, label, occ, expectedLabel }) => {
          const isActive = variantType === id
          return (
            <button
              key={id}
              onClick={() => setVariantType(id)}
              className="flex flex-col items-start gap-1 px-4 py-3 rounded-xl border-2 transition-all text-left"
              style={{
                borderColor: isActive ? 'var(--accent-primary)' : 'var(--border-subtle)',
                backgroundColor: isActive ? 'color-mix(in srgb, var(--accent-primary) 5%, transparent)' : 'var(--bg-surface)',
              }}
            >
              <span
                className="font-display font-bold text-sm"
                style={{ color: isActive ? 'var(--accent-primary)' : 'var(--text-primary)' }}
              >
                {label}
              </span>
              <span className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
                {occ}
              </span>
              <span
                className="font-mono text-xs font-semibold"
                style={{ color: id === 'A' ? '#B45309' : '#991B1B' }}
              >
                {expectedLabel}
              </span>
            </button>
          )
        })}
      </div>

      {/* ── Content Area ──────────────────────────────────────────────────────── */}
      {isGenerating || !content ? (
        /* Loading state */
        <div
          className="flex flex-col items-center justify-center gap-3 py-12 px-6 rounded-xl border"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', borderStyle: 'dashed' }}
        >
          <Loader2 size={20} className="animate-spin" style={{ color: 'var(--accent-primary)' }} />
          <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
            {t.generating}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 animate-in fade-in">

          {/* Regenerate + Label row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Expected Label pill */}
            <span
              className="font-mono text-xs font-semibold px-3 py-1 rounded-full border"
              style={{
                borderColor: isConfidentiel ? '#B45309' : '#991B1B',
                color: isConfidentiel ? '#B45309' : '#991B1B',
                backgroundColor: 'transparent',
              }}
            >
              {t.expectedLabel} : {isConfidentiel ? t.confidentiel : t.secret} — {isConfidentiel ? t.variantADesc : t.variantBDesc}
            </span>
          </div>

          {/* Info banner */}
          <div
            className="flex items-start gap-2 px-4 py-3 rounded-lg"
            style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}
          >
            <Info size={13} style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: '1px' }} />
            <p className="font-mono text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t.instruction}
            </p>
          </div>

          {/* Regenerate Button */}
          <div className="flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-medium border transition-colors disabled:opacity-50"
              style={{
                backgroundColor: 'transparent',
                borderColor: 'var(--border-default)',
                color: 'var(--text-secondary)',
              }}
            >
              <RefreshCw size={12} />
              {t.generateNewDoc}
            </button>
          </div>

          {/* Content block */}
          <div className="relative group">
            <pre
              className="p-5 rounded-xl font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-primary)',
              }}
            >
              {content}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 px-3 py-1.5 rounded-md text-xs font-mono flex items-center gap-1.5 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100 focus:outline-none"
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                color: copied ? 'var(--status-success)' : 'var(--text-secondary)',
              }}
            >
              {copied ? <CheckCircle2 size={12} /> : <Copy size={12} />}
              {copied ? t.copied : t.copyBtn}
            </button>
          </div>



          {/* ── Result Tracker ────────────────────────────────────────────── */}
          <div
            className="flex flex-col gap-4 rounded-xl p-4"
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {/* Header row */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span
                  className="font-display font-semibold text-sm"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {language === 'fr' ? 'Résultat du test' : 'Test Result'}
                </span>
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.12em]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {language === 'fr' ? 'Identifiant' : 'Test ID'} ·{' '}
                  <span
                    className="px-1.5 py-0.5 rounded font-bold"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--accent-primary) 10%, transparent)',
                      color: 'var(--accent-primary)',
                    }}
                  >
                    {testId}
                  </span>
                </span>
              </div>

              {/* Result saved indicator */}
              <div
                className="flex items-center gap-1.5 transition-all duration-300"
                style={{ opacity: saved ? 1 : 0, transform: saved ? 'translateY(0)' : 'translateY(4px)' }}
              >
                <CheckCircle2 size={12} style={{ color: '#166534' }} />
                <span className="font-mono text-[10px] font-semibold" style={{ color: '#166534' }}>
                  {t.resultSaved}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px" style={{ backgroundColor: 'var(--border-subtle)' }} />

            {/* Segmented buttons */}
            <div className="grid grid-cols-3 gap-2">
              {(['Pending', 'Passed', 'Failed'] as ValidationStatus[]).map((st) => {
                const def = statusDefs[st]
                const isSelected = status === st
                return (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(st)}
                    className="relative flex flex-col items-center justify-center gap-1 py-3 rounded-lg font-mono font-bold transition-all overflow-hidden"
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.08em',
                      backgroundColor: isSelected ? def.activeBg : 'var(--bg-elevated)',
                      color: isSelected ? def.activeText : 'var(--text-muted)',
                      border: isSelected ? def.activeBorder : '1px solid var(--border-subtle)',
                    }}
                  >
                    {/* Top accent bar (replaces left bar, more visible in grid) */}
                    {isSelected && (
                      <span
                        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-lg"
                        style={{ backgroundColor: def.accentBar }}
                      />
                    )}
                    <span>{def.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Individual SIT Report ─────────────────────────────────────────── */}
          <div className="flex justify-start border-t pt-4" style={{ borderColor: 'var(--border-subtle)' }}>
            <button
              onClick={handleDownloadReport}
              disabled={isDownloading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-semibold border transition-colors disabled:opacity-50"
              style={{
                backgroundColor: 'transparent',
                borderColor: 'var(--border-default)',
                color: 'var(--accent-primary)',
              }}
            >
              {isDownloading ? <Loader2 size={13} className="animate-spin" /> : <FileDown size={13} />}
              {t.downloadReport} — {sit.name}
            </button>
          </div>

        </div>
      )}
    </div>
  )
}
