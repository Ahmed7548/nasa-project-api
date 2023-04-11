import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import populatedb from "./db/populatedb";
import planetRouter from "./routes/plantets";
import launchesRouter from "./routes/launches";
import { createPath } from "./helpers/path";

dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
//logger
app.use(morgan("combined"))
//static
app.use(express.static(createPath("public", "build")));


// routes
app.use("/api/planets", planetRouter);
app.use("/api/launch", launchesRouter);
app.get("/*", (req, res, next) => {
	res.sendFile(createPath("public", "build", "index.html"));
});



//error handlers

// app start
export default app.listen(process.env.PORT, () => {
	populatedb();
	console.log("app is running on port " + process.env.PORT);
});

