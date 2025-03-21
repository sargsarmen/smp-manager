import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageSquare, Share2 } from "lucide-react"

const topPosts = [
  {
    id: 1,
    title: "10 Tips for Better Content",
    platform: "Instagram",
    date: "Apr 23, 2025",
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
    platform: "Twitter",
    date: "Apr 22, 2025",
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
    platform: "Facebook",
    date: "Apr 21, 2025",
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
    platform: "LinkedIn",
    date: "Apr 20, 2025",
    engagement: {
      likes: 178,
      comments: 18,
      shares: 29,
    },
    image: "/placeholder.svg?height=100&width=100",
  },
]

export function TopPosts() {
  return (
    <div className="space-y-4">
      {topPosts.map((post) => (
        <div
          key={post.id}
          className="flex items-start gap-4 rounded-lg border p-4 transition-all hover:shadow-md hover:border-primary/20"
        >
          <Avatar className="h-12 w-12 rounded-md">
            <AvatarImage src={post.image} alt={post.title} />
            <AvatarFallback>{post.platform.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-baseline justify-between">
              <h3 className="font-medium">{post.title}</h3>
              <Badge variant="outline">{post.platform}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{post.date}</p>
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
          </div>
        </div>
      ))}
    </div>
  )
}

