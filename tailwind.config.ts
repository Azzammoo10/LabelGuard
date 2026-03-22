import type { Config } from 'tailwindcss'

/**
 * Tailwind CSS configuration — DLP Monitoring Tools
 * Design tokens sourced from docs/DESIGN.md Section 2 & 9.
 *
 * Color values reference CSS custom properties defined in src/index.css.
 * This allows the full color system to live in one place (CSS variables)
 * while Tailwind utility classes (bg-surface, text-primary, etc.) remain
 * usable throughout the component tree.
 *
 * Loaded in src/index.css via: @config "../tailwind.config.ts"
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // ─── Backgrounds ────────────────────────────────────────────────────
      backgroundColor: {
        base:     'var(--bg-base)',
        surface:  'var(--bg-surface)',
        elevated: 'var(--bg-elevated)',
        hover:    'var(--bg-hover)',
      },

      // ─── Colors (text + bg + border utilities) ───────────────────────────
      colors: {
        // Backgrounds (also available as bg-* utilities via backgroundColor)
        base:     'var(--bg-base)',
        surface:  'var(--bg-surface)',
        elevated: 'var(--bg-elevated)',
        hover:    'var(--bg-hover)',

        // Accent
        accent: {
          primary: 'var(--accent-primary)',
          glow:    'var(--accent-glow)',
          subtle:  'var(--accent-subtle)',
        },

        // Status
        status: {
          success: 'var(--status-success)',
          warning: 'var(--status-warning)',
          error:   'var(--status-error)',
          info:    'var(--status-info)',
        },

        // Typography tokens as color utilities
        primary:   'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        muted:     'var(--text-muted)',

        // Borders
        border: {
          subtle:  'var(--border-subtle)',
          default: 'var(--border-default)',
          focus:   'var(--border-focus)',
        },

        // Trust badges
        badge: {
          internal: 'var(--badge-internal)',
          secure:   'var(--badge-secure)',
          zero:     'var(--badge-zero)',
        },
      },

      // ─── Text Colors ─────────────────────────────────────────────────────
      textColor: {
        primary:   'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        muted:     'var(--text-muted)',
        accent:    'var(--text-accent)',
        'status-success': 'var(--status-success)',
        'status-warning': 'var(--status-warning)',
        'status-error':   'var(--status-error)',
        'accent-primary': 'var(--accent-primary)',
      },

      // ─── Border Colors ───────────────────────────────────────────────────
      borderColor: {
        subtle:  'var(--border-subtle)',
        default: 'var(--border-default)',
        focus:   'var(--border-focus)',
      },

      // ─── Typography ──────────────────────────────────────────────────────
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono:    ['IBM Plex Mono', 'monospace'],
        body:    ['Syne', 'sans-serif'],
      },

      fontSize: {
        xs:   ['11px', { fontWeight: '500' }],
        sm:   ['13px', { fontWeight: '400' }],
        base: ['14px', { fontWeight: '400' }],
        md:   ['16px', { fontWeight: '600' }],
        lg:   ['20px', { fontWeight: '700' }],
        xl:   ['28px', { fontWeight: '800' }],
      },

      // ─── Spacing ─────────────────────────────────────────────────────────
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
      },

      // ─── Border Radius ───────────────────────────────────────────────────
      borderRadius: {
        sm: '3px',
        md: '6px',
        lg: '10px',
      },

      // ─── Box Shadow ──────────────────────────────────────────────────────
      boxShadow: {
        card:  '0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px var(--border-subtle)',
        focus: '0 0 0 3px rgba(59,130,246,0.15)',
        glow:  '0 0 16px var(--accent-glow)',
      },

      // ─── Transitions ─────────────────────────────────────────────────────
      transitionDuration: {
        fast: '100ms',
        base: '200ms',
      },
      transitionTimingFunction: {
        snappy: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      // ─── Screens (custom breakpoints) ────────────────────────────────────────
      screens: {
        workstation: '900px', // primary target per DESIGN.md (enterprise monitors)
      },    },
  },
  plugins: [],
}

export default config
