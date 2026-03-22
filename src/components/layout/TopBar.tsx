import React, { useState } from 'react'
import { Menu, FileDown, Loader2 } from 'lucide-react'
import { useLanguage, type Language } from '../../contexts/LanguageContext'
import { useTranslations } from '../../i18n/translations'
import { exportGlobalReport } from '../../utils/exportReport'

interface TopBarProps {
  onMenuToggle: () => void
  menuOpen: boolean
}

const TRUST_BADGES = [
  {
    key: 'internal',
    label: 'INTERNAL USE ONLY',
    bg: 'var(--badge-internal)',
    color: 'var(--accent-primary)',
  },
  {
    key: 'secure',
    label: 'CLIENT-SIDE SECURE',
    bg: 'var(--badge-secure)',
    color: 'var(--status-success)',
  },
  {
    key: 'zero',
    label: 'ZERO DATA RETENTION',
    bg: 'var(--badge-zero)',
    color: 'var(--status-info)',
  },
] as const

const TopBar: React.FC<TopBarProps> = ({ onMenuToggle, menuOpen }) => {
  const { language, setLanguage } = useLanguage()
  const t = useTranslations()
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    try {
      await exportGlobalReport(language)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <header
      className="flex items-center justify-between px-4 md:px-6 shrink-0"
      style={{
        height: '56px',
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
      role="banner"
    >
      {/* ── Left: hamburger (mobile) + logo ─────────────────────────────── */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className="flex md:hidden items-center justify-center w-8 h-8 rounded-md transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          aria-label="Open navigation"
          aria-expanded={menuOpen}
          aria-controls="sidebar-nav"
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--bg-hover)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent')}
        >
          <Menu size={20} strokeWidth={1.75} />
        </button>
        <img
          src="/axa.png"
          alt="AXA"
          width="36"
          height="36"
          style={{ flexShrink: 0, borderRadius: '4px', objectFit: 'contain' }}
        />
        <div style={{ width: '1px', height: '22px', backgroundColor: 'var(--border-subtle)' }} />
        <span
          className="font-display font-bold uppercase tracking-[0.15em] text-sm whitespace-nowrap hidden sm:inline-block"
          style={{ color: 'var(--text-primary)' }}
        >
          LabelGuard
        </span>
      </div>

      {/* ── Right Controls ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 pr-4 border-r" style={{ borderColor: 'var(--border-subtle)' }}>

          {/* Language Toggle */}
          <div className="flex bg-black/5 rounded-lg p-0.5 dark:bg-white/5 border border-[var(--border-subtle)]">
            {(['fr', 'en'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={`px-2 py-1 text-[10px] font-mono rounded-md uppercase transition-colors ${language === l ? 'bg-white dark:bg-[#1e1e1e] shadow-sm text-[var(--text-primary)] font-semibold' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* PDF Export Button */}
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition-colors border disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--accent-primary)',
              borderColor: 'var(--border-default)'
            }}
          >
            {isExporting
              ? <Loader2 size={12} className="animate-spin" />
              : <FileDown size={12} />
            }
            <span className="hidden md:inline">
              {isExporting ? t.exporting : t.globalReport}
            </span>
          </button>
        </div>

        {/* ── Trust Badges ───────────────────────────────────────────────── */}
        <div
          className="flex items-center gap-2"
          role="list"
          aria-label="Security trust indicators"
        >
          {TRUST_BADGES.map((badge) => (
            <span
              key={badge.key}
              role="listitem"
              className={[
                'font-mono uppercase tracking-[0.1em]',
                'rounded-sm px-2 py-[3px]',
                'hidden xl:inline-block',
              ].join(' ')}
              style={{
                fontSize: '10px',
                backgroundColor: badge.bg,
                color: badge.color,
              }}
            >
              {badge.label}
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}

export default TopBar
