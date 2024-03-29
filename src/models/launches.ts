import { openDb } from "../db/db";


export interface DbLaunch {
	ID: number;
	date: string;
	name: string;
	rocketType: string;
	destination: number;
}

class Launch {
	constructor(
		private date: string,
		private name: string,
		private rocketType: string,
		private destination: string
	) {}

  async save(): Promise<{
    saved: true;
    id:number
  } | {
    saved: false;
    satus: number;
    message:string
	}> {
		const db = await openDb();
    try{

		const result = await db.run(
			`INSERT INTO Launches (date, name, rocketType, destination) VALUES (?, ?, ?, ?)`,
			this.date,
			this.name,
			this.rocketType,
			this.destination
		);
		await db.close();
		if (result.changes && result.lastID) {
			return {saved:true,id:result.lastID}
		}
      return {
        saved: false,
        satus: 500,
        message:"couldn't save to data base"
      };
		} catch (err) {
			console.log(err,err instanceof Error)
      if (err instanceof Error) {
        return {
        saved: false,
        satus: 400,
        message:err.message 
				}
      } else {
        return {
          saved: false,
        satus: 400,
        message:"couldn't save launch"
        }
      }
      
		} finally {
			db.close()
		}
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
    db.close()
		return results;
	}
}

export default Launch;
