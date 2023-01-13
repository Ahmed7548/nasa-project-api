import { openDb } from "../db/db";

interface DbLaunch {
	ID: number;
	date: string;
	name: string;
	rocketType: string;
	destination: number;
}

class Launch {
	constructor(
		private date: Date,
		private name: string,
		private rocketType: string,
		private destination: number
	) {}

	async save(): Promise<boolean> {
		const db = await openDb();
		const result = await db.run(
			`INSERT INTO Launches (date, name, rocketType, destination) VALUES (?, ?, ?, ?)`,
			this.date.toLocaleDateString(),
			this.name,
			this.rocketType,
			this.destination
		);
		await db.close();
		if (result.changes) {
			return true;
		}
		return false;
	}
	static async delete(id: number): Promise<boolean> {
		const db = await openDb();
		const result = await db.run(`DELETE FROM Launches WHERE ID=?`, id);
		await db.close();
		if (result.changes) {
			return true;
		}
		return false;
	}
	static async getAll(): Promise<DbLaunch[]> {
		const db = await openDb();
		const results = await db.all<DbLaunch[]>(`select * from Launches`);
		return results;
	}
}

export default Launch;
