export const isTeacher = (req, res, next) => {
    console.log("isTeacher - User:", req.user)
  
    if (!req.user || req.user.role !== "TEACHER_ROLE") {
      return res.status(403).json({ message: "Access denied, only teachers can perform this action" })
    }
  
    next()
  }
  
  export const isStudent = (req, res, next) => {
    console.log(" isStudent - User:", req.user)
  
    if (!req.user || req.user.role !== "STUDENT_ROLE") {
      return res.status(403).json({ message: "Access denied, only students can perform this action" })
    }
    next()
  }