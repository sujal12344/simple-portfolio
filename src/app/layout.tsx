import { ThemeProvider } from '@/components/theme-provider'
import './global.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Poppins } from 'next/font/google'

const poppins = Poppins({subsets:['latin'],weight:['500']})

export const metadata: Metadata = {
  title: 'Sujal Portfolio',
  description: 'Portfolio of Dhrish Parekh, A full stack developer and a curious mind',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en " suppressHydrationWarning >
      <body className={`${poppins.className} bg-primary-foreground`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        </ThemeProvider>
        </body>
    </html>
  )
}
