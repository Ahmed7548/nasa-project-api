import { openDb } from "../db/db"


interface Planet{
  ID: number,
  kepid: number;
  name:string
}

class Planet {
 
  constructor() {
    
  }

  static async getPlanets():Promise<Planet[]> {
    const db = await openDb()
    const planets: Planet[] = await db.all(`select * from Planets`)
    db.close()
    return planets
  }
  static async getPlanet(id:string):Promise<Planet|undefined> {
    const db =await openDb()
    const planet:Planet|undefined= await db.get('select * from Planets where id=?',id)
    return planet
  }
}



export default Planet