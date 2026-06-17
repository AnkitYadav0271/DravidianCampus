import mongoose, { Schema } from "mongoose";
import { adminModel } from "./admin.model.ts";

const sessionSchema = new Schema({
  admin: {
    type: mongoose.Types.ObjectId,
    ref: adminModel,
    required: true,
  },
});

export const Session = mongoose.model("Session", sessionSchema);
