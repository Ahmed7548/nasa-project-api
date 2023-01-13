import { Router } from "express";
import { deleteLaunche } from "../controllers/deleteLaunch";
import { getLaunches } from "../controllers/getLaunch";
import { postLaunch } from "../controllers/postLaunch";


const launchesRouter = Router()



launchesRouter.get("/",getLaunches)
launchesRouter.post("/",postLaunch)
launchesRouter.delete("/",deleteLaunche)






export default launchesRouter