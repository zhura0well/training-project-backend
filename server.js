import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import usersRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'


const credentials = {
    user: 'user',
    password: 'userpassword'
}
const app = express()
const port = process.env.PORT || 5000
const dbUrl = `mongodb+srv://${credentials.user}:${credentials.password}@cluster0.xhhci.mongodb.net/testDatabase`

app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use(usersRoutes)
app.use(authRoutes)

async function start() {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
        })
        app.listen(port, () => console.log(`Server started on port ${port}`))
    } catch (e) {
        console.log(e)
    }
}


start()

