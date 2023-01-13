import { createReadStream } from "fs";
import { parse } from "csv-parse";
import { openDb } from "./db";

import { createPath } from "../helpers/path";

export default async () => {
	const records: any[] = [];
	createReadStream(createPath("csv", "kepler_data.csv"))
		.pipe(parse({ comment: "#", columns: true }))
		.on("data", (record) => {
			if (isHabitable(record)) records.push(record);
		})
		.on("end", async () => {
			const db = await openDb();
			// console.log(records[0])
			try {
				await db.exec("DROP TABLE IF EXISTS Planets;");
				await db.exec(`CREATE TABLE Planets(
				ID INTEGER PRIMARY KEY AUTOINCREMENT,
				kepid INT NOT NULL,
				NAME TEXT NOT NULL
				);
				`);
				await db.exec(`BEGIN TRANSACTION;
			${records
				.map(
					(record) =>
						`	INSERT INTO Planets (kepid, NAME) VALUES ('${record.kepid}', '${record.kepoi_name}');`
				)
				.join("\n")}
			COMMIT;`);
			} catch (err) {
				console.log(err);
			} finally {
				const data = await db.all("select * from Planets");
				console.log(data);
				db.close();
			}
		})
		.on("err", (error) => console.error(error));

	function isHabitable(planet: { [key: string]: any }): boolean {
		return (
			planet["koi_disposition"] === "CONFIRMED" &&
			planet["koi_insol"] > 0.36 &&
			planet["koi_insol"] < 1.11 &&
			planet["koi_prad"] < 1.6
		);
	}
};
