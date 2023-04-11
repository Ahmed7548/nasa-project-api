import { z } from "zod"



export const PostLaunchSchema = z.object({
  date: z.string({ invalid_type_error: "please provide a valid date", required_error: "please provide a date" }).datetime({offset:true}),
  destination: z.string({ invalid_type_error: "please provide a valid string", required_error: "please provide a destination" }),
  name: z.string({ invalid_type_error: "please provide a valid string", required_error: "please provide a name" }),
  rocketType:z.string({ invalid_type_error: "please provide a valid string", required_error: "please provide a rocket type" })
})


export type LaunchData=z.infer<typeof PostLaunchSchema>