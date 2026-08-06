import cloudinary from "../config/cloudinary.config.js";
import streamifier from "streamifier";
import { galleryImageModel } from "../models/gallery.model.js";
//________________________________________________________________________________//
//* -------------------- uploadGalleryImageController ------------------------------------//
//________________________________________________________________________________//
export const uploadGalleryImageController = async (req, res) => {
    try {
        if (!req.file) {
            return res
                .status(400)
                .json({ success: false, message: "Please select an image" });
        }
        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ folder: "dravidian-campus/gallery" }, (error, result) => {
                if (error) {
                   
                    reject(error);
                }

                resolve(result);
            });
            
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
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Image upload failed", error });
    }
};
//________________________________________________________________________________//
//* -------------------- get Gallery Image Controller ------------------------------------//
//________________________________________________________________________________//
export const getGalleryImageController = async (req, res) => {
    try {
        const gallery = await galleryImageModel.find().sort({ createdAt: -1 });
        return res
            .status(200)
            .json({ success: true, message: "got gallery Images", gallery });
    }
    catch (err) {
        return res
            .status(500)
            .json({ success: false, message: "Internal server Error", err });
    }
};
//________________________________________________________________________________//
//* -------------------- delete Gallery Image Controller ------------------------------------//
//________________________________________________________________________________//
export const deleteGalleryController = async (req, res) => {
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
