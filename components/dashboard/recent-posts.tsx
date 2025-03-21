"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageSquare, Share2, Edit, AlertCircle } from "lucide-react"
import { usePosts } from "@/context/post-context"
import { useMemo } from "react"

export function RecentPosts() {
  const { posts } = usePosts()

  // Filter and sort recent posts (Published only)
  const recentPosts = useMemo(() => {
    return posts
      .filter((post) => post.status === "Published")
      .sort((a, b) => {
        // Sort by date (newest first)
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)

        if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
          return dateB.getTime() - dateA.getTime()
        }

        return 0
      })
      .slice(0, 4) // Limit to 4 posts for the dashboard
  }, [posts])

  // Function to get engagement badge styling
  const getEngagementBadgeStyle = (engagement: string) => {
    return engagement === "High"
      ? "border-green-500 text-green-500"
      : engagement === "Medium"
        ? "border-yellow-500 text-yellow-500"
        : "border-red-500 text-red-500"
  }

  if (recentPosts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10">
        <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
        <h3 className="text-lg font-medium">No published posts</h3>
        <p className="text-sm text-muted-foreground mt-1">
          You don't have any published posts yet. Create and publish a post to see it here.
        </p>
        <Link href="/posts/new" className="mt-4">
          <Button>Create New Post</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      {recentPosts.map((post) => (
        <Card key={post.id} className="transition-all hover:shadow-md hover:border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm sm:text-base md:text-lg lg:text-2xl truncate">{post.title}</CardTitle>
            </div>
            <CardDescription>
              {post.platform} • {post.date}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row justify-between items-end space-y-4">
              <div className="flex space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Heart className="mr-1 h-4 w-4 text-primary" />
                  {post.engagement === "High" ? "200+" : post.engagement === "Medium" ? "100+" : "50+"}
                </div>
                <div className="flex items-center ml-0">
                  <MessageSquare className="mr-1 h-4 w-4 text-primary" />
                  {post.engagement === "High" ? "30+" : post.engagement === "Medium" ? "15+" : "5+"}
                </div>
                <div className="flex items-center ml-0">
                  <Share2 className="mr-1 h-4 w-4 text-primary" />
                  {post.engagement === "High" ? "50+" : post.engagement === "Medium" ? "25+" : "10+"}
                </div>
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

