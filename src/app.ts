import * as dotenv from 'dotenv'
import cors from "cors"
import express from "express"

dotenv.config()




const app = express()


//middleware
app.use(cors())
app.use(express.json())




// routes






//error handlers




// app start
app.listen(process.env.PORT, () => {
  console.log("app is running on port "+process.env.PORT)
})