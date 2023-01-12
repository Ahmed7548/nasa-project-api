import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import fs from "fs"

if (!fs.existsSync('./database.db')) {
  const desc=fs.openSync('database.db', "w")
  fs.closeSync(desc)
} 

// you would have to import / invoke this in another file
export async function openDb () {
  console.log(__dirname)
  return open({
    filename: 'database.db',
    driver: sqlite3.Database
  })
}