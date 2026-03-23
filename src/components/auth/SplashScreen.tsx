import React from 'react'
import { Loader2 } from 'lucide-react'

const SplashScreen: React.FC = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen w-screen fixed inset-0 z-50"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <div className="flex flex-col items-center gap-4 animate-in fade-in duration-300">
        <img
          src="/favicon.svg"
          alt="LabelGuard Logo"
          width="48"
          height="48"
          className="animate-pulse"
        />
        <h1
          className="font-display font-bold uppercase tracking-[0.15em] text-lg"
          style={{ color: 'var(--text-primary)' }}
        >
          LabelGuard
        </h1>
        <div style={{ marginTop: '8px' }}>
          <Loader2 size={24} className="animate-spin" style={{ color: 'var(--accent-primary)' }} />
        </div>
      </div>
    </div>
  )
}

export default SplashScreen
