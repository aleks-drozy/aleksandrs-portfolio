'use client'
import { motion } from 'framer-motion'
import { skillCategories } from '@/lib/data'
import { SkillIcon } from '@/components/ui/SkillIcon'

export function Skills() {
  return (
    <section id="skills" className="py-24 px-4 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
          <p className="text-text-muted text-sm font-mono tracking-widest uppercase mb-2">What I work with</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">Skills & <span style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Tech Stack</span></h2>
        </motion.div>
        <div className="space-y-10">
          {skillCategories.map((category) => (
            <div key={category.name}>
              <p className="text-text-muted text-xs font-mono tracking-widest uppercase mb-4">{category.name}</p>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {category.skills.map((skill) => (
                  <motion.div key={skill.name} variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}>
                    <SkillIcon name={skill.name} icon={skill.icon}/>
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
