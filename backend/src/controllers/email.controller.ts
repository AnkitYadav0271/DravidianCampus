import type { Request, Response } from "express";
import { generateContactEmail, generateEnquiryEmail } from "../services/email.service.js";

//________________________________________________________________________//

//                     Student Query Email                                  //

//________________________________________________________________________//
export const emailController = async (req: Request, res: Response) => {
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


// ______________________________________________________________________//

//                     contact Query EmailController                      //

//________________________________________________________________________//


export const contactEmailController = async(req:Request,res:Response) =>{
  const {fullName,email,phoneNo,message} = req.body;
  if(!fullName  || !phoneNo || !message ){
    return res.status(400).json({success:false,message:"name , phoneNo and message are required"});
  }


  try {

   await generateContactEmail({fullName,email,phoneNo,message});
   return res.status(200).json({success:true,message:"Query sent successfully"});

  }catch(err){
    return res.status(400).json({success:false,message:err});
  }
}


