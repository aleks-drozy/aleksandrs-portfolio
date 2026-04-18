import type { Metadata } from 'next'
import { Inter, Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'Aleksandrs Drozdovs | Software Engineer + Quant Developer',
  description: 'Final year Computer Science & Software Engineering student at Maynooth University. I build software and trade NASDAQ-100 futures on a funded account.',
  openGraph: {
    title: 'Aleksandrs Drozdovs | Software Engineer + Quant Developer',
    description: 'Final year CS & SWE at Maynooth. Building at the intersection of code and markets.',
    type: 'website',
    locale: 'en_IE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aleksandrs Drozdovs | Software Engineer + Quant Developer',
    description: 'Final year CS & SWE at Maynooth. Building at the intersection of code and markets.',
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
