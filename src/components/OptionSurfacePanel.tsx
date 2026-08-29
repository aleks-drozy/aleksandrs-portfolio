'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { useInView, useReducedMotion } from 'framer-motion'
import { OptionSurfaceHeatmap } from './OptionSurfaceHeatmap'

const OptionSurfaceScene = dynamic(() => import('./OptionSurfaceScene'), {
  ssr: false,
  loading: () => <OptionSurfaceHeatmap />,
})

export function OptionSurfacePanel() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '200px' })
  const reduce = useReducedMotion()

  return (
    <div ref={ref} className="py-7">
      {reduce ? <OptionSurfaceHeatmap /> : inView ? <OptionSurfaceScene /> : <div className="aspect-[16/9] w-full" />}
    </div>
  )
}
