import express, { Express } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import todoRoutes from './routes'
import bodyParser from "body-parser";

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000
const MONGO_USER: string | number = process.env.MONGO_USER || "todoUser"
const MONGO_PASSWORD: string | number = process.env.MONGO_PASSWORD || "todoPWD"
const MONGO_DB: string | number = process.env.MONGO_DB || "todoDB"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(todoRoutes)

const uri: string = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@localhost:27017/${MONGO_DB}?retryWrites=true&w=majority`
mongoose
    .connect(uri)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        )
    )
    .catch((error) => {
        throw error
    })
