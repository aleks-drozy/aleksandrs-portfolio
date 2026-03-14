'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import type { Project } from '@/lib/data'

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <motion.div whileHover={{ y: -4, borderColor: '#6366f1' }} transition={{ duration: 0.2 }}
      className={`relative bg-surface border border-border rounded-2xl overflow-hidden flex flex-col ${featured ? 'md:col-span-2' : ''}`}>
      <div className="h-[2px]" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}/>
      <div className="p-6 flex flex-col flex-1 gap-4">
        <div>
          <h3 className="font-display text-xl font-bold text-text-primary mb-1">{project.title}</h3>
          <p className="text-text-muted text-sm leading-relaxed">{featured && project.longDescription ? project.longDescription : project.description}</p>
        </div>
        {featured && project.metrics && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((m) => (
              <div key={m.label} className="bg-background rounded-lg p-3 text-center border border-border">
                <p className="text-lg font-bold font-display" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{m.value}</p>
                <p className="text-text-muted text-xs font-mono mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs font-mono px-2 py-1 rounded-md bg-background border border-border text-text-muted">{tag}</span>
          ))}
        </div>
        <div className="mt-auto pt-2">
          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent-from transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            View on GitHub
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
