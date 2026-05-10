'use client'
import { motion } from 'framer-motion'
import { projects } from '@/lib/data'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { SectionHeader } from '@/components/ui/SectionHeader'

const EASE = [0.23, 1, 0.32, 1] as const

export function Projects() {
  const rest = projects.filter((p) => !p.featured)
  return (
    <section id="projects" className="px-[clamp(16px,4vw,32px)] py-28 md:py-24 sm:py-20">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeader eyebrow="More work" title="Other shipped projects." />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          className="grid gap-5 md:grid-cols-2"
        >
          {rest.map((project) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
