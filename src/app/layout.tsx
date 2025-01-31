import './globals.css'
import 'dayjs/locale/pt-br'

import dayjs from 'dayjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

dayjs.locale('pt-br')

export const metadata: Metadata = {
  title: 'E-mail dashboard',
  description: 'Dashboard para administrar e-mails',
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <Toaster richColors />
        {children}
        {modal}
      </body>
    </html>
  )
}
