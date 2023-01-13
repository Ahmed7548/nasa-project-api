import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import populatedb from "./db/populatedb";
import planetRouter from "./routes/plantets";
import launchesRouter from "./routes/launches";

dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/planets", planetRouter);
app.use("/launch", launchesRouter);

//error handlers

// app start
app.listen(process.env.PORT, () => {
	populatedb();
	console.log("app is running on port " + process.env.PORT);
});
