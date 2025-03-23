import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EngagementChart } from "@/components/analytics/engagement-chart"
import { PlatformBreakdown } from "@/components/analytics/platform-breakdown"
import { Shell } from "@/components/shell"

export const metadata: Metadata = {
  title: "Analytics - Social Media Post Manager",
  description: "Track your social media performance",
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
              <Card className="transition-all hover:shadow-md hover:border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,350</div>
                  <p className="text-xs text-muted-foreground">+18% from last month</p>
                </CardContent>
              </Card>
              <Card className="transition-all hover:shadow-md hover:border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Followers Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+1,253</div>
                  <p className="text-xs text-muted-foreground">+10% from last month</p>
                </CardContent>
              </Card>
              <Card className="transition-all hover:shadow-md hover:border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Engagement Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.6%</div>
                  <p className="text-xs text-muted-foreground">+0.8% from last month</p>
                </CardContent>
              </Card>
              <Card className="transition-all hover:shadow-md hover:border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Top Platform</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Instagram</div>
                  <p className="text-xs text-muted-foreground">42% of total engagement</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 transition-all hover:shadow-md hover:border-primary/20">
                <CardHeader>
                  <CardTitle>Engagement Over Time</CardTitle>
                  <CardDescription>Track your engagement metrics across all platforms</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <EngagementChart />
                </CardContent>
              </Card>
              <Card className="lg:col-span-3 col-span-4 transition-all hover:shadow-md hover:border-primary/20">
                <CardHeader>
                  <CardTitle>Platform Breakdown</CardTitle>
                  <CardDescription>Engagement distribution by platform</CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
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