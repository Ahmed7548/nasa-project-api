import Planet, { Planet as PlanetType } from "../models/planets";
import { CustomRequestHandler } from "../types";
import HttpError from "../errors/HttpError";
import catchAsyncError from "../helpers/catchAsyncError";

export const getPlanets = catchAsyncError<CustomRequestHandler<PlanetType[]>>(
	async (req, res, next) => {
		const planets = await Planet.getPlanets();
		res.status(200).json(planets);
	}
);
