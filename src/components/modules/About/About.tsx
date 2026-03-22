import { ShieldCheck, User, Lock, Zap, Database, AlertTriangle, Users } from 'lucide-react'
import { useTranslations } from '../../../i18n/translations'

export default function About() {
  const t = useTranslations()

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 flex flex-col gap-5">

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.15em] mb-1" style={{ color: 'var(--text-muted)' }}>
          {t.internalPlatform}
        </p>
        <h1 className="font-display font-bold text-2xl tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>
          {t.aboutTitle}
        </h1>
      </div>

      {/* ── Project Info ─────────────────────────────────────────────────────── */}
      <div
        className="rounded-xl px-5 py-4 flex flex-col gap-3"
        style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}
      >
        {[
          [t.aboutProjLabel, t.aboutProject],
          [t.aboutLabel, t.aboutMilestone],
          [t.aboutEnvLabel, t.aboutEnv],
          [t.aboutObjLabel, t.aboutObjective],
        ].map(([label, value]) => (
          <div key={label} className="flex gap-3">
            <span
              className="font-mono text-xs font-semibold shrink-0 pt-[1px]"
              style={{ color: 'var(--accent-primary)', minWidth: '100px' }}
            >
              {label}
            </span>
            <span className="font-mono text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* ── Team ─────────────────────────────────────────────────────────────── */}
      <div
        className="rounded-xl px-5 py-4 flex flex-col gap-4"
        style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Users size={14} style={{ color: 'var(--accent-primary)' }} />
          <p className="font-mono text-xs uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>
            {t.aboutTeam}
          </p>
        </div>

        {/* Owner */}
        <div className="flex items-center gap-4">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
            style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}
          >
            <User size={18} style={{ color: 'var(--accent-primary)' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display font-semibold text-sm leading-tight" style={{ color: 'var(--text-primary)' }}>
              Mohamed AZZAM
            </p>
            <p className="font-mono text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
              {t.aboutOwnerRole}
            </p>
          </div>

        </div>

        {/* Collaborators */}
        <div className="border-t pt-3 flex flex-col gap-3" style={{ borderColor: 'var(--border-subtle)' }}>
          {[
            { name: 'Salma Laafar', role: t.aboutCollab1Role },
            { name: 'Hajar Lmouataz', role: t.aboutCollab2Role },
          ].map(({ name, role }) => (
            <div key={name} className="flex items-center gap-4">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
                style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}
              >
                <User size={16} style={{ color: 'var(--text-secondary)' }} />
              </div>
              <div>
                <p className="font-display font-semibold text-sm leading-tight" style={{ color: 'var(--text-primary)' }}>
                  {name}
                </p>
                <p className="font-mono text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Security Guarantees ──────────────────────────────────────────────── */}
      <div
        className="rounded-xl px-5 py-4"
        style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck size={14} style={{ color: 'var(--status-success)' }} />
          <p className="font-mono text-xs uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>
            {t.aboutSecurity}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
          {[
            [Lock, t.aboutSec1],
            [Database, t.aboutSec2],
            [Zap, t.aboutSec3],
            [ShieldCheck, t.aboutSec4],
          ].map(([Icon, text]) => {
            const IconComp = Icon as React.ComponentType<{ size: number; style?: React.CSSProperties; className?: string }>
            return (
              <div key={text as string} className="flex items-center gap-2">
                <IconComp size={12} style={{ color: 'var(--status-success)', flexShrink: 0 }} />
                <span className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>{text as string}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Confidentiality Notice ───────────────────────────────────────────── */}
      <div
        className="rounded-xl px-4 py-3 flex items-start gap-3"
        style={{
          backgroundColor: 'color-mix(in srgb, #f59e0b 8%, transparent)',
          border: '1px solid color-mix(in srgb, #f59e0b 35%, transparent)',
        }}
      >
        <AlertTriangle size={14} style={{ color: '#f59e0b', flexShrink: 0, marginTop: '1px' }} />
        <p className="font-mono text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          <span style={{ color: '#f59e0b', fontWeight: 600 }}>{t.confidentialNote} </span>
          {t.confidentialDetail}
        </p>
      </div>

      {/* ── Disclaimer ───────────────────────────────────────────────────────── */}
      <p className="font-mono text-xs leading-relaxed text-center" style={{ color: 'var(--text-muted)' }}>
        {t.aboutDisclaimer}
      </p>

    </div>
  )
}
