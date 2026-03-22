# GitHub Copilot Instructions — DLP Monitoring Tools

## Project Context

Internal DLP analyst tooling platform for enterprise SOC/monitoring teams.
Stack: React 18 + TypeScript 5 + Vite 5 + Tailwind CSS 3.
Architecture: 100% client-side static app. No backend. No external API calls. No data persistence.

## Absolute Rules

- All components: functional React with TypeScript — no class components
- No Redux, no Zustand, no global state — local useState/useMemo only
- No fetch(), no axios, no external HTTP calls of any kind
- No localStorage, sessionStorage, cookies, or any persistence mechanism
- No analytics scripts, no tracking, no CDN external scripts
- Icons: lucide-react only
- Styling: Tailwind CSS utility classes using design tokens — no inline styles (except dynamic values)
- Conditional classes: clsx() only

## Architecture Rules

- Processing logic → pure functions in `*.utils.ts` files (no side effects)
- UI logic → `ComponentName.tsx`
- Hooks → `src/hooks/useHookName.ts`
- Types → `src/types/index.ts`
- Each module: one folder under `src/components/modules/`

## Design Tokens (Tailwind extended classes)

Use these token classes (defined in tailwind.config.ts + index.css CSS variables):

**Backgrounds:** `bg-base` `bg-surface` `bg-elevated` `bg-hover`
**Text:** `text-primary` `text-secondary` `text-muted` `text-accent`
**Borders:** `border-subtle` `border-default` `border-focus`
**Accent:** `text-accent-primary` `bg-accent-primary`
**Status:** `text-status-success` `text-status-warning` `text-status-error`

## Fonts

- Display/UI: `font-display` (Syne)
- Data output / badges / monospace: `font-mono` (IBM Plex Mono)

## Current Modules

### Email Masker (`src/components/modules/EmailMasker/`)
- `emailMasker.utils.ts`: pure functions — parseInput, isValidEmail, maskEmail, maskEmails
- `EmailMasker.tsx`: UI — input textarea, process button, status bar, output textarea, copy button
- Masking rule: keep first character of local part, replace rest with ***, preserve full domain
- Batch input: newline or comma-separated
- Output: monospace font, invalid entries flagged with ⚠ prefix

### Upload Report Cleaner (`src/components/modules/UploadReportCleaner/`)
- Status: Coming Soon — UI shell only, no functional logic yet
- Future: parse Excel/CSV client-side with SheetJS/PapaParse, extract Source Path, File Name, File Size

## Performance Targets

- All processing < 200ms
- No loading spinners for synchronous client-side operations
- Bundle < 300KB gzipped

## Commit Convention

feat: / fix: / perf: / docs: / style: / test: / refactor:
