"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, Edit, AlertCircle } from "lucide-react"
import { usePosts } from "@/context/post-context"
import { useMemo } from "react"

export function UpcomingPosts() {
  const { posts } = usePosts()

  // Filter and sort upcoming posts (Scheduled and Draft)
  const upcomingPosts = useMemo(() => {
    return posts
      .filter((post) => post.status === "Scheduled" || post.status === "Draft")
      .sort((a, b) => {
        // Sort by status first (Scheduled before Draft)
        if (a.status !== b.status) {
          return a.status === "Scheduled" ? -1 : 1
        }

        // Then sort by date (if available)
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)

        if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
          return dateA.getTime() - dateB.getTime()
        }

        return 0
      })
      .slice(0, 4) // Limit to 4 posts for the dashboard
  }, [posts])

  if (upcomingPosts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10">
        <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
        <h3 className="text-lg font-medium">No upcoming posts</h3>
        <p className="text-sm text-muted-foreground mt-1">
          You don't have any scheduled or draft posts. Create a new post to get started.
        </p>
        <Link href="/posts/new" className="mt-4">
          <Button>Create New Post</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      {upcomingPosts.map((post) => (
        <Card key={post.id} className="flex flex-col justify-between transition-all hover:shadow-md hover:border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm sm:text-base md:text-lg lg:text-2xl truncate">{post.title}</CardTitle>
              <Badge variant={post.status === "Scheduled" ? "default" : "secondary"}>{post.status}</Badge>
            </div>
            <CardDescription>{post.platform}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row justify-between items-end space-y-4">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CalendarDays className="mr-1 h-4 w-4 text-primary" />
                  {post.date}
                </div>
                {post.time && (
                  <div className="items-center sm:hidden lg:flex">
                    <Clock className="mr-1 h-4 w-4 text-primary" />
                    {post.time}
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <Link href={`/posts/${post.id}/edit`}>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Edit className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

