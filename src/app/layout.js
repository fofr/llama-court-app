import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Llama Court',
  description: 'Famous characters deliberate on humorous course cases',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Llama Court – Replicate</title>
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content="https://llama-court.replicate.dev/og.webp" />
        <meta property="og:url" content="https://llama-court.replicate.dev" />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://llama-court.replicate.dev" />
        <meta property="twitter:title" content={metadata.title} />
        <meta property="twitter:description" content={metadata.description} />
        <meta property="twitter:image" content="https://llama-court.replicate.dev/og.webp" />
      </head>
      <body className={inter.className}>{children}</body>
      <Analytics />
    </html>
  )
}
