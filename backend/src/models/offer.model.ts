import { Schema } from "mongoose";
import mongoose from "mongoose";

const offerSchema = new Schema(
  {
    title: {
      type: String,
      default: "",
    },

    imageUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const offerModel = mongoose.model("Offer", offerSchema);
