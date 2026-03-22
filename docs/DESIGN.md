# Design Document
## DLP Monitoring Tools — UI/UX & Visual Guidelines

**Version:** 1.0  
**Classification:** Internal Use Only  

---

## 1. Design Philosophy

### Core Principle: **Operational Speed First**

Every design decision must serve one primary goal: **enabling DLP analysts to complete tasks in seconds**. The interface must feel like a precision instrument — not a consumer app, not a marketing website.

Aesthetic direction: **Industrial Precision / Dark Intelligence**

- Inspired by: terminal dashboards, cybersecurity consoles, Bloomberg terminal, Figma's dark theme
- Tone: authoritative, focused, professional, technical
- Feel: high-density information, zero noise, instant response feedback

### Design Pillars

1. **Zero Friction** — No modals, no confirmation dialogs, no loading spinners for client-side ops.
2. **Visual Trust** — Looks like an enterprise security tool. Instills confidence in analysts.
3. **Density Without Chaos** — Information-dense but organized. Every pixel has purpose.
4. **Immediate Feedback** — Every action (paste, process, copy) has instant visual confirmation.

---

## 2. Color System

### Primary Palette

```css
:root {
  /* Backgrounds */
  --bg-base:        #0A0C0F;   /* Near-black, main background */
  --bg-surface:     #111418;   /* Card / panel background */
  --bg-elevated:    #1A1E25;   /* Elevated elements, inputs */
  --bg-hover:       #1F242D;   /* Hover states */

  /* Borders */
  --border-subtle:  #1E2530;   /* Dividers, card borders */
  --border-default: #2A3340;   /* Input borders */
  --border-focus:   #3B82F6;   /* Focus rings */

  /* Accent — Electric Blue (action, CTA, active states) */
  --accent-primary: #3B82F6;   /* Primary accent */
  --accent-glow:    #3B82F620; /* Glow effect for accent */
  --accent-subtle:  #1D3557;   /* Subtle accent backgrounds */

  /* Status Colors */
  --status-success: #10B981;   /* Valid / processed */
  --status-warning: #F59E0B;   /* Invalid / flagged */
  --status-error:   #EF4444;   /* Error states */
  --status-info:    #6366F1;   /* Info / neutral badges */

  /* Typography */
  --text-primary:   #E8EDF3;   /* Main text */
  --text-secondary: #8B95A3;   /* Secondary / labels */
  --text-muted:     #4A5568;   /* Disabled / placeholder */
  --text-accent:    #3B82F6;   /* Accent text */

  /* Trust Badges */
  --badge-internal: #1A2744;   /* Internal Use Only */
  --badge-secure:   #0D2818;   /* Client-Side Secure */
  --badge-zero:     #1A1040;   /* Zero Data Retention */
}
```

### Accent Strategy

Use `--accent-primary` sparingly and intentionally:
- Active navigation items
- Primary action buttons (Process, Copy)
- Focus rings
- Processing confirmation animations

Never use accent color for decorative purposes.

---

## 3. Typography

### Font Stack

```css
/* Display / Headers */
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Syne:wght@600;700;800&display=swap');

--font-display:  'Syne', sans-serif;       /* Module titles, hero text */
--font-mono:     'IBM Plex Mono', monospace; /* Data output, badges, code */
--font-body:     'Syne', sans-serif;        /* Body text, labels */
```

### Type Scale

| Token | Size | Weight | Usage |
|---|---|---|---|
| `--text-xs` | 11px | 500 | Badges, micro labels |
| `--text-sm` | 13px | 400 | Secondary labels, helper text |
| `--text-base` | 14px | 400 | Body text, input content |
| `--text-md` | 16px | 600 | Card titles, section headers |
| `--text-lg` | 20px | 700 | Module titles |
| `--text-xl` | 28px | 800 | Platform name / hero |

### Typography Rules

- **All data outputs use monospace font** — creates clear distinction between input and processed result.
- **Uppercase + letter-spacing** for labels, badges, and section identifiers.
- **Never center-align body text** — left-aligned only for data density readability.

---

## 4. Layout System

### Overall Structure

```
┌─────────────────────────────────────────┐
│  TOPBAR: Logo + Platform Name + Badges  │
├──────────┬──────────────────────────────┤
│          │                              │
│  SIDEBAR │     MAIN CONTENT AREA        │
│  (Nav)   │     (Active Module)          │
│          │                              │
│          │                              │
└──────────┴──────────────────────────────┘
```

### Grid

- Sidebar: `240px` fixed
- Content area: fluid, max-width `900px` centered in remaining space
- Internal card padding: `24px`
- Section gap: `16px`

### Responsive

- Desktop first (1280px+ primary target — enterprise analysts use large monitors)
- Tablet breakpoint at 900px: sidebar collapses to icon rail
- No mobile-first optimization needed (SOC analysts use desktop workstations)

---

## 5. Component Specifications

### 5.1 Top Bar

```
┌─────────────────────────────────────────────────────────────┐
│  🔷 DLP MONITORING TOOLS    [INTERNAL] [SECURE] [ZERO-RET]  │
└─────────────────────────────────────────────────────────────┘
```

- Height: `56px`
- Background: `--bg-surface` with bottom border `--border-subtle`
- Logo: geometric diamond icon + wordmark in `--font-display`
- Badges: pill-style, right-aligned, monospace micro-text
- No search, no notifications, no user menu — zero distraction

### 5.2 Sidebar Navigation

```
┌──────────────┐
│ ◈ Email      │  ← Active (accent left border + bg)
│   Masker     │
├──────────────┤
│ ◻ Upload     │  ← Coming Soon (muted, lock icon)
│   Report     │
│   Cleaner    │
└──────────────┘
```

- Width: `240px`
- Nav item height: `48px`
- Active state: left accent border `3px solid --accent-primary` + subtle bg
- Coming Soon: lock icon, muted opacity `0.4`, non-clickable

### 5.3 Module Card

Each tool is presented in a full-width card:

```
┌─────────────────────────────────────────┐
│ MODULE TITLE           [status badge]   │
│ Short description line                  │
├─────────────────────────────────────────┤
│                                         │
│  [Input Area]                           │
│                                         │
├─────────────────────────────────────────┤
│  [PROCESS BUTTON]            [stats]    │
├─────────────────────────────────────────┤
│  [Output Area]              [COPY]      │
│                                         │
└─────────────────────────────────────────┘
```

### 5.4 Input / Output Textareas

- Background: `--bg-elevated`
- Border: `1px solid --border-default`
- Focus: border becomes `--accent-primary`, subtle glow `box-shadow: 0 0 0 3px --accent-glow`
- Font: `--font-mono` for output, `--font-body` for input
- Placeholder text: `--text-muted`, monospace, descriptive

### 5.5 Primary Action Button

```css
.btn-primary {
  background: --accent-primary;
  color: #fff;
  font: 600 13px --font-mono;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 10px 20px;
  border-radius: 4px;
  transition: all 0.15s ease;
}
.btn-primary:hover {
  background: #2563EB;
  box-shadow: 0 0 16px --accent-glow;
}
```

### 5.6 Trust Badges

Three distinct badges in the top bar:

| Badge | Label | Colors |
|---|---|---|
| Internal Use Only | `INTERNAL USE ONLY` | Blue tint bg, blue text |
| Client-Side Secure Processing | `CLIENT-SIDE SECURE` | Green tint bg, green text |
| Zero Data Retention | `ZERO DATA RETENTION` | Purple tint bg, purple text |

Style: `border-radius: 3px`, `padding: 3px 8px`, `font-size: 10px`, `font-family: --font-mono`, `letter-spacing: 0.1em`, `text-transform: uppercase`

### 5.7 Result Stats Bar

Appears after processing, between process button and output:

```
✓ 14 emails processed   ⚠ 2 invalid   ⏱ 0ms
```

- Monospace font
- Color-coded: green for valid count, yellow for invalid
- Subtle fade-in animation on appearance

### 5.8 Copy Button with Confirmation

```
[COPY OUTPUT]  →  [✓ COPIED]  (1.5s)  →  [COPY OUTPUT]
```

- State machine: idle → copied → idle
- Color: secondary on idle, success green on confirmation
- No toast notification needed — button itself confirms

---

## 6. Motion & Animation

### Principles

- **Fast and functional** — animations communicate state, not decoration.
- Max duration: `200ms` for micro-interactions, `400ms` for page transitions.
- All animations `ease-out` or `cubic-bezier(0.16, 1, 0.3, 1)` (snappy).

### Animation Inventory

| Element | Trigger | Animation |
|---|---|---|
| Module load | Page/nav switch | Fade + slide up `0 8px → 0` over `250ms` |
| Process button press | Click | Scale `0.97` for `100ms` |
| Output area reveal | After processing | Fade in `opacity 0→1` over `200ms` |
| Stats bar | After processing | Slide in from left over `200ms` |
| Copy confirmation | Click | Color transition `200ms` |
| Badge pulse | Page load | Subtle opacity pulse once `800ms` |
| Input focus | Focus event | Glow expand `150ms` |

---

## 7. Empty & Error States

### Empty Input
```
  [ Paste email addresses here... ]
  
  One per line, or comma-separated
```

### Invalid Entries (inline in output)
```
✓  j***@company.com
✓  a***@internal.org
⚠  invalid-email-here     ← flagged row, yellow highlight
✓  m***@enterprise.com
```

### File Upload Error (Upload Report Cleaner)
```
┌─────────────────────────────────┐
│ ⚠ Could not detect required     │
│   columns in this file.          │
│                                  │
│ Expected: Source Path, File Name │
│ Found: [list actual columns]     │
└─────────────────────────────────┘
```

---

## 8. Accessibility

- All interactive elements keyboard-accessible (Tab order logical)
- Focus rings visible: `2px solid --accent-primary`
- Color not sole indicator (icons + labels for status)
- ARIA labels on all icon-only buttons
- Minimum contrast ratio 4.5:1 for all text
- `prefers-reduced-motion` respected — disable non-essential animations

---

## 9. Design Tokens Reference

```css
/* Spacing */
--space-1: 4px;   --space-2: 8px;   --space-3: 12px;
--space-4: 16px;  --space-6: 24px;  --space-8: 32px;

/* Radius */
--radius-sm: 3px;  --radius-md: 6px;  --radius-lg: 10px;

/* Shadow */
--shadow-card: 0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px --border-subtle;
--shadow-focus: 0 0 0 3px rgba(59, 130, 246, 0.15);

/* Transition */
--transition-fast: 0.1s ease-out;
--transition-base: 0.2s ease-out;
```

---

*Document Owner: DLP Platform Team*  
*Last Updated: 2026-03*
