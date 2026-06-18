import { Router } from "express";
import { offerUploadMiddleware } from "../middleware/offer.upload.middleware.ts";
import { isAuthenticated } from "../middleware/auth.middleware.ts";
import {
  deleteOfferController,
  getOfferImageController,
  uploadOfferController,
} from "../controllers/offer.controller.ts";

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
