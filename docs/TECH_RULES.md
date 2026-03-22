# Tech Rules — Stack Definition
## DLP Monitoring Tools

**Version:** 1.0  
**Classification:** Internal Use Only  

---

## 1. Stack Overview

DLP Monitoring Tools is a **100% client-side static web application**. There is no backend, no database, no server-side logic. All processing runs in the browser.

```
┌─────────────────────────────────────────────────────────┐
│                   BROWSER (Client Only)                  │
│                                                          │
│   React 18  +  TypeScript  +  Vite  +  Tailwind CSS     │
│                                                          │
│   No API calls. No storage. No telemetry.               │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Core Stack

| Layer | Technology | Version | Rationale |
|---|---|---|---|
| **Framework** | React | 18.x | Component model, fast renders, ecosystem |
| **Language** | TypeScript | 5.x | Type safety, IDE support for Copilot, refactoring confidence |
| **Build Tool** | Vite | 5.x | Sub-second HMR, minimal config, optimal bundling |
| **Styling** | Tailwind CSS | 3.x | Utility-first, zero runtime, design token integration |
| **Package Manager** | npm | Latest | Default, consistent with enterprise toolchains |

---

## 3. Library Decisions

### 3.1 UI / Components

| Package | Purpose | Justification |
|---|---|---|
| `clsx` | Conditional className merging | Lightweight, no overhead |
| `lucide-react` | Icon library | Clean SVG icons, tree-shakeable, consistent with design |

**No UI component library** (no shadcn, no MUI, no Radix) — custom components built from scratch per design document for full control over visual identity.

### 3.2 Data Processing

| Package | Purpose | Justification |
|---|---|---|
| `xlsx` (SheetJS) | Client-side Excel parsing | Industry standard, works in browser, no server upload |
| `papaparse` | Client-side CSV parsing | Fast, battle-tested, streaming support |

### 3.3 Clipboard

Native browser `navigator.clipboard.writeText()` API — no library needed.

### 3.4 Testing

| Package | Purpose |
|---|---|
| `vitest` | Unit testing (Vite-native, fast) |
| `@testing-library/react` | Component testing |

---

## 4. Project Structure

```
dlp-monitoring-tools/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopBar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Layout.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── StatusBar.tsx
│   │   │   └── CopyButton.tsx
│   │   └── modules/
│   │       ├── EmailMasker/
│   │       │   ├── EmailMasker.tsx
│   │       │   └── emailMasker.utils.ts
│   │       └── UploadReportCleaner/
│   │           ├── UploadReportCleaner.tsx
│   │           └── uploadReport.utils.ts
│   ├── hooks/
│   │   └── useClipboard.ts
│   ├── constants/
│   │   └── navigation.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .github/
│   ├── copilot-instructions.md   ← GitHub Copilot context file
│   └── workflows/
│       └── ci.yml
├── .gitignore
├── docs/
│   ├── PRD.md
│   ├── DESIGN.md
│   └── TECH_RULES.md
├── todo.md
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 5. Coding Standards

### 5.1 TypeScript

```typescript
// ✅ Always type props explicitly
interface EmailMaskerProps {
  initialValue?: string;
}

// ✅ Use const assertions for constants
const MASKING_CHAR = '***' as const;

// ✅ Return types on all exported functions
export function maskEmail(email: string): string { ... }

// ❌ Never use 'any'
// ❌ Never use non-null assertion (!) unless unavoidable
```

### 5.2 React

```typescript
// ✅ Functional components only (no class components)
const EmailMasker: React.FC<EmailMaskerProps> = ({ initialValue = '' }) => { ... }

// ✅ Custom hooks for logic extraction
const { copy, copied } = useClipboard();

// ✅ useMemo/useCallback for processing functions (performance)
const processedEmails = useMemo(() => maskEmails(input), [input]);

// ❌ Never use useEffect for synchronous data transformations
// ❌ Never use global state (no Redux, no Zustand) — local state only
```

### 5.3 File Naming

- Components: `PascalCase.tsx` (e.g., `EmailMasker.tsx`)
- Utilities: `camelCase.utils.ts` (e.g., `emailMasker.utils.ts`)
- Hooks: `camelCase` starting with `use` (e.g., `useClipboard.ts`)
- Constants: `camelCase.ts` (e.g., `navigation.ts`)

### 5.4 CSS / Tailwind

```tsx
// ✅ Use design tokens via CSS variables extended in tailwind.config.ts
// ✅ Group classes: layout → spacing → typography → color → state
<div className="flex flex-col gap-4 p-6 text-sm text-text-primary bg-surface border border-border-subtle rounded-lg">

// ✅ Use clsx for conditional classes
<button className={clsx('btn-base', { 'btn-copied': copied })} />

// ❌ Never use inline styles except for dynamic values (e.g., animation delays)
// ❌ Never use arbitrary Tailwind values unless no token exists
```

### 5.5 Processing Logic

```typescript
// ✅ All processing functions must be pure (no side effects)
// ✅ All processing functions must be tested
// ✅ Batch operations must handle empty input gracefully
// ✅ Invalid entries must be surfaced, not silently dropped

export function maskEmails(input: string): MaskingResult {
  // Returns both valid masked and invalid entries with flags
}
```

---

## 6. Performance Rules

| Rule | Constraint |
|---|---|
| **Client-side only** | No external API calls ever |
| **No loading states** for local processing | Client ops are synchronous / near-instant |
| **Bundle size** | Target < 300KB gzipped initial load |
| **No heavy libraries** | No moment.js, no lodash (use native) |
| **Tree-shaking** | Import only used functions from all libraries |
| **Lazy loading** | Future modules loaded via `React.lazy()` |

---

## 7. Security Rules

| Rule | Enforcement |
|---|---|
| No `localStorage` / `sessionStorage` | Prohibited — zero persistence |
| No cookies | Prohibited |
| No `fetch` / `axios` to external endpoints | Prohibited |
| No analytics scripts (GA, Mixpanel, etc.) | Prohibited |
| No CDN-hosted scripts | All dependencies bundled locally |
| CSP Header | `Content-Security-Policy: default-src 'self'` on deployment |

---

## 8. GitHub Copilot Configuration

Create `.github/copilot-instructions.md` with the following to give Copilot full context:

```markdown
# GitHub Copilot Instructions — DLP Monitoring Tools

## Project Context
Internal DLP analyst tooling platform. React 18 + TypeScript + Vite + Tailwind CSS.
100% client-side. No backend. No external API calls.

## Rules
- All components are functional React components with TypeScript
- No class components, no Redux, no global state
- All processing logic lives in *.utils.ts files as pure functions
- Use clsx for conditional classNames
- Icons from lucide-react only
- Tailwind for all styling — use CSS variables from tailwind.config.ts
- Never use localStorage, sessionStorage, or cookies
- Never add fetch() calls to external URLs

## Module Structure
Each module: ComponentName.tsx (UI) + componentName.utils.ts (logic)

## Current Modules
- EmailMasker: masks email local part, preserves domain, handles batch input
- UploadReportCleaner: parses Excel/CSV, extracts Source Path / File Name / File Size

## Design Tokens
Colors defined as CSS variables in index.css, extended in tailwind.config.ts:
bg-base, bg-surface, bg-elevated, text-primary, text-secondary, accent-primary,
status-success, status-warning, border-subtle, border-default
```

---

## 9. Git & CI Rules

### Branch Strategy

```
main          ← production-ready only
develop       ← integration branch
feature/*     ← feature development (e.g., feature/email-masker)
fix/*         ← bug fixes
```

### Commit Convention (Conventional Commits)

```
feat: add batch email masking with invalid detection
fix: correct masking for emails with + aliases
perf: optimize regex for large batch inputs
docs: update PRD with Upload Report Cleaner specs
style: align output textarea with design tokens
test: add unit tests for maskEmail utility
```

### CI Pipeline (.github/workflows/ci.yml)

```yaml
- Lint (ESLint + TypeScript check)
- Unit tests (Vitest)
- Build check (Vite build)
- Bundle size check (< 300KB)
```

---

## 10. Initialization Commands

```bash
# Create project
npm create vite@latest dlp-monitoring-tools -- --template react-ts

# Navigate
cd dlp-monitoring-tools

# Install core dependencies
npm install

# Install styling
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install UI utilities
npm install clsx lucide-react

# Install data processing
npm install xlsx papaparse
npm install -D @types/papaparse

# Install testing
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom

# Initialize git
git init
git add .
git commit -m "feat: initialize DLP Monitoring Tools project"
```

---

*Document Owner: DLP Platform Team*  
*Last Updated: 2026-03*
