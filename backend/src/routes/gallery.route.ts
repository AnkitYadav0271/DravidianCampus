import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware.ts";
import {
  deleteGalleryController,
  getGalleryImageController,
  uploadGalleryImageController,
} from "../controllers/gallery.controller.ts";
import { galleryUploadMiddleware } from "../middleware/gallery.upload.middleware.ts";

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
