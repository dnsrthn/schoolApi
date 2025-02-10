import express from "express"
import cors from "cors"
import { connectDB } from "./mongo.js"
import courseRoutes from "../src/routes/course.routes.js"
import authRoutes from "../src/routes/auth.routes.js"
import studentRoutes from "../src/routes/student.routes.js"

const app = express()
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
  })
  
await connectDB()
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/students", studentRoutes)
app.use("/api/courses", courseRoutes)

