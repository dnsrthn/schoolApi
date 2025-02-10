import express from "express"
import cors from "cors"
import { configDotenv } from "dotenv"
import connectDB from "./configs/mongo.js"

import authRoutes from "./src/routes/auth.routes.js"
import studentRoutes from "./src/routes/student.routes.js"
import teacherRoutes from "./src/routes/teacher.routes.js"
import courseRoutes from "./src/routes/course.routes.js"

configDotenv()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/students", studentRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/courses", courseRoutes)
app.use("/api/teachers", teacherRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))