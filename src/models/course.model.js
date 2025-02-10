import mongoose from "mongoose"

const CourseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        unique: true 
    },
    description: { 
        type: String, 
        required: true
     },
    teacher: { 
        type: mongoose.Schema.Types.ObjectId, 
         ref: "Teacher", required: true 
        },
    students: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Student" 
    }]
})

const Course = mongoose.model("Course", CourseSchema)
export default Course