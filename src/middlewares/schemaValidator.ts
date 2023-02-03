import { z } from "zod"
import { RequestHandler } from "express"




export const validate = (schema:z.ZodSchema):RequestHandler => (req, res, next) => {
  // todo->validating
  try {
    req.body=schema.parse(req.body)
  } catch (err){
    if (err instanceof z.ZodError) {
      res.status(400).json({error:err.message})
    }
  }
}



