import { Toaster } from 'sonner'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '... | connectify',
  description: 'A rede social',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        <Toaster richColors />
      </body>
    </html>
  )
}
