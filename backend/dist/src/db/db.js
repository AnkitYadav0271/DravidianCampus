import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { dbName: "DravidianCampus" });
        console.log("Database connected successfully");
    }
    catch (e) {
        console.log(e);
    }
};
