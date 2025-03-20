"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Define the Post type
export type Post = {
  id: string
  title: string
  content?: string
  status: string
  platform: string
  date: string
  time?: string
  engagement?: string
}

// Initial posts data
const initialPosts = [
  {
    id: "POST-1234",
    title: "10 Tips for Better Content",
    content: "Here are 10 tips to create better content for your social media...",
    status: "Published",
    platform: "Instagram",
    date: "Mar 18, 2025",
    time: "09:00",
    engagement: "High",
  },
  {
    id: "POST-1235",
    title: "New Product Launch Announcement",
    content: "We're excited to announce our new product launch...",
    status: "Published",
    platform: "Twitter",
    date: "Mar 20, 2025",
    time: "10:30",
    engagement: "Medium",
  },
  {
    id: "POST-1236",
    title: "Behind the Scenes: Our Team",
    content: "Take a look behind the scenes at our amazing team...",
    status: "Published",
    platform: "Facebook",
    date: "Mar 12, 2025",
    time: "14:00",
    engagement: "High",
  },
  {
    id: "POST-1237",
    title: "Customer Success Story: ABC Corp",
    content: "Read about how ABC Corp achieved success using our platform...",
    status: "Published",
    platform: "LinkedIn",
    date: "Mar 20, 2025",
    time: "11:15",
    engagement: "Medium",
  },
  {
    id: "POST-1238",
    title: "Weekly Product Showcase",
    content: "Check out this week's featured products...",
    status: "Scheduled",
    platform: "Instagram",
    date: "Apr 24, 2025",
    time: "10:00",
    engagement: "N/A",
  },
  {
    id: "POST-1239",
    title: "Industry News Roundup",
    content: "The latest news and updates from our industry...",
    status: "Draft",
    platform: "Twitter",
    date: "Apr 25, 2025",
    time: "15:30",
    engagement: "N/A",
  },
  {
    id: "POST-1240",
    title: "Customer Testimonial Video",
    content: "Watch our latest customer testimonial video...",
    status: "Scheduled",
    platform: "Facebook",
    date: "Apr 26, 2025",
    time: "12:00",
    engagement: "N/A",
  },
  {
    id: "POST-1241",
    title: "Monthly Newsletter",
    content: "Our monthly newsletter with updates and insights...",
    status: "Draft",
    platform: "LinkedIn",
    date: "Apr 27, 2025",
    time: "09:00",
    engagement: "N/A",
  },
]

// Define the context type
type PostContextType = {
  posts: Post[]
  getPost: (id: string) => Post | undefined
  updatePost: (updatedPost: Post) => void
  addPost: (post: Post) => void
  deletePost: (id: string) => void
}

// Create the context
const PostContext = createContext<PostContextType | undefined>(undefined)

// Create a provider component
export function PostProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)

  // Get a post by ID
  const getPost = (id: string) => {
    return posts.find((post) => post.id === id)
  }

  // Update a post
  const updatePost = (updatedPost: Post) => {
    setPosts((prevPosts) => prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post)))
  }

  // Add a new post
  const addPost = (post: Post) => {
    setPosts((prevPosts) => [...prevPosts, post])
  }

  // Delete a post
  const deletePost = (id: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id))
  }

  return (
    <PostContext.Provider value={{ posts, getPost, updatePost, addPost, deletePost }}>{children}</PostContext.Provider>
  )
}

// Create a hook to use the post context
export function usePosts() {
  const context = useContext(PostContext)
  if (context === undefined) {
    throw new Error("usePosts must be used within a PostProvider")
  }
  return context
}

