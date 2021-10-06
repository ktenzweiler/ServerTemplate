const express = require('express')
require('dotenv').config({path: './config/.env'})
const connectDB = require('./config/db')
const userRouter = require('./routers/user')

const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded( { extended: true } ))
app.use(userRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is up on port ${process.env.PORT}`)
})