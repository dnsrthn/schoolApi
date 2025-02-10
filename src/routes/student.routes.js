import { Router } from 'express'
import { registerStudent, enrollInCourse, updateStudentProfile, 
deleteStudentProfile, getStudentCourses } from '../controllers/student.controller.js'
import { authenticateUser } from '../middlewares/auth.middleware.js'
import { isStudent } from '../middlewares/role.middleware.js'

const router = Router()

router.post('/register', registerStudent)
router.post('/enroll', authenticateUser, isStudent, enrollInCourse)
router.get("/:studentId/courses", authenticateUser, isStudent, getStudentCourses)
router.put("/:studentId", authenticateUser, isStudent, updateStudentProfile)
router.delete("/:studentId", authenticateUser, isStudent, deleteStudentProfile)

export default router