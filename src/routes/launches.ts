import { Router } from "express";
import { getLaunches } from "../controllers/getLaunch";
import { postLaunch } from "../controllers/postLaunch";


const launchesRouter = Router()



launchesRouter.get("/",getLaunches)
launchesRouter.post("/",postLaunch)
launchesRouter.delete("/",)






export default launchesRouter