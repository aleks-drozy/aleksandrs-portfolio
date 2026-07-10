import type { Metadata } from 'next'
import { Inter, Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  metadataBase: new URL('https://aleksandrs-portfolio.vercel.app'),
  title: 'Aleksandrs Drozdovs | Software Engineer',
  description: 'Dublin-based CS & Software Engineering graduate (Maynooth, 2026) building full-stack trading tools, Python backtesting infrastructure, and AI agents.',
  openGraph: {
    title: 'Aleksandrs Drozdovs | Software Engineer',
    description: 'Full-stack trading dashboard, Python backtest engine, NASDAQ-100 FYP strategy, and AI agents.',
    type: 'website',
    locale: 'en_IE',
    images: [{ url: '/og.png', width: 2400, height: 1260, alt: 'Aleksandrs Drozdovs - Software Engineer, Dublin' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aleksandrs Drozdovs | Software Engineer',
    description: 'Full-stack trading dashboard, Python backtest engine, NASDAQ-100 FYP strategy, and AI agents.',
    images: ['/og.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} font-sans bg-background text-text-primary`}>
        {children}
      </body>
    </html>
  )
}
