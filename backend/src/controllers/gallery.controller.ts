import type { Request, Response } from "express";
import cloudinary from "../config/cloudinary.config.ts";
import streamifier from "streamifier";
import { galleryImageModel } from "../models/gallery.model.ts";
//________________________________________________________________________________//

//* -------------------- uploadGalleryImageController ------------------------------------//

//________________________________________________________________________________//

export const uploadGalleryImageController = async (
  req: Request,
  res: Response,
) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Please select an image" });
    }

    const uploadResult = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "dravidian-campus/gallery" },
        (error, result) => {
          if (error) {
            console.log("Logging the error", error);
            reject(error);
          }
          console.log("Logging the result :", result);
          resolve(result);
        },
      );

      console.log("Logging the stream", stream);

      streamifier.createReadStream(req.file?.buffer).pipe(stream);
    });

    const gallery = await galleryImageModel.create({
      imageUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });

    return res.status(201).json({
      success: true,
      message: "gallery Image uploaded successfully",
      galleryImage: gallery,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Image upload failed", error });
  }
};

//________________________________________________________________________________//

//* -------------------- get Gallery Image Controller ------------------------------------//

//________________________________________________________________________________//

export const getGalleryImageController = async (
  req: Request,
  res: Response,
) => {
  try {
    const gallery = await galleryImageModel.find().sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ success: true, message: "got gallery Images", gallery });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server Error", err });
  }
};

//________________________________________________________________________________//

//* -------------------- delete Gallery Image Controller ------------------------------------//

//________________________________________________________________________________//

export const deleteGalleryController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const galleryImage = await galleryImageModel.findById(id);

  if (!galleryImage) {
    return res.status(404).json({
      success: false,
      message: "gallery Image not found",
    });
  }

  await cloudinary.uploader.destroy(galleryImage.publicId);

  const image = await galleryImageModel.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    message: "gallery Image deleted",
    image,
  });
};
