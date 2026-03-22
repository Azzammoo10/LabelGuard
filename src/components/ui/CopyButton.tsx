import React from 'react'
import { Copy, Check } from 'lucide-react'
import clsx from 'clsx'
import { useClipboard } from '../../hooks/useClipboard'

// ─── Props ────────────────────────────────────────────────────────────────────
interface CopyButtonProps {
  text: string
  className?: string
  size?: 'sm' | 'md'
  onClick?: () => void
}

/**
 * State machine: idle → copied (1.5 s) → idle
 * Button itself confirms the action — no toast needed (DESIGN.md Section 5.8).
 */
const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  className,
  size = 'md',
  onClick,
}) => {
  const { copy, copied } = useClipboard()

  return (
    <button
      type="button"
      onClick={() => {
        void copy(text);
        if (onClick) onClick();
      }}
      disabled={!text}
      aria-label={copied ? 'Copied to clipboard' : 'Copy output to clipboard'}
      aria-live="polite"
      className={clsx(
        // ── Base ──────────────────────────────────────────────────────────
        'inline-flex items-center gap-2',
        'font-mono font-semibold uppercase tracking-[0.08em]',
        'rounded-sm border',
        // Color transition to confirm copy action (DESIGN.md Section 6)
        'transition-all duration-[200ms] ease-out',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]',
        'disabled:cursor-not-allowed disabled:opacity-40',
        'cursor-pointer',

        // ── Sizes ─────────────────────────────────────────────────────────
        size === 'sm' && 'px-3 py-[6px] text-[11px]',
        size === 'md' && 'px-4 py-[8px] text-[12px]',

        className,
      )}
      style={{
        borderColor:     copied ? 'var(--status-success)' : 'var(--border-default)',
        color:           copied ? 'var(--status-success)' : 'var(--text-secondary)',
        backgroundColor: copied
          ? 'rgba(16,185,129,0.08)'
          : 'transparent',
      }}
    >
      {copied ? (
        <Check size={13} strokeWidth={2.5} aria-hidden="true" />
      ) : (
        <Copy size={13} strokeWidth={1.75} aria-hidden="true" />
      )}
      {copied ? 'Copied' : 'Copy Output'}
    </button>
  )
}

export default CopyButton
