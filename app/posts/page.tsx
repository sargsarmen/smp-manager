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
import { MoreHorizontal, Plus, Trash2, Calendar, Clock, Edit, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Shell } from "@/components/shell"
import { usePosts } from "@/context/post-context"
import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function PostsPage() {
  const { posts, deletePost } = usePosts()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [postToDelete, setPostToDelete] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const postsPerPage = 5

  // Check if the screen is mobile
  const isMobile = useMediaQuery("(max-width: 768px)")

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
    <Shell>
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
            <Link href="/posts/new">
              <Button type="button">
                <Plus className="mr-2 h-4 w-4" />
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
                        {currentPosts.length > 0 ? (
                          currentPosts.map((post) => (
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
                              No posts found matching your search.
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
                    {currentPosts.length > 0 ? (
                      currentPosts.map((post) => (
                        <Card key={post.id} className="overflow-hidden">
                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium truncate">{post.title}</h3>
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
                      <div className="py-8 text-center text-muted-foreground">No posts found matching your search.</div>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground order-2 sm:order-1">
                  {filteredPosts.length > 0
                    ? `Showing ${indexOfFirstPost + 1}-${Math.min(indexOfLastPost, filteredPosts.length)} of ${filteredPosts.length} posts`
                    : "No posts found"}
                </p>
                <div className="flex items-center space-x-2 order-1 sm:order-2 w-full sm:w-auto justify-center">
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
    </Shell>
  )
}

