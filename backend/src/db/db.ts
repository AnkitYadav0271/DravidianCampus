import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    console.log("Logging uri", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI as string,{dbName:"DravidianCampus"});
    console.log("Database connected successfully");
  } catch (e) {
    console.log(e);
  }
};
