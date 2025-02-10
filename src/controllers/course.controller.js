import mongoose from "mongoose"
import Course from "../models/course.model.js"
import Student from "../models/student.model.js"
import Teacher from "../models/teacher.model.js"

export const createCourse = async (req, res) => {
  try {
    const { name, description, teacherId } = req.body

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({ message: "Invalid teacherId" })
    }

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) return res.status(404).json({ message: "Teacher was snot found" })

    const newCourse = new Course({
      name,
      description,
      teacher: teacherId,
    })

    await newCourse.save()

    res.status(201).json({ message: "Course created successfully", course: newCourse })
  } catch (error) {
    console.error("Error whule creating course:", error)
    res.status(500).json({ message: "Server errorr", error })
  }
}

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params
    const { name, description } = req.body

    let course = await Course.findById(id)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    if (req.user.id !== course.teacher.toString()) {
      return res.status(403).json({ message: "Unauthorized action" })
    }

    if (name) course.name = name
    if (description) course.description = description

    await course.save();

    await Student.updateMany(
      { courses: id },
      { $set: { "courses.$": course } }
    )

    res.status(200).json({ message: "Course updated successfully", course })
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    let course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (req.user.id !== course.teacher.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Course.findByIdAndDelete(id);

    await Student.updateMany(
      { courses: id },
      { $pull: { courses: id } }
    )

    res.status(200).json({ message: "Course deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}

export const assignStudentToCourse = async (req, res) => {
  try {
    const { courseId, studentId } = req.params

    const course = await Course.findById(courseId)
    const student = await Student.findById(studentId)

    if (!course || !student) {
      return res.status(404).json({ message: "Course or Student not found" })
    }

    const studentCourses = await Course.find({ students: studentId });
    if (studentCourses.length >= 3) {
      return res.status(400).json({ message: "Student is already assigned to a 3 course limit" })
    }

    if (course.students.includes(studentId)) {
      return res.status(400).json({ message: "Student is already assigned to this course" })
    }

    course.students.push(studentId)
    student.courses.push(courseId)
    await course.save()
    await student.save()

    res.status(200).json({ message: "Student assigned to course successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("teacher", "name")
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}