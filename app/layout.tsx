import type { ReactNode } from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { PostProvider } from "@/context/post-context"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <PostProvider>{children}</PostProvider>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
