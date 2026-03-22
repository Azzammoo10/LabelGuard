import { useState, useCallback } from 'react'

// ─── Return type ──────────────────────────────────────────────────────────────
interface UseClipboardReturn {
  copy:   (text: string) => Promise<void>
  copied: boolean
}

/**
 * Copies text to the clipboard using the native Web API.
 * `copied` flips true for `resetMs` milliseconds then resets.
 * No external library — navigator.clipboard only (TECH_RULES.md Section 3.3).
 */
export function useClipboard(resetMs = 1500): UseClipboardReturn {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(
    async (text: string) => {
      if (!navigator.clipboard) return

      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), resetMs)
      } catch {
        // Silently ignore — clipboard permission denied in some contexts
      }
    },
    [resetMs],
  )

  return { copy, copied }
}
