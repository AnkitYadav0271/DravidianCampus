import { Router } from "express";
import { offerUploadMiddleware } from "../middleware/offer.upload.middleware.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import {
  deleteOfferController,
  getOfferImageController,
  uploadOfferController,
} from "../controllers/offer.controller.js";

const router = Router({ mergeParams: true });

router.post(
  "/upload",

  isAuthenticated,
  offerUploadMiddleware.single("offerImage"),
  uploadOfferController,
);

router.get("/images", getOfferImageController);

router.delete("/image/:id", deleteOfferController);

export default router;
