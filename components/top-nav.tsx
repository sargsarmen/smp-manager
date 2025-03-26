"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SideNav } from "@/components/side-nav"

export function TopNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72">
          <div className="mt-6 flex flex-col gap-4">
            <div className="px-2 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Navigation</h2>
              <SideNav isMobile={true} onNavigate={() => setIsOpen(false)} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex-1">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-lg font-bold md:text-xl">SMP Manager</span>
        </Link>
      </div>
    </header>
  )
}