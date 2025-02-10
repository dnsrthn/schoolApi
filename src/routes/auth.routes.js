import { Router } from "express"
import { loginStudent } from "../controllers/student.controller.js"
import { loginTeacher } from "../controllers/teacher.controller.js"
import { registerTeacher } from "../controllers/auth.controller.js"
import { registerStudent } from "../controllers/auth.controller.js"

const router = Router()

router.post("/register/student", registerStudent) 
router.post("/student/login", loginStudent)
router.post("/register/teacher", registerTeacher)
router.post("/teacher/login", loginTeacher)


export default router