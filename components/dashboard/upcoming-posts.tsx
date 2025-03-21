import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock } from "lucide-react"

const upcomingPosts = [
  {
    id: 1,
    title: "Weekly Product Showcase",
    date: "Tomorrow",
    time: "10:00 AM",
    platform: "Instagram",
    status: "Scheduled",
  },
  {
    id: 2,
    title: "Industry News Roundup",
    date: "Friday",
    time: "2:30 PM",
    platform: "Twitter",
    status: "Draft",
  },
  {
    id: 3,
    title: "Customer Testimonial Video",
    date: "Next Monday",
    time: "12:00 PM",
    platform: "Facebook",
    status: "Scheduled",
  },
  {
    id: 4,
    title: "Monthly Newsletter",
    date: "Next Wednesday",
    time: "9:00 AM",
    platform: "LinkedIn",
    status: "Draft",
  },
]

export function UpcomingPosts() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      {upcomingPosts.map((post) => (
        <Card key={post.id} className="flex flex-col justify-between transition-all hover:shadow-md hover:border-primary/20">
          <CardHeader>
            <div className="flex items-baseline justify-between">
              <CardTitle className="text-sm sm:text-base md:text-lg lg:text-2xl truncate">{post.title}</CardTitle>
              <Badge variant={post.status === "Scheduled" ? "default" : "secondary"}>{post.status}</Badge>
            </div>
            <CardDescription>{post.platform}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CalendarDays className="mr-1 h-4 w-4 text-primary" />
                {post.date}
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4 text-primary" />
                {post.time}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

