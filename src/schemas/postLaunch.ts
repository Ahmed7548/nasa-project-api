import { z } from "zod"



export const PostLaunchSchema = z.object({
  date: z.string({ invalid_type_error: "please provide a valid date", required_error: "please provide a date" }).datetime({offset:true}),
  destination: z.string(),
  name: z.string(),
  rocketType:z.string()
})


export type LaunchData=z.infer<typeof PostLaunchSchema>