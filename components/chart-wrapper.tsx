"use client"

import { useEffect, useState, type ReactNode } from "react"

interface ChartWrapperProps {
  children: ReactNode
  height?: string | number
}

export function ChartWrapper({ children, height = "300px" }: ChartWrapperProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <p className="text-sm text-muted-foreground">Loading chart...</p>
      </div>
    )
  }

  return <div style={{ height }}>{children}</div>
}

