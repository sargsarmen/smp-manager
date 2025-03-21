import type { ReactNode } from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { PostProvider } from "@/context/post-context"
import { Toaster } from "@/components/ui/toaster"

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
        <Toaster />
      </body>
    </html>
  )
}

