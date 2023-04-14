import { z } from "zod"
import { CustomRequestHandler } from "../types"



export const validate = (schema:z.ZodSchema):CustomRequestHandler<never> => (req, res, next) => {
  // todo->validating
  try {
    req.body = schema.parse(req.body)
    next()
  } catch (err){
    if (err instanceof z.ZodError) {
      res.status(400).json({message:err.message,err})
    }
  }
}



