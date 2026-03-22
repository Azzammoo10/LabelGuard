import React from 'react'
import { Check } from 'lucide-react'
import clsx from 'clsx'

interface StatusBarProps {
  stats: {
    emailsExtracted: number
    emailsMasked: number
    processingMs: number
  }
  className?: string
}

const StatusBar: React.FC<StatusBarProps> = ({ stats, className }) => {
  return (
    <div
      className={clsx(
        'flex items-center gap-2',
        'font-mono text-xs',
        'px-4 py-3 rounded-md',
        'animate-[statusSlideIn_200ms_ease-out_both]',
        className
      )}
      style={{
        backgroundColor: 'var(--bg-elevated)',
        border: '1px solid var(--border-subtle)',
        borderLeft: '2px solid var(--status-success)',
        color: 'var(--text-secondary)',
      }}
      role="status"
    >
      <Check size={14} style={{ color: 'var(--status-success)', flexShrink: 0 }} strokeWidth={2.5} />
      <span>
        Alert parsed &middot; {stats.emailsExtracted} emails extracted &middot; {stats.emailsMasked} masked &middot; {stats.processingMs}ms
      </span>
    </div>
  )
}

export default StatusBar
