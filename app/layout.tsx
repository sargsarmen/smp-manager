import type { ReactNode } from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { PostProvider } from "@/context/post-context"
import { Toaster } from "sonner"
import { TopNav } from "@/components/top-nav"
import { SideNav } from "@/components/side-nav"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <PostProvider><div className="flex min-h-screen flex-col">
          <TopNav />
          <div className="flex flex-1">
            <SideNav />
            <div className="flex-1 w-full">{children}</div>
          </div>
        </div>
        </PostProvider>
        <Toaster
          position="bottom-right"
          theme="light"
          closeButton
          richColors
        />
      </body>
    </html>
  )
}

