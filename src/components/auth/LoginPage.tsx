import React, { useState } from 'react'
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useTranslations } from '../../i18n/translations'

const LoginPage: React.FC = () => {
  const t = useTranslations()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Auto-append domain if missing '@'
      const loginEmail = email.includes('@') ? email : `${email}@axa.com`
      await login(loginEmail, password)
    } catch (err: unknown) {
      console.error('Login error:', err)
      setError(err instanceof Error ? err.message : String(err))
      setPassword('') // Clear password on failure
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-4"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <div className="flex flex-col items-center gap-6 w-full max-w-sm animate-in fade-in duration-300">
        {/* Header / Logo */}
        <div className="flex flex-col items-center gap-3">
          <img
            src="/favicon.svg"
            alt="LabelGuard Logo"
            width="48"
            height="48"
          />
          <h1
            className="font-display font-bold uppercase tracking-[0.15em] text-xl"
            style={{ color: 'var(--text-primary)' }}
          >
            LabelGuard
          </h1>
          <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--accent-primary)' }} />
          <span
            className="font-mono text-[11px] uppercase tracking-wider"
            style={{ color: 'var(--text-secondary)' }}
          >
            AXA — OneTrust CM16
          </span>
        </div>

        {/* Card */}
        <div
          className="w-full p-6 rounded-xl border flex flex-col gap-4"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="font-mono text-xs font-semibold tracking-wide"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t.email}
              </label>
              <input
                id="email"
                type="text"
                required
                disabled={isSubmitting}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 rounded-lg font-sans text-sm border focus:outline-none transition-colors"
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  borderColor: 'var(--border-default)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="font-mono text-xs font-semibold tracking-wide"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t.password}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  disabled={isSubmitting}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 rounded-lg font-sans text-sm border focus:outline-none transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-elevated)',
                    borderColor: 'var(--border-default)',
                    color: 'var(--text-primary)',
                  }}
                />
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--text-secondary)' }}
                  aria-label={showPassword ? t.hidePassword : t.showPassword}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--status-error)' }}>
                <AlertCircle size={14} className="shrink-0" />
                <span className="font-mono">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-sans font-bold text-sm tracking-wide border transition-all disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
              style={{
                backgroundColor: 'var(--accent-primary)',
                borderColor: 'var(--accent-primary)',
                color: '#ffffff',
                boxShadow: 'var(--shadow-glow)',
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>{t.signingIn}</span>
                </>
              ) : (
                <span>{t.signIn}</span>
              )}
            </button>
          </form>
        </div>

        {/* Footer Note */}
        <span
          className="font-mono text-[10px] uppercase tracking-wider text-center"
          style={{ color: 'var(--text-muted)' }}
        >
          {t.restrictedAccess}
        </span>
      </div>
    </div>
  )
}

export default LoginPage
