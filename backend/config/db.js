import mongoose from 'mongoose';

export const connectDB = async () => {
     await mongoose.connect(process.env.MONGO_URI).then(() => {
          console.log("MongoDB connected successfully");
     }).catch((err) => {
          console.error("MongoDB connection failed:", err);
          process.exit(1); // Exit the process with failure
     });  
}