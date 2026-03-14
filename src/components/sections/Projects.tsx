'use client'
import { motion } from 'framer-motion'
import { projects } from '@/lib/data'
import { ProjectCard } from '@/components/ui/ProjectCard'

export function Projects() {
  const featured = projects.find((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)
  return (
    <section id="projects" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
          <p className="text-text-muted text-sm font-mono tracking-widest uppercase mb-2">What I&apos;ve built</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold"><span style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Projects</span></h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid md:grid-cols-2 gap-5">
          {featured && (
            <motion.div variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="md:col-span-2">
              <ProjectCard project={featured} featured/>
            </motion.div>
          )}
          {rest.map((project) => (
            <motion.div key={project.id} variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
              <ProjectCard project={project}/>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
