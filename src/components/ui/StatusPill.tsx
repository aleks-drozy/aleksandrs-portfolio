type Props = { label: string; className?: string }

export function StatusPill({ label, className = '' }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-md border border-border bg-surface/90 px-3 py-1 text-xs font-mono uppercase text-text-secondary ${className}`}
    >
      <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-signal-green" aria-hidden />
      <span>{label}</span>
    </span>
  )
}
