import {  Router } from "express";
import { offerUploadMiddleware } from "../middleware/offer.upload.middleware.ts";
import { isAuthenticated } from "../middleware/auth.middleware.ts";
import { getOfferImageController, uploadOfferController } from "../middleware/offer.controller.ts";
import type { Request, Response, NextFunction } from "express";

const router = Router({ mergeParams: true });

router.post(
  "/upload",
  
  isAuthenticated,
  offerUploadMiddleware.single("offerImage"),
  uploadOfferController,
);


router.get("/images",getOfferImageController);

export default router;
