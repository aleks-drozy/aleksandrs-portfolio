'use client'

import { useId, useState, type ReactNode } from 'react'

type DisclosureProps = {
  label: string
  hint?: string
  children: ReactNode
}

// Progressive disclosure for heavy interactive figures. Children are not
// mounted until opened, so a closed panel costs no WebGL context and no
// bundle execution; a reader who skims past it pays nothing.
export function Disclosure({ label, hint, children }: DisclosureProps) {
  const [open, setOpen] = useState(false)
  const id = useId()

  return (
    <div className="border-t border-hair">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between gap-6 py-4 text-left font-mono text-xs tracking-[0.06em] text-cobalt transition-colors hover:text-cobalt-deep"
      >
        <span>
          {label}
          {hint && <span className="ml-3 text-[10px] uppercase tracking-[0.12em] text-ink-3">{hint}</span>}
        </span>
        <span aria-hidden="true" className="shrink-0 text-ink-3">
          {open ? '− close' : '+ open'}
        </span>
      </button>
      {open && (
        <div id={id} className="pb-8">
          {children}
        </div>
      )}
    </div>
  )
}
