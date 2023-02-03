import { Router } from "express";
import { deleteLaunche } from "../controllers/deleteLaunch";
import { getLaunches } from "../controllers/getLaunch";
import { postLaunch } from "../controllers/postLaunch";
import { validate } from "../middlewares/schemaValidator";
import { PostLaunchSchema } from "../schemas/postLaunch";


const launchesRouter = Router()



launchesRouter.get("/",getLaunches)
launchesRouter.post("/",validate(PostLaunchSchema),postLaunch)
launchesRouter.delete("/",deleteLaunche)






export default launchesRouter