"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FileText, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

interface SideNavProps {
  isMobile?: boolean
  onNavigate?: () => void
}

const sidebarNavItems = [
  {
    title: "Posts",
    href: "/",
    icon: FileText,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
]

export function SideNav({ isMobile = false, onNavigate }: SideNavProps) {
  const pathname = usePathname()

  const handleNavigation = () => {
    if (isMobile && onNavigate) {
      onNavigate()
    }
  }

  return (
    <div className={cn("border-r bg-background", isMobile ? "border-0" : "hidden md:block")}>
      <div className="flex h-full flex-col p-4">
        <nav className="grid gap-1 pt-4">
          {sidebarNavItems.map((item, index) => {
            // Check if we're on the home page or posts page
            const isActive =
              (pathname === item.href) ||
              (item.href === "/" && pathname.startsWith("/posts"))

            return (
              <Link key={index} href={item.href} className="flex items-center" onClick={handleNavigation}>
                <Button
                  type="button"
                  variant="ghost"
                  className={cn(
                    "justify-start w-full",
                    isActive && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                    isMobile && "h-12 text-base",
                  )}
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
