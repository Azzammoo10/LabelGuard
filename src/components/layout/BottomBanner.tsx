import React from 'react'
import { AlertTriangle } from 'lucide-react'
import { useTranslations } from '../../i18n/translations'

const BottomBanner: React.FC = () => {
  const t = useTranslations()

  return (
    <div
      className="flex items-center justify-center gap-1.5 px-4 py-1 shrink-0 border-t z-50"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--status-warning)',
      }}
      role="alert"
    >
      <AlertTriangle size={12} className="shrink-0" style={{ color: 'var(--status-warning)' }} />
      <span className="font-mono text-[10px] tracking-wider text-center" style={{ color: 'var(--text-secondary)' }}>
        {t.bottomBannerText}
      </span>
    </div>
  )
}

export default BottomBanner
