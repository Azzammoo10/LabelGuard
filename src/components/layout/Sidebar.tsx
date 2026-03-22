import React, { useRef, useState, useEffect } from 'react'
import { Lock } from 'lucide-react'
import clsx from 'clsx'
import { NAV_ITEMS } from '../../constants/navigation'
import { useTranslations } from '../../i18n/translations'
import type { ModuleId } from '../../types/index'
import type { Translations } from '../../i18n/translations'

// ─── Props ────────────────────────────────────────────────────────────────────
interface SidebarProps {
  activeModule: ModuleId
  onModuleChange: (id: ModuleId) => void
  isOpen: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, onModuleChange, isOpen }) => {
  const navRef = useRef<HTMLElement>(null)
  const t = useTranslations()

  // Map nav IDs to translated labels and descriptions
  const navLabels: Record<ModuleId, { label: string; desc: string }> = {
    'iban':         { label: t.navIban,       desc: t.navIbanDesc    },
    'credit-card':  { label: t.navCreditCard,  desc: t.navCreditDesc  },
    'eu-debit-card':{ label: t.navEuDebit,     desc: t.navEuDebitDesc },
    'swift-code':   { label: t.navSwift,       desc: t.navSwiftDesc   },
    'aba-routing':  { label: t.navAba,         desc: t.navAbaDesc     },
    'test-documents':{ label: t.navTestDocs,   desc: t.navTestDocsDesc },
    'about':        { label: t.navAbout,       desc: t.navAboutDesc   },
  }

  // Use t to suppress unused warning
  void (t as Translations)

  // Track mobile viewport for aria-hidden management
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // ── Keyboard navigation: arrow keys move focus between unlocked items ───────
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) => {
    const buttons = navRef.current?.querySelectorAll<HTMLButtonElement>(
      'button:not([disabled])',
    )
    if (!buttons) return

    const items = Array.from(buttons)
    let next = -1

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      next = (currentIndex + 1) % items.length
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      next = (currentIndex - 1 + items.length) % items.length
    }

    if (next !== -1) items[next].focus()
  }

  return (
    <aside
      className={clsx(
        'flex flex-col z-50',
        'transition-transform duration-300 ease-in-out',
        // Mobile: fixed drawer, slide in/out
        'fixed top-0 bottom-0 left-0',
        // Desktop: static in flow
        'md:relative md:top-auto md:bottom-auto md:left-auto md:z-auto md:translate-x-0 md:h-full',
        // Mobile open/closed
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      )}
      style={{
        width:           '240px',
        backgroundColor: 'var(--bg-surface)',
        borderRight:     '1px solid var(--border-subtle)',
      }}
      aria-label="Module navigation"
      id="sidebar-nav"
      aria-hidden={isMobile && !isOpen ? true : undefined}
    >
      {/* ── Main tools nav ────────────────────────────────────────────────── */}
      <nav ref={navRef} className="flex flex-col pt-2" role="navigation">
        {NAV_ITEMS.filter((item) => item.id !== 'about').map((item, index) => {
          const isActive = item.id === activeModule
          const Icon = item.icon

          return (
            <button
              key={item.id}
              type="button"
              disabled={item.locked}
              aria-current={isActive ? 'page' : undefined}
              aria-label={item.locked ? `${navLabels[item.id]?.label ?? item.label} — coming soon` : (navLabels[item.id]?.label ?? item.label)}
              onClick={() => !item.locked && onModuleChange(item.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={clsx(
                'relative flex items-center gap-3 w-full text-left',
                'px-4 border-l-[3px]',
                'transition-colors duration-[--transition-base]',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]',
                isActive
                  ? 'text-primary'
                  : 'text-secondary focus-visible:text-primary',
                item.locked
                  ? 'opacity-40 cursor-not-allowed'
                  : !isActive && 'cursor-pointer',
              )}
              style={{
                height:          '48px',
                borderLeftColor: isActive ? 'var(--accent-primary)' : 'transparent',
                backgroundColor: isActive ? 'var(--bg-hover)'       : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive && !item.locked)
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--bg-hover)'
              }}
              onMouseLeave={(e) => {
                if (!isActive)
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'
              }}
            >
              <Icon
                size={16}
                strokeWidth={1.75}
                aria-hidden="true"
                style={{ color: isActive ? 'var(--accent-primary)' : 'currentColor', flexShrink: 0 }}
              />
              <div className="flex flex-col min-w-0">
                <span className="font-display text-sm font-semibold leading-tight truncate">
                  {navLabels[item.id]?.label ?? item.label}
                </span>
                {item.locked && (
                  <span
                    className="font-mono uppercase tracking-[0.08em] leading-none mt-0.5"
                    style={{ fontSize: '9px', color: 'var(--text-muted)' }}
                  >
                    Coming Soon
                  </span>
                )}
                {item.preview && !item.locked && (
                  <span
                    className="font-mono uppercase tracking-[0.08em] leading-none mt-0.5"
                    style={{ fontSize: '9px', color: 'var(--status-warning)' }}
                  >
                    Preview Only
                  </span>
                )}
              </div>

              {(item.locked || item.preview) && (
                <Lock size={12} strokeWidth={2} className="ml-auto shrink-0" aria-hidden="true"
                  style={{ color: item.preview ? 'var(--status-warning)' : 'var(--text-muted)' }} />
              )}
            </button>
          )
        })}
      </nav>

      {/* ── About — pinned to bottom ──────────────────────────────────────── */}
      {(() => {
        const about = NAV_ITEMS.find((item) => item.id === 'about')
        if (!about) return null
        const isActive = activeModule === 'about'
        const Icon = about.icon
        return (
          <div className="mt-auto" style={{ borderTop: '1px solid var(--border-subtle)' }}>
            <button
              type="button"
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onModuleChange('about')}
              className={clsx(
                'relative flex items-center gap-3 w-full text-left',
                'px-4 border-l-[3px]',
                'transition-colors duration-[--transition-base]',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]',
                'cursor-pointer',
                isActive ? 'text-primary' : 'text-secondary focus-visible:text-primary',
              )}
              style={{
                height:          '48px',
                borderLeftColor: isActive ? 'var(--accent-primary)' : 'transparent',
                backgroundColor: isActive ? 'var(--bg-hover)'       : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive)
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--bg-hover)'
              }}
              onMouseLeave={(e) => {
                if (!isActive)
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'
              }}
            >
              <Icon
                size={16}
                strokeWidth={1.75}
                aria-hidden="true"
                style={{ color: isActive ? 'var(--accent-primary)' : 'currentColor', flexShrink: 0 }}
              />
              <span className="font-display text-sm font-semibold leading-tight">
                {navLabels.about?.label ?? about.label}
              </span>
            </button>
          </div>
        )
      })()}

    </aside>
  )
}

export default Sidebar
