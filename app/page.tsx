import type { Metadata } from "next"
import PostsPage from "@/app/posts/page"

export const metadata: Metadata = {
  title: "Posts - Social Media Post Manager",
  description: "Manage your social media posts with scheduling and analytics features",
}

export default function HomePage() {
  return <PostsPage />
}

