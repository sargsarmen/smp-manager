"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ReactNode } from "react"

interface Tab {
  value: string
  label: string
  content: ReactNode
}

interface TabsWrapperProps {
  tabs: Tab[]
  defaultValue: string
  className?: string
}

export function TabsWrapper({ tabs, defaultValue, className }: TabsWrapperProps) {
  return (
    <Tabs defaultValue={defaultValue} className={className}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}

