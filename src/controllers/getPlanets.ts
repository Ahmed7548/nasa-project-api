import { RequestHandler } from "express"
import Planet from "../models/planets"

export const  getPlanets:RequestHandler=async (req,res,next)=> {
  //TODO get planets from the db and return data to the client
  const planets = await Planet.getPlanets()
  console.log(planets)
  res.status(200).json(planets)
}





