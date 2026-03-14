import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'Aleksander Drozdovs — Developer & Algo Trader',
  description: 'Final year CS & Software Engineering student at Maynooth University. Algorithmic trader, Judo black belt, and software developer.',
  openGraph: {
    title: 'Aleksander Drozdovs — Developer & Algo Trader',
    description: 'Final year CS & Software Engineering student at Maynooth University.',
    type: 'website',
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
