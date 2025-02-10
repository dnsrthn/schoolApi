import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import Student from "../models/student.model.js"
import Teacher from "../models/teacher.model.js"

dotenv.config();

export const registerTeacher = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existingTeacher = await Teacher.findOne({ email });
        if (existingTeacher) {
            return res.status(400).json({ message: "Teacher already exist" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newTeacher = new Teacher({
            name,
            email,
            password: hashedPassword,
            role: "TEACHER_ROLE" 
        })

        await newTeacher.save();

        res.status(201).json({ message: "Teacher registered successfully", teacher: newTeacher })
    } catch (error) {
        console.error("There was an error during registration:", error)
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

export const registerStudent = async (req, res) => {
    try {
        const { name, email, password, role } = req.body

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are necessary" })
        }
        const normalizedEmail = email.toLowerCase()

        const existingStudent = await Student.findOne({ email: normalizedEmail })
        if (existingStudent) {
            return res.status(400).json({ message: "Student lready exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newStudent = new Student({ 
            name, 
            email: normalizedEmail, 
            password: hashedPassword, 
            role 
        })
        await newStudent.save();

        res.status(201).json({ message: "Student regstered ssucessfuly", student: newStudent })
    } catch (error) {
        console.error("Error during registry:", error);
        res.status(500).json({ message: "Server error", error: error.message })
    }
}
