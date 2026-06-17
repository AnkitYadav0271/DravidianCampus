import type { Request, Response } from "express";
import cloudinary from "../config/cloudinary.config.ts";
import streamifier from "streamifier";
import { offerModel } from "../models/offer.model.ts";

//________________________________________________________________________________//

//* -------------------- uploadOfferController ------------------------------------//

//________________________________________________________________________________//

export const uploadOfferController = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Please select an image" });
    }

    const uploadResult = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "dravidian-campus/offers" },
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

    const offer = await offerModel.create({
      imageUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });

    return res.status(201).json({
      success: true,
      message: "Offer Image uploaded successfully",
      offerImage: offer,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Image upload failed", error });
  }
};

//________________________________________________________________________________//

//* -------------------- get Offer Image Controller ------------------------------------//

//________________________________________________________________________________//

export const getOfferImageController = async (req: Request, res: Response) => {
  try {
    const offers = await offerModel.find().sort({ createdAt: -1 }).limit(5);
    return res
      .status(200)
      .json({ success: true, message: "got the Images", offers });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server Error", err });
  }
};
