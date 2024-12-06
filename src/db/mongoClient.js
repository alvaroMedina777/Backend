import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try {
        const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.f2nlx.mongodb.net/` 
        await mongoose.connect(uri, {
        });
        console.log('MongoDB connected')
    } catch (error) {
        console.error(error)
        throw new Error('Error connecting to MongoDB')
    }
};