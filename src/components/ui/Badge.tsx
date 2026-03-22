import React from 'react'
import clsx from 'clsx'

// ─── Variant definitions ──────────────────────────────────────────────────────
type BadgeVariant =
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'internal'
  | 'secure'
  | 'zero-retention'
  | 'active'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

// Maps each variant to its background + text CSS variable pair
const VARIANT_STYLES: Record<
  BadgeVariant,
  { bg: string; color: string }
> = {
  success:        { bg: 'rgba(16,185,129,0.12)',  color: 'var(--status-success)' },
  warning:        { bg: 'rgba(245,158,11,0.12)',  color: 'var(--status-warning)' },
  error:          { bg: 'rgba(239,68,68,0.12)',   color: 'var(--status-error)'   },
  info:           { bg: 'rgba(99,102,241,0.12)',  color: 'var(--status-info)'    },
  internal:       { bg: 'var(--badge-internal)',  color: 'var(--accent-primary)' },
  secure:         { bg: 'var(--badge-secure)',    color: 'var(--status-success)' },
  'zero-retention': { bg: 'var(--badge-zero)',   color: 'var(--status-info)'    },
  active:         { bg: 'rgba(59,130,246,0.14)',  color: 'var(--accent-primary)' },
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'info',
  children,
  className,
}) => {
  const { bg, color } = VARIANT_STYLES[variant]

  return (
    <span
      className={clsx(
        'inline-flex items-center',
        'font-mono font-medium uppercase tracking-[0.1em]',
        'rounded-sm px-2 py-[3px]',
        'text-[10px] leading-none',
        className,
      )}
      style={{ backgroundColor: bg, color }}
    >
      {children}
    </span>
  )
}

export default Badge
