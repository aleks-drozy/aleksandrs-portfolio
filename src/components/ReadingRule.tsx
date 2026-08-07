'use client'

import { motion, useScroll } from 'motion/react'

// This component has no useReducedMotion branch because it is not
// a time-based animation. scaleX is driven strictly 1:1 by scrollYProgress,
// a position indicator that reflects where the reader already is, not
// autonomous motion. That is consistent with WCAG motion guidance, and the
// global prefers-reduced-motion CSS in globals.css does not need to
// suppress it.
export function ReadingRule() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-cobalt"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
