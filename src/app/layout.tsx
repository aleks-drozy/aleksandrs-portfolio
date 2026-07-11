import type { Metadata } from 'next'
import { Fraunces } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://aleksandrs-portfolio.vercel.app'),
  title: 'Aleksandrs Drozdovs | Software Engineer',
  description:
    'Dublin-based Computer Science & Software Engineering graduate (Maynooth, 2026). Ships production full-stack SaaS, agentic AI systems, and systematic trading tools — tested, documented, and honest about the results.',
  keywords: [
    'Aleksandrs Drozdovs',
    'Software Engineer',
    'Dublin',
    'Full-stack developer',
    'Next.js',
    'TypeScript',
    'Supabase',
    'AI agents',
    'Quantitative developer',
    'Graduate software engineer',
  ],
  authors: [{ name: 'Aleksandrs Drozdovs' }],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Aleksandrs Drozdovs | Software Engineer',
    description:
      'CS & Software Engineering graduate (Maynooth, 2026). Full-stack SaaS, agentic AI, and systematic trading systems — tested and documented.',
    type: 'website',
    locale: 'en_IE',
    url: 'https://aleksandrs-portfolio.vercel.app',
    siteName: 'Aleksandrs Drozdovs',
    images: [{ url: '/og.png', width: 2400, height: 1260, alt: 'Aleksandrs Drozdovs — Software Engineer, Dublin' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aleksandrs Drozdovs | Software Engineer',
    description:
      'CS & Software Engineering graduate (Maynooth, 2026). Full-stack SaaS, agentic AI, and systematic trading systems.',
    images: ['/og.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
