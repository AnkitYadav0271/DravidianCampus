import { Schema } from "mongoose";
import mongoose from "mongoose";

const galleryImageSchema = new Schema(
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

export const galleryImageModel = mongoose.model("Gallery", galleryImageSchema);
