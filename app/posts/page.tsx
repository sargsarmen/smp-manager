"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Plus, Trash2, Calendar, Clock, Edit, Undo, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { usePosts, type Post } from "@/context/post-context"
import { useState } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { toast } from "sonner"

export default function PostsPage() {
  const { posts, deletePost, restorePost } = usePosts()
  const [postToDelete, setPostToDelete] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Check if the screen is mobile
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Handle post deletion
  const handleDeleteClick = (postId: string) => {
    setPostToDelete(postId)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (postToDelete) {
      // Close dialog first to prevent UI freeze
      setIsDeleteDialogOpen(false)

      // Delete the post and get the deleted post for potential restoration
      const { deletedPost, deletedIndex } = deletePost(postToDelete)

      if (deletedPost) {
        // Show success toast with undo option
        toast("Post deleted", {
          description: `"${deletedPost.title}" has been deleted.`,
          action: {
            label: "Undo",
            onClick: () => handleUndoDelete(deletedPost, deletedIndex),
          }
        })
      }

      // Reset state
      setPostToDelete(null)
    }
  }

  const cancelDelete = () => {
    setPostToDelete(null)
    setIsDeleteDialogOpen(false)
  }

  // Handle undo delete
  const handleUndoDelete = (post: Post, deletedIndex?: number) => {
    restorePost(post, deletedIndex)

    toast("Post restored", {
      description: `"${post.title}" has been restored.`,
    })
  }

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    return status === "Published" ? "default" : status === "Scheduled" ? "outline" : "secondary"
  }

  // Get engagement badge styling
  const getEngagementBadgeStyle = (engagement?: string) => {
    if (!engagement) return ""
    return engagement === "High"
      ? "border-green-500 text-green-500"
      : engagement === "Medium"
        ? "border-yellow-500 text-yellow-500"
        : "border-red-500 text-red-500"
  }

  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
            <Link href="/posts/new">
              <Button type="button">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Create Post</span>
                <span className="sm:hidden">New</span>
              </Button>
            </Link>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>All Posts</CardTitle>
                <CardDescription>Manage your social media posts across all platforms.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Desktop Table View */}
                {!isMobile && (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Platform</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Engagement</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {posts.length > 0 ? (
                          posts.map((post) => (
                            <TableRow key={post.id}>
                              <TableCell className="font-medium">{post.title}</TableCell>
                              <TableCell>
                                <Badge variant={getStatusBadgeVariant(post.status)}>{post.status}</Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">

                                  {post.platform === "Facebook" && <Facebook height={24} width={24} />}
                                  {post.platform === "LinkedIn" && <Linkedin height={24} width={24} />}
                                  {post.platform === "Twitter" && <Twitter height={24} width={24} />}
                                  {post.platform === "Instagram" && <Instagram height={24} width={24} />}

                                  {post.platform}
                                </div>
                              </TableCell>
                              <TableCell>{post.date}</TableCell>
                              <TableCell>
                                {post.engagement !== "N/A" ? (
                                  <Badge variant="outline" className={getEngagementBadgeStyle(post.engagement)}>
                                    {post.engagement}
                                  </Badge>
                                ) : (
                                  "—"
                                )}
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button type="button" variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Actions</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem asChild>
                                      <Link href={`/posts/${post.id}/edit`} className="w-full">
                                        Edit
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="text-destructive focus:text-destructive"
                                      onClick={() => handleDeleteClick(post.id)}
                                    >
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                              No posts found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}

                {/* Mobile Card View */}
                {isMobile && (
                  <div className="space-y-4">
                    {posts.length > 0 ? (
                      posts.map((post) => (
                        <Card key={post.id} className="overflow-hidden">
                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm sm:text-base line-clamp-2">{post.title}</h3>
                              <Badge variant={getStatusBadgeVariant(post.status)}>{post.status}</Badge>
                            </div>

                            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                              {post.platform === "Facebook" && <Facebook height={24} width={24} />}
                              {post.platform === "LinkedIn" && <Linkedin height={24} width={24} />}
                              {post.platform === "Twitter" && <Twitter height={24} width={24} />}
                              {post.platform === "Instagram" && <Instagram height={24} width={24} />}
                              <span>{post.platform}</span>
                            </div>

                            <div className="mt-2 flex flex-wrap gap-3 text-xs">
                              <div className="flex items-center">
                                <Calendar className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                                <span>{post.date}</span>
                              </div>
                              {post.time && (
                                <div className="flex items-center">
                                  <Clock className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                                  <span>{post.time}</span>
                                </div>
                              )}
                              {post.engagement !== "N/A" && (
                                <Badge variant="outline" className={getEngagementBadgeStyle(post.engagement)}>
                                  {post.engagement}
                                </Badge>
                              )}
                            </div>

                            <div className="mt-3 flex justify-end gap-2">
                              <Link href={`/posts/${post.id}/edit`}>
                                <Button type="button" variant="outline" size="sm" className="h-8 px-2">
                                  <Edit className="h-3.5 w-3.5 mr-1" />
                                  Edit
                                </Button>
                              </Link>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2 text-destructive hover:bg-destructive/10"
                                onClick={() => handleDeleteClick(post.id)}
                              >
                                <Trash2 className="h-3.5 w-3.5 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))
                    ) : (
                      <div className="py-8 text-center text-muted-foreground">No posts found.</div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this post?</AlertDialogTitle>
            <AlertDialogDescription>
              This action can be undone. You will be able to restore the post after deletion.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

