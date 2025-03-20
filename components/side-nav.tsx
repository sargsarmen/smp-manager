"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, CalendarDays, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Posts",
    href: "/posts",
    icon: FileText,
  },
  {
    title: "Schedule",
    href: "/schedule",
    icon: CalendarDays,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
]

export function SideNav() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-background md:block">
      <div className="flex h-full flex-col p-4">
        <nav className="grid gap-1 pt-4">
          {sidebarNavItems.map((item, index) => {
            const isActive = pathname === item.href
            return (
              <Link key={index} href={item.href} className="flex items-center">
                <Button
                  type="button"
                  variant="ghost"
                  className={cn("justify-start w-full", isActive && "bg-primary text-primary-foreground")}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

