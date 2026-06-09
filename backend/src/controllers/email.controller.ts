import type { Request, Response } from "express";
import { generateEnquiryEmail } from "../services/email.service.ts";

export const emailController = async (req: Request, res: Response) => {
   console.log("Logging req.body: ",req.body);
  const { fullName, email, phoneNo, course, message } = req.body;
  if(!fullName  || !phoneNo || !course ){
    return res.status(400).json({success:false,message:"name , phoneNo and course are required"});
  }
  try {
    generateEnquiryEmail({ fullName, email, phoneNo, course, message });
    return res
      .status(200)
      .json({ success: true, message: "Query sent successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
