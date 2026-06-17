import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { adminModel } from "../models/admin.model.ts";

import { Session } from "../models/session.models.ts";
import { sendOtpEmail } from "../verification/email.verification.ts";

interface AuthRequest extends Request {
  admin: {
    email: string;
  };
}

//________________________________________________________________________//

//                     LogIN controller                                  //

//________________________________________________________________________//

export const adminLoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email.trim() || !password.trim()) {
      return res
        .status(401)
        .json({ success: false, message: "Email and Password are required" });
    }

    const admin = await adminModel.findOne({
      email,
    });

    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });
    }

    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });
    }

    //!yaha pe secret ke liye error handling karenge ek bar error handler create karne par
    const accessToken = await jwt.sign(
      { _id: admin._id },
      process.env.JWT_SECRET!,
      {
        expiresIn: "10d",
      },
    );

    const refreshToken = await jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET!,
      {
        expiresIn: "90d",
      },
    );

    await Session.create({ admin: admin });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: `Welcome Back Sir`,
      accessToken,
      refreshToken,
      admin,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err });
  }
};

//________________________________________________________________________//

//                     Logout controller                                  //

//________________________________________________________________________//

export const logoutController = async (req: AuthRequest, res: Response) => {
  try {
    const admin = req.adminId;
    await Session.deleteMany({ admin: admin });

    res.cookie("accessToken", "", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV == "production",
    });
    return res
      .status(200)
      .json({ success: true, message: "Admin Logged out successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

//________________________________________________________________________//

//                     Forgot Password controller                                  //

//________________________________________________________________________//

export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;

    if (!email.trim()) {
      return res
        .status(401)
        .json({ success: true, message: "Email is Required" });
    }

    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return res
        .status(401)
        .json({ success: true, message: "Pleach choose correct email" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Logging otp: ", otp);
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    admin.otp = otp;
    admin.otpExpiry = expiry;

    await admin.save();

    sendOtpEmail(email, otp);

    const resetToken = jwt.sign(
      { _id: admin._id },
      process.env.JWT_SECRET! as string,
    );
    res.cookie("resetToken", resetToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: true,
      maxAge: 10 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Otp sent successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

//________________________________________________________________________//

//                     Verify OTP controller                         //

//________________________________________________________________________//

export const verifyOtpController = async (req: Request, res: Response) => {
  const otp = req.body.otp;

  let resetToken = req.cookies.resetToken;

  if (!resetToken) {
    return res
      .status(400)
      .json({ success: false, message: "OTP expired regenerate otp" });
  }

  let decoded;

  if (!otp) {
    return res.status(400).json({ success: false, message: "Otp is Required" });
  }

  try {
    decoded = jwt.verify(resetToken, process.env.JWT_SECRET! as string);
    const admin = await adminModel.findOne({ _id: decoded._id });
    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: "User not found with this email" });
    }

    if (!admin.otp || !admin.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "Otp not generated or already verified",
      });
    }

    if (admin.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Otp has been expired please generate new one",
      });
    }

    if (otp != admin.otp) {
      return res.status(400).json({ success: false, message: "Invalid otp" });
    }

    admin.otp = null;
    admin.otpExpiry = null;

    await admin.save();

    return res
      .status(200)
      .json({ success: true, message: "Otp verified successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

//________________________________________________________________________//

//                     Change Password controller                         //

//________________________________________________________________________//

export const changePasswordController = async (req: Request, res: Response) => {
  let resetToken = req.cookies.resetToken;
  console.log("Logging req.cookies :", req.cookies);
  const { password, confirmPassword } = req.body;

  if (!password.trim() || !confirmPassword.trim()) {
    return res.status(400).json({
      success: false,
      message: "password and confirm password are required",
    });
  }

  if (password != confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "password and confirm Password did not match",
    });
  }
  let decoded;
  try {
    //*find admin
    decoded = jwt.verify(resetToken, process.env.JWT_SECRET! as string);
    const admin = await adminModel.findOne({ _id: decoded._id });

    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: "admin not found" });
    }

    //*Check if otp is verified or not

    if (admin.otp != null) {
      return res
        .status(401)
        .json({ success: false, message: "Please verify otp" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    //*Changing admin password
    admin.password = hashedPassword;

    await admin.save();

    return res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", err });
  }
};
