'use client'
import { motion } from 'framer-motion'
import { skillCategories } from '@/lib/data'
import { SkillIcon } from '@/components/ui/SkillIcon'
import { SectionHeader } from '@/components/ui/SectionHeader'

const EASE = [0.23, 1, 0.32, 1] as const

export function Skills() {
  return (
    <section id="skills" className="px-[clamp(16px,4vw,32px)] py-32 md:py-24 sm:py-20 bg-surface/20">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeader eyebrow="What I work with" title="Skills &amp;" accent="Tech Stack" />

        <div className="flex flex-col gap-10">
          {skillCategories.map((category) => (
            <div key={category.name}>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-text-muted">
                {category.name}
              </p>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
                className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
              >
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
                    }}
                  >
                    <SkillIcon name={skill.name} icon={skill.icon} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
