import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, MessageSquare, Share2 } from "lucide-react"

const recentPosts = [
  {
    id: 1,
    title: "10 Tips for Better Content",
    date: "2 hours ago",
    platform: "Instagram",
    engagement: {
      likes: 245,
      comments: 32,
      shares: 87,
    },
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    title: "New Product Launch Announcement",
    date: "Yesterday",
    platform: "Twitter",
    engagement: {
      likes: 189,
      comments: 24,
      shares: 45,
    },
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    title: "Behind the Scenes: Our Team",
    date: "2 days ago",
    platform: "Facebook",
    engagement: {
      likes: 320,
      comments: 56,
      shares: 32,
    },
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    title: "Customer Success Story: ABC Corp",
    date: "3 days ago",
    platform: "LinkedIn",
    engagement: {
      likes: 178,
      comments: 18,
      shares: 29,
    },
    image: "/placeholder.svg?height=100&width=100",
  },
]

export function RecentPosts() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      {recentPosts.map((post) => (
        <Card key={post.id} className="transition-all hover:shadow-md hover:border-primary/20">
          <CardHeader className="flex flex-row items-start gap-4 space-y-0">
            <Avatar className="h-12 w-12 rounded-md">
              <AvatarImage src={post.image} alt={post.title} />
              <AvatarFallback>{post.platform.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle className="text-sm sm:text-base md:text-lg lg:text-2xl truncate">{post.title}</CardTitle>
              <CardDescription>
                {post.platform} • {post.date}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Heart className="mr-1 h-4 w-4 text-primary" />
                {post.engagement.likes}
              </div>
              <div className="flex items-center">
                <MessageSquare className="mr-1 h-4 w-4 text-primary" />
                {post.engagement.comments}
              </div>
              <div className="flex items-center">
                <Share2 className="mr-1 h-4 w-4 text-primary" />
                {post.engagement.shares}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

