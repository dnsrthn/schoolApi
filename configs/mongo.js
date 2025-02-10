import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config(); 
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Database is Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Database did not connect:`, error)
        process.exit(1); 
    }
}

export default connectDB;
