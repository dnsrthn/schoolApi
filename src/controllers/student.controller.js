import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Student from "../models/student.model.js"
import Course from "../models/course.model.js"

export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Password and email are required" })
    }

    const foundStudent = await Student.findOne({ email: email.toLowerCase() })
    if (!foundStudent) {
      return res.status(404).json({ message: "Student was not found" })
    }

    const isMatch = await bcrypt.compare(password, foundStudent.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: foundStudent._id, role: foundStudent.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Log in COmpleted", token });
  } catch (error) {
    console.error("Error while trying to log in:", error);
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}

export const registerStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingStudent = await Student.findOne({ email: email.toLowerCase() })
    if (existingStudent) {
      return res.status(400).json({ message: "Student already registered" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newStudent = new Student({ 
      name, 
      email: email.toLowerCase(), 
      password: hashedPassword 
    })

    await newStudent.save();

    res.status(201).json({ message: "Student successfully created", student: newStudent })
  } catch (error) {
    console.error("Error wile registry :", error);
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

export const enrollInCourse = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" })

    const foundStudent = await Student.findById(studentId);
    if (!foundStudent) return res.status(404).json({ message: "Student was not found" })

    if (foundStudent.courses.includes(courseId)) {
      return res.status(400).json({ message: "Student is already enrolled in course" })
    }

    if (foundStudent.courses.length >= 3) {
      return res.status(400).json({ message: "Student si already enrolled in 3 courses" })
    }

    foundStudent.courses.push(courseId);
    await foundStudent.save();

    res.status(200).json({ message: "Student enrolled in course successfully", student: foundStudent })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}

export const getStudentCourses = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).populate({
      path: 'courses',
      populate: { path: 'teacher', select: 'name' }
    })

    if (!student) {
      return res.status(404).json({ message: "Student was not found" })
    }

    res.status(200).json(student.courses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}

export const updateStudentProfile = async (req, res) => {
  try {
    const { studentId } = req.params
    const { name, email } = req.body

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student aws not found" })
    }

    if (name) student.name = name
    if (email) student.email = email

    await student.save();

    res.status(200).json({ message: "Student profile updated successfully", student })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}

export const deleteStudentProfile = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findByIdAndDelete(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student was not found" })
    }

    res.status(200).json({ message: "Student profile deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}