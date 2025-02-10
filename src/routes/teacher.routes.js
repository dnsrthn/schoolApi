import { Router } from "express"
import { registerTeacher, createCourse } from "../controllers/teacher.controller.js"
import authenticateUser  from "../middleware/auth-middleware.js"
import { isTeacher } from "../middleware/role-middleware.js"

const router = Router()

router.post("/register", registerTeacher)
router.post("/create-course", authenticateUser, isTeacher, createCourse)

export default router