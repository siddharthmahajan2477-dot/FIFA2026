import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { FloatingNavBar } from '@/components/FloatingNavBar'
import { IntroVideo } from '@/components/IntroVideo'
import { FirebaseProvider } from '@/components/FirebaseProvider'
import { AuthProvider } from '@/context/AuthProvider'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'FIFA World Cup 2026 - Smart Stadium Operating System',
    template: '%s | FIFA World Cup 2026',
  },
  description: 'Your complete fan experience platform for FIFA World Cup 2026. Live matches, statistics, tickets, stadium navigation, operations management, and AI intelligence.',
  keywords: ['FIFA', 'World Cup', '2026', 'Stadium', 'Smart', 'Operations', 'Fan Experience'],
  generator: 'v0.app',
  applicationName: 'FIFA World Cup 2026 Smart Stadium OS',
  referrer: 'strict-origin-when-cross-origin',
  creator: 'Vercel',
  publisher: 'Vercel',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fifa-world-cup-2026.vercel.app',
    siteName: 'FIFA World Cup 2026 Smart Stadium OS',
    title: 'FIFA World Cup 2026 - Smart Stadium Operating System',
    description: 'Complete platform for fan experience and stadium operations',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@vercel',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
  interactiveWidget: 'resizes-content',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <AuthProvider>
          <FirebaseProvider />
          <IntroVideo />
          <FloatingNavBar />
          {children}
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
