'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { useInView, useReducedMotion } from 'framer-motion'
import { VolSmileChart } from './VolSmileChart'

const VolSmileScene = dynamic(() => import('./VolSmileScene'), {
  ssr: false,
  loading: () => <VolSmileChart />,
})

export function VolSmilePanel() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '200px' })
  const reduce = useReducedMotion()

  return (
    <div ref={ref} className="py-7">
      {reduce ? <VolSmileChart /> : inView ? <VolSmileScene /> : <div className="aspect-[16/9] w-full" />}
    </div>
  )
}
