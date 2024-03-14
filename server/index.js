import express from "express"
import bodyParser from 'body-parser'
import workoutRouter from "./routes/workout.routes.js"
import userRouter from "./routes/user.routes.js"
import 'dotenv/config'
import connectDB from "./db/index.js"

const port = process.env.PORT


const app = express()

app.use(bodyParser.json())

app.use('/api/workout', workoutRouter)
app.use('/api/user', userRouter)

connectDB()

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})