import bcrypt from "bcryptjs"
import Teacher from "../models/teacher.model.js"
import course from "../models/course.model.js"
import { generateToken } from "../helpers/jwt-helper.js"

export const loginTeacher = async (req, res) => {
    try {
        const { email, password } = req.body

        const teacherData = await Teacher.findOne({ email })
      
        if (!teacherData) return res.status(404).json({ message: "Teacher not found" })

        const isMatch = await bcrypt.compare(password, teacherData.password);

        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" })
        const token = generateToken(teacherData);

        res.status(200).json({ message: "Teacher logged in successfully", token, teacher: teacherData })
    } catch (error) {
        console.error("Error while Login in:", error);  
        res.status(500).json({ message: "Server error", error })
    }
}

export const registerTeacher = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        const existingTeacher = await Teacher.findOne({ email })
        if (existingTeacher) return res.status(400).json({ message: "Teacher already exists" })

        const newTeacher = new Teacher({ name, email, password })
        await newTeacher.save();

        res.status(201).json({ message: "Teacher registered successfully", teacher: newTeacher })
    } catch (error) {
        res.status(500).json({ message: "Error on the server", error })
    }
}

export const createCourse = async (req, res) => {
    try {
        const {teacherId, name} = req.body;

        const teacher = await teacher.findById(teacherId);
        if (!teacher) return res.status(404).json({ message: "Teacher not found" })

        const newCourse = new course({ name, teacher: teacherId })
        await newCourse.save();

        res.status(201).json({ message: "Course created successfully", course: newCourse })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
    }
}