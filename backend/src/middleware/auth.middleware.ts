import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import { adminModel } from "../models/admin.model.ts";
import type { NextFunction } from "express";
import { ObjectId } from "mongoose";

interface MiddlewareRequest extends Request {
  cookies: {
    accessToken?: string;
  };
  adminId: ObjectId;
}

export const isAuthenticated = async (
  req: MiddlewareRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.accessToken;

    console.log(token);

    console.log("Logging req.cookies:", req.cookies);

    console.log("Logging req.headers :", req.headers);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token is missing or invalid",
      });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET! as string);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Access Token expired. Use refresh token to regenerate.",
        });
      }
      return res.status(401).json({
        success: false,
        message: "Access Token is invalid",
      });
    }

    // Find user
    const user = await adminModel.findById(decoded._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.adminId = user._id;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
