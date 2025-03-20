import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, MessageSquare, Heart, Share2 } from "lucide-react"
import Link from "next/link"
import { Overview } from "@/components/dashboard/overview"
import { RecentPosts } from "@/components/dashboard/recent-posts"
import { UpcomingPosts } from "@/components/dashboard/upcoming-posts"
import { Shell } from "@/components/shell"

export const metadata: Metadata = {
  title: "Dashboard - Social Media Post Manager",
  description: "Manage your social media posts with scheduling and analytics features",
}

export default function DashboardPage() {
  return (
    <Shell>
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <div className="flex items-center gap-2">
              <Button asChild>
                <Link href="/posts/new">Create New Post</Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="transition-all hover:shadow-md hover:border-primary/20 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                <MessageSquare className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">142</div>
                <p className="text-xs text-muted-foreground">+22% from last month</p>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-md hover:border-primary/20 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement</CardTitle>
                <Heart className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,350</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-md hover:border-primary/20 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Followers</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.5K</div>
                <p className="text-xs text-muted-foreground">+10% from last month</p>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-md hover:border-primary/20 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Shares</CardTitle>
                <Share2 className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">573</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="recent">Recent Posts</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Posts</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 transition-all hover:shadow-md hover:border-primary/20">
                  <CardHeader>
                    <CardTitle>Performance Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3 transition-all hover:shadow-md hover:border-primary/20">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your post performance in the last 7 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center rounded-md p-2 transition-colors hover:bg-muted/50">
                        <div className="flex items-center gap-2 rounded-md bg-primary/10 p-2">
                          <Heart className="h-4 w-4 text-primary" />
                        </div>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">Highest engagement day</p>
                          <p className="text-sm text-muted-foreground">Tuesday with 450+ likes</p>
                        </div>
                        <div className="ml-auto font-medium text-primary">+24%</div>
                      </div>
                      <div className="flex items-center rounded-md p-2 transition-colors hover:bg-muted/50">
                        <div className="flex items-center gap-2 rounded-md bg-primary/10 p-2">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">New followers</p>
                          <p className="text-sm text-muted-foreground">128 new followers this week</p>
                        </div>
                        <div className="ml-auto font-medium text-primary">+10%</div>
                      </div>
                      <div className="flex items-center rounded-md p-2 transition-colors hover:bg-muted/50">
                        <div className="flex items-center gap-2 rounded-md bg-primary/10 p-2">
                          <Share2 className="h-4 w-4 text-primary" />
                        </div>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">Most shared post</p>
                          <p className="text-sm text-muted-foreground">"10 Tips for Better Content" with 87 shares</p>
                        </div>
                        <div className="ml-auto font-medium text-primary">+18%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="recent" className="space-y-4">
              <RecentPosts />
            </TabsContent>
            <TabsContent value="upcoming" className="space-y-4">
              <UpcomingPosts />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </Shell>
  )
}

