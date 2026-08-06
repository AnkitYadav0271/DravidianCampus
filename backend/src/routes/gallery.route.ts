import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import {
  deleteGalleryController,
  getGalleryImageController,
  uploadGalleryImageController,
} from "../controllers/gallery.controller.js";
import { galleryUploadMiddleware } from "../middleware/gallery.upload.middleware.js";

const router = Router({ mergeParams: true });

router.post(
  "/upload",
  isAuthenticated,
  galleryUploadMiddleware.single("galleryImage"),
  uploadGalleryImageController,
);

router.delete("/image/:id", isAuthenticated, deleteGalleryController);

router.get("/images", getGalleryImageController);

export default router;
