import Planet, { Planet as PlanetType } from "../models/planets";
import { CustomRequestHandler } from "../types";
import HttpError from "../errors/HttpError";

export const getPlanets: CustomRequestHandler<PlanetType[]> = async (
	req,
	res,
	next
) => {
	try {
		const planets = await Planet.getPlanets();
		res.status(200).json(planets);
  } catch {
    next(new HttpError(500,"couldn't retreive planets from the data base please try later"))
  }
};
