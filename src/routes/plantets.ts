import { Router } from "express";
import {getPlanets} from "../controllers/getPlanets"


const planetRouter = Router()


planetRouter.get("/", getPlanets)




export default planetRouter