import { openDb } from "../db/db";

class Launch {
  constructor(private date:Date,private name:string, private rocketType: string, private destination:number) {
  }
  

  async save() {
    
  }
}