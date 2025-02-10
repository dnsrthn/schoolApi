import mongoose from "mongoose"

const StudentSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        required: true, unique: true 
    },
    password: { 
        type: String,
        required: true 
    },
    courses: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course" 
    }]
})

const Student = mongoose.model("Student", StudentSchema)
export default Student