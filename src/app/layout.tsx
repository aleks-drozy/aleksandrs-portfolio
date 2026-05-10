import type { Metadata } from 'next'
import { Inter, Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'Aleksandrs Drozdovs | Software Engineer',
  description: 'Dublin-based final-year CS & Software Engineering student building full-stack trading tools, Python backtesting infrastructure, and quantitative research systems.',
  openGraph: {
    title: 'Aleksandrs Drozdovs | Software Engineer',
    description: 'Full-stack trading dashboard, Python backtest engine, and NASDAQ-100 FYP strategy.',
    type: 'website',
    locale: 'en_IE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aleksandrs Drozdovs | Software Engineer',
    description: 'Full-stack trading dashboard, Python backtest engine, and NASDAQ-100 FYP strategy.',
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
