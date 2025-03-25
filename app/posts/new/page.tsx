"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { format, parse } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// UI Components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { toast } from "sonner"

// Custom components and hooks
import { usePosts, type Post } from "@/context/post-context"

// Schema
import { postFormSchemaWithSchedule, type PostFormValues } from "@/schemas/post-schema"
import { Separator } from "@/components/ui/separator"

export default function NewPostPage() {
  const router = useRouter()
  const { addPost } = usePosts()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form with react-hook-form and zod validation
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchemaWithSchedule),
    defaultValues: {
      title: "",
      content: "",
      platform: "instagram", // Provide a default value
      status: "draft",
      date: undefined,
      time: "",
    },
    mode: "onChange",
  })

  // Watch status to conditionally handle date and time fields
  const status = form.watch("status")
  const date = form.watch("date")

  // Clear date and time when status is not scheduled
  useEffect(() => {
    if (status !== "scheduled") {
      form.setValue("date", undefined)
      form.setValue("time", "")
    }
  }, [status, form])

  // Form submission handler
  const onSubmit = (values: PostFormValues) => {
    if (!values.platform) return // Ensure platform is defined

    setIsSubmitting(true)

    // Generate a unique ID
    const id = `POST-${Date.now().toString().slice(-4)}`

    // Create new post object
    const newPost: Post = {
      id,
      title: values.title,
      content: values.content,
      platform: values.platform.charAt(0).toUpperCase() + values.platform.slice(1), // Capitalize first letter
      status: values.status.charAt(0).toUpperCase() + values.status.slice(1), // Capitalize first letter
      date:
        values.date && values.status === "scheduled"
          ? format(values.date, "MMM dd, yyyy")
          : format(new Date(), "MMM dd, yyyy"),
      time: values.status === "scheduled" ? values.time || "" : "",
      engagement: values.status === "published" ? "Medium" : "N/A",
    }

    // Add post to context
    addPost(newPost)

    // Show success toast
    toast("Post created", {
      description: "Your post has been successfully created.",
    })

    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/posts")
    }, 1000)
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Create New Post</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight">Post Content</h2>
                    <p className="text-sm text-muted-foreground">Create your post content and add media.</p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-card-foreground">
                            Post Title *
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Enter post title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-card-foreground">
                            Content <span>*</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Write your post content here..."
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Separator /> <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight">Publishing Settings</h2>
                    <p className="text-sm text-muted-foreground">Configure when and where to publish your post.</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="platform"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-card-foreground">
                            Platform *
                          </FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} value={field.value || "instagram"}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select platform" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="instagram">Instagram</SelectItem>
                                <SelectItem value="twitter">Twitter</SelectItem>
                                <SelectItem value="facebook">Facebook</SelectItem>
                                <SelectItem value="linkedin">LinkedIn</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-card-foreground">
                            Status *
                          </FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} value={field.value || "draft"}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="scheduled">Scheduled</SelectItem>
                                <SelectItem value="published">Published</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          {status !== "scheduled" && (
                            <FormDescription>
                              Date and time options are only available for scheduled posts.
                            </FormDescription>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel className="text-card-foreground">
                            Publish Date {status === "scheduled" && <span>*</span>}
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  type="button"
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                  disabled={status !== "scheduled"}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value ? format(field.value, "PPP") : "Select date"}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-card-foreground">
                            Publish Time {status === "scheduled" && <span>*</span>}
                          </FormLabel>
                          <FormControl>
                            <Input type="time" disabled={status !== "scheduled"} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => router.back()} type="button">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Post"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

