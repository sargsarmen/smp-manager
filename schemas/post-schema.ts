import * as z from "zod";

// Time validation regex
const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

// Base schema for post validation
export const postFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  content: z.string().min(1, "Content is required"),
  platform: z.enum(["instagram", "twitter", "facebook", "linkedin"], {
    required_error: "Please select a platform",
  }),
  status: z.enum(["draft", "scheduled", "published"], {
    required_error: "Please select a status",
  }),
  date: z.date().optional(),
  time: z
    .string()
    .refine((val) => val === "" || timeRegex.test(val), {
      message: "Please enter a valid time",
    })
    .optional(),
});

// Schema with conditional validation for scheduled posts
export const postFormSchemaWithSchedule = postFormSchema
  .refine(
    (data) => {
      // If status is scheduled, date is required
      if (data.status === "scheduled") {
        return data.date !== undefined;
      }
      return true;
    },
    {
      message: "Date is required for scheduled posts",
      path: ["date"],
    }
  )
  .refine(
    (data) => {
      if (data.status === "scheduled") {
        return (
          data.time !== undefined &&
          data.time !== "" &&
          timeRegex.test(data.time)
        );
      }
      return true;
    },
    {
      message: "Please enter a valid time",
      path: ["time"],
    }
  );

export type PostFormValues = z.infer<typeof postFormSchemaWithSchedule>;
