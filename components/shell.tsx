import type { ReactNode } from "react"
import { SideNav } from "@/components/side-nav"
import { TopNav } from "@/components/top-nav"

interface ShellProps {
  children: ReactNode
}

export function Shell({ children }: ShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopNav />
      <div className="flex flex-1">
        <SideNav />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}

