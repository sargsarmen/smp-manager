"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import type { ReactNode } from "react"

interface SheetWrapperProps {
  trigger: ReactNode
  children: ReactNode
  side?: "top" | "right" | "bottom" | "left"
  className?: string
}

export function SheetWrapper({ trigger, children, side = "right", className }: SheetWrapperProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side={side} className={className}>
        {children}
      </SheetContent>
    </Sheet>
  )
}

