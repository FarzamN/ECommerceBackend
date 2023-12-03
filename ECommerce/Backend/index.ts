import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { userRouter } from './src/routes/user'
const app = express()

app.use(express.json())
app.use(cors())
mongoose.connect("mongodb+srv://frzamn64ml:mB8BqcCpu34DilQx@ecommerce.dwowki2.mongodb.net/ecommerce")

app.listen(8000, () => console.log("running in port 8000"))