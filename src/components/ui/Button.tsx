import React from 'react'
import clsx from 'clsx'

// ─── Props ────────────────────────────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md'
  loading?: boolean
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className,
  ...rest
}) => {
  const isDisabled = disabled ?? loading

  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-busy={loading}
      className={clsx(
        // ── Base ──────────────────────────────────────────────────────────
        'inline-flex items-center justify-center gap-2',
        'font-mono font-semibold uppercase tracking-[0.08em]',
        'rounded-sm border border-transparent',
        'transition-all duration-[150ms] ease-out',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--bg-base)]',
        'disabled:cursor-not-allowed disabled:opacity-50',

        // ── Sizes ─────────────────────────────────────────────────────────
        size === 'sm' && 'px-3 py-[6px] text-[11px]',
        size === 'md' && 'px-5 py-[10px] text-[13px]',

        // ── Variants ──────────────────────────────────────────────────────
        variant === 'primary' && [
          'text-white',
          !isDisabled && 'hover:shadow-glow active:scale-[0.97]',
        ],
        variant === 'secondary' && [
          'border-[var(--border-default)]',
          !isDisabled && 'hover:border-[var(--border-focus)] hover:text-primary',
        ],

        className,
      )}
      style={
        variant === 'primary'
          ? {
              backgroundColor: isDisabled
                ? 'var(--accent-subtle)'
                : 'var(--accent-primary)',
            }
          : {
              backgroundColor: 'transparent',
              color: 'var(--text-secondary)',
            }
      }
      {...rest}
    >
      {/* Loading spinner */}
      {loading && (
        <span
          className="block w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin shrink-0"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  )
}

export default Button
