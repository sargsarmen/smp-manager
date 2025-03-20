"use client"

import { useState, useMemo } from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isPast, parse } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { Shell } from "@/components/shell"
import { usePosts } from "@/context/post-context"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"

export default function ScheduleClientPage() {
  const { posts, deletePost } = usePosts()
  const { toast } = useToast()
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [postToDelete, setPostToDelete] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Filter only scheduled posts
  const scheduledPosts = useMemo(() => posts.filter((post) => post.status === "Scheduled"), [posts])

  // Get all days in the current month
  const daysInMonth = useMemo(() => {
    const start = startOfMonth(currentMonth)
    const end = endOfMonth(currentMonth)
    return eachDayOfInterval({ start, end })
  }, [currentMonth])

  // Navigate to previous month
  const prevMonth = () => {
    const prevMonthDate = new Date(currentMonth)
    prevMonthDate.setMonth(prevMonthDate.getMonth() - 1)
    setCurrentMonth(prevMonthDate)
  }

  // Navigate to next month
  const nextMonth = () => {
    const nextMonthDate = new Date(currentMonth)
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1)
    setCurrentMonth(nextMonthDate)
  }

  // Handle post deletion
  const handleCancelClick = (postId: string) => {
    setPostToDelete(postId)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (postToDelete) {
      // Close dialog first to prevent UI freeze
      setIsDeleteDialogOpen(false)

      // Delete the post
      deletePost(postToDelete)

      // Show success toast
      toast({
        title: "Post cancelled",
        description: "The scheduled post has been successfully cancelled.",
      })

      // Reset state
      setPostToDelete(null)
    }
  }

  const cancelDelete = () => {
    setPostToDelete(null)
    setIsDeleteDialogOpen(false)
  }

  // Get posts for a specific day
  const getPostsForDay = (day: Date) => {
    return scheduledPosts.filter((post) => {
      try {
        // Parse the post date string into a Date object
        // Handle different date formats
        let postDate: Date

        if (post.date.includes(",")) {
          // Format: "Apr 23, 2023"
          postDate = new Date(post.date)
        } else if (post.date.includes("-")) {
          // Format: "2023-04-23"
          postDate = parse(post.date, "yyyy-MM-dd", new Date())
        } else {
          // Try a generic parse as fallback
          postDate = new Date(post.date)
        }

        // Check if the postDate is valid
        if (isNaN(postDate.getTime())) {
          console.error("Invalid date:", post.date)
          return false
        }

        // Compare if the day, month, and year match
        return (
          postDate.getDate() === day.getDate() &&
          postDate.getMonth() === day.getMonth() &&
          postDate.getFullYear() === day.getFullYear()
        )
      } catch (e) {
        console.error("Error comparing dates:", e)
        return false
      }
    })
  }

  return (
    <Shell>
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Content Calendar</h1>
            <Link href="/posts/new">
              <Button type="button">
                <Plus className="mr-2 h-4 w-4" />
                Create New Post
              </Button>
            </Link>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-xl">{format(currentMonth, "MMMM yyyy")}</CardTitle>
                <CardDescription>{scheduledPosts.length} scheduled posts</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button type="button" variant="outline" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous month</span>
                </Button>
                <Button type="button" variant="outline" size="icon" onClick={() => setCurrentMonth(new Date())}>
                  <CalendarIcon className="h-4 w-4" />
                  <span className="sr-only">Today</span>
                </Button>
                <Button type="button" variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next month</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar header - days of week */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center font-medium text-sm py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before the start of month */}
                {Array.from({ length: daysInMonth[0].getDay() }).map((_, index) => (
                  <div key={`empty-start-${index}`} className="h-24 md:h-32 p-1 border rounded-md bg-muted/20"></div>
                ))}

                {/* Days of the month */}
                {daysInMonth.map((day) => {
                  const dayPosts = getPostsForDay(day)
                  const isCurrentDay = isToday(day)
                  const isPastDay = isPast(day) && !isToday(day)
                  // Format date for URL parameter (YYYY-MM-DD)
                  const formattedDate = format(day, "yyyy-MM-dd")

                  return (
                    <div
                      key={day.toString()}
                      className={cn(
                        "h-24 md:h-32 p-1 border rounded-md overflow-hidden flex flex-col",
                        isCurrentDay ? "border-primary bg-primary/5" : "",
                        isPastDay ? "bg-muted/20 opacity-60" : "hover:bg-muted/10",
                      )}
                    >
                      <div
                        className={cn(
                          "text-right text-sm font-medium mb-1",
                          isCurrentDay ? "text-primary" : "",
                          isPastDay ? "text-muted-foreground" : "",
                        )}
                      >
                        {format(day, "d")}
                      </div>

                      <div className="flex-1 overflow-y-auto space-y-1 pr-1 text-xs">
                        {dayPosts.map((post) => (
                          <Popover key={post.id}>
                            <PopoverTrigger asChild>
                              <div
                                className={cn(
                                  "rounded px-1.5 py-1 cursor-pointer truncate",
                                  isPastDay ? "bg-muted/30 hover:bg-muted/40" : "bg-primary/10 hover:bg-primary/20",
                                )}
                                title={post.title}
                              >
                                {post.time && <span className="font-medium mr-1">{post.time}</span>}
                                {post.title}
                              </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-72 p-3">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">{post.title}</h4>
                                  <Badge variant="outline">{post.platform}</Badge>
                                </div>
                                {post.content && (
                                  <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
                                )}
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <CalendarIcon className="h-3 w-3 mr-1" />
                                  {post.date} {post.time && `at ${post.time}`}
                                </div>
                                <div className="flex items-center justify-end gap-2 pt-2">
                                  <Link href={`/posts/${post.id}/edit`}>
                                    <Button type="button" variant="outline" size="sm">
                                      Edit
                                    </Button>
                                  </Link>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleCancelClick(post.id)}
                                    className="text-destructive hover:bg-destructive/10"
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        ))}

                        {/* Only show "Add" button for current and future dates */}
                        {dayPosts.length === 0 && !isPastDay && (
                          <div className="h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <Link href={`/posts/new?date=${formattedDate}&status=scheduled`}>
                              <Button type="button" variant="ghost" size="sm" className="h-6 text-xs">
                                <Plus className="h-3 w-3 mr-1" />
                                Add
                              </Button>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}

                {/* Empty cells for days after the end of month */}
                {Array.from({ length: 6 - daysInMonth[daysInMonth.length - 1].getDay() }).map((_, index) => (
                  <div key={`empty-end-${index}`} className="h-24 md:h-32 p-1 border rounded-md bg-muted/20"></div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to cancel this post?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove the scheduled post from your calendar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Keep Post</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Cancel Post
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Shell>
  )
}

