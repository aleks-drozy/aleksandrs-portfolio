import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'NoteIt | Aleksandrs Drozdovs',
  description: 'Full-stack note-taking app with role-based auth, CRUD notes, sharing, and publishing.',
}

const FEATURES = [
  { title: 'Role-based authentication', body: 'Users have distinct roles with different permissions. Auth state managed server-side and propagated to the React frontend via context.' },
  { title: 'CRUD + sharing', body: 'Create, read, update, and delete notes. Notes can be shared with other users or published publicly — each with its own permission model.' },
  { title: 'Separated concerns', body: 'Backend is a standalone Node.js REST API (port 5000). Frontend is a React + Vite SPA (port 5173). Neither knows how the other is implemented.' },
  { title: 'MongoDB persistence', body: 'Data layer uses MongoDB running locally. Backend abstracts all queries behind service functions — no raw DB calls in route handlers.' },
  { title: 'Jest test suite', body: 'Backend logic covered by Jest. Test config isolated from source via jest.config.js — tests run independently of the dev server.' },
  { title: 'API documentation', body: 'REST endpoints documented in the backend docs/ folder. Clear contract between frontend and backend makes the API independently testable.' },
]

const STACK = ['JavaScript', 'Node.js', 'Express', 'MongoDB', 'React', 'Vite', 'Jest']

export default function NoteItPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <article className="px-[clamp(16px,4vw,32px)] py-20 md:py-24">
          <div className="mx-auto max-w-[900px]">
            <Link
              href="/#projects"
              className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase text-text-muted transition-colors hover:text-proof"
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to projects
            </Link>

            <header className="mb-12">
              <p className="mb-3 font-mono text-[11px] uppercase text-proof">Project / Full-Stack</p>
              <h1 className="font-display text-4xl font-bold leading-[1.1] text-text-primary sm:text-5xl md:text-6xl">
                Note<span className="text-proof">It</span>
              </h1>
              <p className="mt-4 max-w-[640px] text-lg leading-relaxed text-text-secondary">
                A full-stack note-taking application with role-based authentication, note sharing, and publishing.
                Built as two completely separate services: a Node.js REST API backend and a React + Vite frontend,
                communicating over HTTP.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {STACK.map((tag) => (
                  <span key={tag} className="rounded-md border border-border bg-surface px-2 py-1 font-mono text-xs text-text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <section className="mb-16 grid gap-4 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <div key={f.title} className="proof-panel rounded-md p-5">
                  <p className="mb-2 font-display text-base font-semibold text-text-primary">{f.title}</p>
                  <p className="text-sm leading-relaxed text-text-secondary">{f.body}</p>
                </div>
              ))}
            </section>

            <section className="mb-16">
              <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">Architecture</h2>
              <div className="rounded-xl border border-border bg-surface p-6 font-mono text-sm text-text-secondary leading-relaxed">
                <p className="mb-3 text-proof">noteit/</p>
                <p className="ml-4 mb-1">backend/           <span className="text-text-muted">Node.js + Express REST API</span></p>
                <p className="ml-8 mb-1">src/               <span className="text-text-muted">Routes, controllers, models</span></p>
                <p className="ml-8 mb-1">tests/             <span className="text-text-muted">Jest test suite</span></p>
                <p className="ml-8 mb-3">server.js          <span className="text-text-muted">Entry point, port 5000</span></p>
                <p className="ml-4 mb-1">frontend/          <span className="text-text-muted">React + Vite SPA</span></p>
                <p className="ml-8 mb-1">src/pages/         <span className="text-text-muted">Route-level components</span></p>
                <p className="ml-8 mb-1">src/components/    <span className="text-text-muted">Reusable UI</span></p>
                <p className="ml-8">src/context/       <span className="text-text-muted">Auth state management</span></p>
              </div>
            </section>

            <section className="border-t border-border pt-10">
              <div className="flex flex-wrap gap-3">
                <Link
                  href="https://github.com/aleks-drozy/noteit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary active:scale-[0.97]"
                >
                  View on GitHub
                </Link>
                <Link
                  href="/#projects"
                  className="btn-secondary active:scale-[0.97]"
                >
                  Back to projects
                </Link>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
