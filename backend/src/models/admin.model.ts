import { Schema } from "mongoose";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    otp: {
      type: String,
      min: [6, "Otp Length is less than 6"],
    },

    otpExpiry: {
      type: Date,
      default: null,
    },

    otpLastSentAt: {
      type: Date,
      default: null,
    },
  },
  {
    query: {
      byEmail(email) {
        return this.where({ email: email });
      },
    },
  },
);

const adminModel = mongoose.model("admin", adminSchema);
export { adminModel };
