import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Football Results App',
  description: 'Application for viewing and managing football results.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="mytheme">
      <body className={inter.className}>
        <div className="flex flex-col h-screen justify-between">
          <header className="bg-primary-color h-24 w-full text-white flex items-center">
            <Link
              className="text-3xl font-bold pl-8 hover:text-gray-300"
              href="/"
            >
              Football Resluts
            </Link>
          </header>
          <main className="mb-auto p-8">{children}</main>
          <footer className="bg-primary-color h-12 w-full flex justify-end items-end flex-shrink-0 text-white px-4 space-x-12">
            <Link
              className="my-auto px-8 py-1 btn btn-sm btn-secondary"
              href="/login"
            >
              Admin
            </Link>
            <span className="my-auto">© 2023 Football Results</span>
          </footer>
        </div>
      </body>
    </html>
  )
}
