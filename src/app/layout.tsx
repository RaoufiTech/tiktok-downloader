import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { siteConfig } from '@/config/site'

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
    'Free TikTok video downloader. Download TikTok videos without watermarks in high quality. Fast, secure, and easy to use.',
  keywords: [
    'TikTok downloader',
    'download TikTok videos',
    'TikTok video downloader',
    'no watermark',
    'TikTok without watermark',
    'free TikTok downloader',
    'TikTok video saver',
    'TikTok MP4',
    'save TikTok videos',
    'TikTok content downloader',
    'social media downloader',
    'video downloader',
  ],
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.links.github,
    },
  ],
  creator: siteConfig.links.github,
  publisher: siteConfig.links.github,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.mohamedgado.site'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'TikTok Downloader - Download Videos Without Watermarks',
    description:
      'Free TikTok video downloader. Download TikTok videos without watermarks in high quality. Fast, secure, and easy to use.',
    url: siteConfig.links.github,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        alt: siteConfig.name,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: siteConfig.twitterTag,
    site: siteConfig.twitterTag,
    images: [
      {
        url: siteConfig.ogImage,
        alt: siteConfig.name,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
    // yandex: 'your-yandex-verification-code', // Add if needed
    // yahoo: 'your-yahoo-verification-code', // Add if needed
  },
  category: 'technology',
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
        <Analytics />
      </body>
    </html>
  )
}
