import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EngagementChart } from "@/components/analytics/engagement-chart"
import { PlatformBreakdown } from "@/components/analytics/platform-breakdown"
import { Shell } from "@/components/shell"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Analytics - Social Media Post Manager",
  description: "Track your social media performance",
}

// Helper function to render percentage change with appropriate styling
function PercentageChange({ value }: { value: number }) {
  const isPositive = value >= 0
  return (
    <div className={cn("flex items-center text-xs", isPositive ? "text-emerald-500" : "text-rose-500")}>
      {isPositive ? <ArrowUpIcon className="h-3 w-3 mr-1" /> : <ArrowDownIcon className="h-3 w-3 mr-1" />}
      <span>
        {isPositive ? "+" : ""}
        {value}% from last month
      </span>
    </div>
  )
}

export default function AnalyticsPage() {
  return (
    <Shell>
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          </div>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="transition-all hover:shadow-md hover:border-primary/20 hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,350</div>
                  <PercentageChange value={-18} />
                </CardContent>
              </Card>
              <Card className="transition-all hover:shadow-md hover:border-primary/20 hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Followers Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+1,253</div>
                  <PercentageChange value={10} />
                </CardContent>
              </Card>
              <Card className="transition-all hover:shadow-md hover:border-primary/20 hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Engagement Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.6%</div>
                  <PercentageChange value={0.8} />
                </CardContent>
              </Card>
              <Card className="transition-all hover:shadow-md hover:border-primary/20 hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Top Platform</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Instagram</div>
                  <PercentageChange value={27} />
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 transition-all hover:shadow-md hover:border-primary/20">
                <CardHeader>
                  <CardTitle>Engagement Over Time</CardTitle>
                  <CardDescription>Track your engagement metrics across all platforms</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <EngagementChart />
                </CardContent>
              </Card>
              <Card className="lg:col-span-3 col-span-4 transition-all hover:shadow-md hover:border-primary/20">
                <CardHeader>
                  <CardTitle>Platform Breakdown</CardTitle>
                  <CardDescription>Engagement distribution by platform</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <PlatformBreakdown />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </Shell>
  )
}