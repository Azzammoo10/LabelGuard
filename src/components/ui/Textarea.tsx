import React from 'react'
import clsx from 'clsx'

// ─── Props ────────────────────────────────────────────────────────────────────
interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  mono?: boolean
}

const Textarea: React.FC<TextareaProps> = ({
  mono = false,
  className,
  ...rest
}) => {
  return (
    <textarea
      className={clsx(
        // ── Layout ────────────────────────────────────────────────────────
        'w-full resize-none',
        'px-4 py-3',
        'text-base leading-relaxed',
        'rounded-md',

        // ── Colors ────────────────────────────────────────────────────────
        'placeholder:text-muted',
        'border border-[var(--border-default)]',

        // ── Focus ring with glow (DESIGN.md Section 5.4) ──────────────────
        'outline-none',
        'transition-[border-color,box-shadow] duration-[150ms] ease-out',
        'focus:border-[var(--border-focus)] focus:shadow-focus',

        // ── Monospace toggle ──────────────────────────────────────────────
        mono ? 'font-mono' : 'font-body',

        className,
      )}
      style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--text-primary)' }}
      {...rest}
    />
  )
}

export default Textarea
