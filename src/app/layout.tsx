import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'TikTok Downloader - Download TikTok Videos Without Watermarks',
  description:
    'Free TikTok video downloader. Download TikTok videos without watermarks in high quality.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        <link rel='icon' href='/favicon.ico' sizes='32x32' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.svg' />
        <link rel='manifest' href='/manifest.json' />
        <meta name='theme-color' content='#ff0050' />
        <meta name='msapplication-TileColor' content='#ff0050' />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
