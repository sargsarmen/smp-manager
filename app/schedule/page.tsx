import type { Metadata } from "next"
import ScheduleClientPage from "./ScheduleClientPage"

export const metadata: Metadata = {
  title: "Schedule - Social Media Post Manager",
  description: "Schedule your social media posts",
}

export default function SchedulePage() {
  return <ScheduleClientPage />
}

