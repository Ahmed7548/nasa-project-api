import * as dotenv from 'dotenv'
import express from "express"

dotenv.config()




const app = express()


//middleware





// routes






//error handlers




// app start
app.listen(process.env.PORT, () => {
  console.log("app is running on port "+process.env.PORT)
})