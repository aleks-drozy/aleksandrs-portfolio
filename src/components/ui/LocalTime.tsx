'use client'
import { useEffect, useState } from 'react'

// The navbar chronometer: real local time, ticking. Renders empty on the server
// and fills on mount, so there is no hydration mismatch.
export function LocalTime() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString('en-IE', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span
      className="hidden min-w-[72px] font-mono text-[11px] tabular-nums tracking-[0.18em] text-text-muted lg:inline"
      suppressHydrationWarning
      aria-hidden
    >
      {time}
    </span>
  )
}
