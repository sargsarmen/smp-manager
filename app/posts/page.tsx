"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Plus, Trash2 } from "lucide-react"
import { Shell } from "@/components/shell"
import { usePosts } from "@/context/post-context"
import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

export default function PostsPage() {
  const { posts, deletePost } = usePosts()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [postToDelete, setPostToDelete] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const postsPerPage = 5

  // Filter posts based on search query
  const filteredPosts = posts.filter((post) => {
    if (!searchQuery.trim()) return true

    const query = searchQuery.toLowerCase()
    return (
      post.title.toLowerCase().includes(query) ||
      post.platform.toLowerCase().includes(query) ||
      post.status.toLowerCase().includes(query) ||
      (post.content && post.content.toLowerCase().includes(query))
    )
  })

  // Calculate total pages
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  // Get current posts for the page
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  // Adjust current page when posts length changes
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages)
    }
  }, [filteredPosts.length, currentPage, totalPages])

  // Handle page navigation
  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  // Handle post deletion
  const handleDeleteClick = (postId: string) => {
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
        title: "Post deleted",
        description: "The post has been successfully deleted.",
      })

      // Reset state
      setPostToDelete(null)
    }
  }

  const cancelDelete = () => {
    setPostToDelete(null)
    setIsDeleteDialogOpen(false)
  }

  return (
    <Shell>
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
            <Link href="/posts/new">
              <Button type="button">
                <Plus className="mr-2 h-4 w-4" />
                Create Post
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
                <div className="flex items-center justify-between pb-4">
                  <div className="flex w-full max-w-sm items-center">
                    <Input
                      type="search"
                      placeholder="Search posts..."
                      className="w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
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
                      {currentPosts.length > 0 ? (
                        currentPosts.map((post) => (
                          <TableRow key={post.id}>
                            <TableCell className="font-medium">{post.title}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  post.status === "Published"
                                    ? "default"
                                    : post.status === "Scheduled"
                                      ? "outline"
                                      : "secondary"
                                }
                              >
                                {post.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={post.platform} />
                                  <AvatarFallback>{post.platform.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                {post.platform}
                              </div>
                            </TableCell>
                            <TableCell>{post.date}</TableCell>
                            <TableCell>
                              {post.engagement !== "N/A" ? (
                                <Badge
                                  variant="outline"
                                  className={
                                    post.engagement === "High"
                                      ? "border-green-500 text-green-500"
                                      : post.engagement === "Medium"
                                        ? "border-yellow-500 text-yellow-500"
                                        : "border-red-500 text-red-500"
                                  }
                                >
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
                            No posts found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {filteredPosts.length > 0
                    ? `Showing ${indexOfFirstPost + 1}-${Math.min(indexOfLastPost, filteredPosts.length)} of ${filteredPosts.length} posts`
                    : "No posts found"}
                </p>
                <div className="flex items-center space-x-2">
                  <Button type="button" variant="outline" size="sm" onClick={goToPrevPage} disabled={currentPage === 1}>
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground px-2">
                    Page {currentPage} of {totalPages || 1}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    Next
                  </Button>
                </div>
              </CardFooter>
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
              This action cannot be undone. This will permanently delete the post from your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
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
    </Shell>
  )
}

